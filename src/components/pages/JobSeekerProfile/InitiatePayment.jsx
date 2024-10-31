import React, { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import api from '../../../helpers/axios';
import { useHistory } from 'react-router-dom';
import { showErrorToast } from '../../../helpers/errorToast';
import Button from '../../utilities/Button';
import celebrateGif from './celebrate.gif';

const InitiatePayment = ({ buttonText }) => {
  // To re direct to payment page
  const history = useHistory();

  // Chakra ui toast
  const toast = useToast();

  const [isCelebrateVisible, setCelebrateVisible] = useState(false);
  const hideCelebrate = useCallback(() => setTimeout(() => setCelebrateVisible(false), 3600), [
    setCelebrateVisible,
  ]);
  const celebrate = () => {
    setCelebrateVisible(true);
    hideCelebrate();
  };

  const handlePayment = async () => {
    try {
      const res = await api.post('/job-seeker/create-order');
      var options = {
        // Razor Pay key
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: res.data.currency,
        name: 'J4Joli Web App',
        order_id: res.data.order_id,
        handler: function (response) {
          toast({
            title: 'Success',
            description: 'Payment Successful',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          celebrate();
        },
        theme: {
          color: '#6c4fff',
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        toast({
          title: 'Payment Failed',
          description: 'Sorry, your payment has been failed',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        history.push('/job-seeker/payment');
      });
      rzp1.open();
    } catch (err) {
      showErrorToast(toast, err);
    }
  };
  return (
    <div className="celebrate-wrapper-profile">
      <Button size="lg" colorScheme="green" onClick={handlePayment} mt={6}>
        {buttonText}
      </Button>
      <img
        style={{ visibility: isCelebrateVisible ? 'visible' : 'hidden' }}
        className="celebrate-gif"
        alt=""
        src={celebrateGif}
      />
    </div>
  );
};

export default InitiatePayment;
