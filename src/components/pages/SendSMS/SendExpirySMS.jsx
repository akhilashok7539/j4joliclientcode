import React, { useState, useEffect } from 'react';
import Button from '../../utilities/Button';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { useToast } from '@chakra-ui/react';

const SendExpirySMS = () => {

  const [counter, setCounter] = useState(0);

  const toast = useToast();

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const sendSMS = async () => {
    if (counter === 0) {
      setCounter(30);
    }
    try {
      await api.post('/admin/send-expired-sms')
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
  }
  return (
    <div className="job-category-wrapper">
      <Button colorScheme="blue" mt={6} onClick={sendSMS} isLoading={counter !== 0}>
        Send Expiry SMS
      </Button>
    </div>
  )
}

export default SendExpirySMS;