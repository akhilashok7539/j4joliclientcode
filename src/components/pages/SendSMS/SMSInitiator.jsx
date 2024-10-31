import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import Button from '../../utilities/Button';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';

const SMSInitiator = ({ CategoryName, count }) => {
  // State to set countdown on each resend
  const [counter, setCounter] = useState(0);

  //for using chakra toast
  const toast = useToast();

  // Decrementing the countdown each second
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const sendSMS = async () => {
    if (counter === 0) {
      setCounter(30);
    }
    try {
      await api.post('/admin/send-daily-updates', { job_category: CategoryName });
      toast({
        title: 'Success',
        description: 'SMS request received',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      showErrorToast(toast, err);
    }
  };
  return (
    <div className="job-category-wrapper">
      <div className="job-category-details-wrapper">
        <h4 className="category-name">{CategoryName}</h4>
        <p className="total-count"> {count}</p>
      </div>
      <Button colorScheme="blue" mt={6} onClick={sendSMS} isLoading={counter !== 0}>
        Send SMS
      </Button>
    </div>
  );
};

export default SMSInitiator;
