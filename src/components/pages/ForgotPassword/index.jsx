import React, { useState } from 'react';

import './style.css';
import useForm from '../../../hooks/useForm';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { showErrorToast } from '../../../helpers/errorToast';
import VerifyOtp from '../../utilities/VerifyOtp';
import InputForm from './InputForm';
import api from '../../../helpers/axios';
import { useHistory } from 'react-router-dom';

const ForgotPassword = ({ user }) => {
  // React-router-dom hook to Redirect to Login
  const history = useHistory();

  // Chakra ui toast
  const toast = useToast();

  // state For phone number and password
  const [values, onChange] = useForm({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  // State for OTP
  const [otp, setOtp] = useState('');

  // state to set otp error
  const [otpError, setOtpError] = useState(false);

  // Chakra ui Modal useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to send otp when phone no is valid
  const sendOtp = () => {
    if (
      values.phoneNumber !== '' &&
      values.password !== '' &&
      values.confirmPassword === values.password
    ) {
      api
        .post(`/${user}/send-otp`, { mobile_number: values.phoneNumber })
        .then((res) => {
          onOpen();
        })
        .catch((err) => {
          showErrorToast(toast, err);
        });
    }
  };

  // Function to resend otp
  const reSendOtp = () => {
    api
      .post(`/${user}/send-otp`, { mobile_number: values.phoneNumber })
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Otp has been successfully resented',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  };

  // Function to update password after entering otp
  const updatePassword = () => {
    api
      .post(`/${user}/forgot-password`, {
        otp: otp,
        password: values.password,
        mobile_number: values.phoneNumber,
      })
      .then((res) => {
        onClose();
        history.push(`/${user}/login`);
        toast({
          title: 'Success',
          description: 'Your Password has been successfully updated',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setOtpError(true);
        showErrorToast(toast, err);
      });
  };

  return (
    <div className="forgot-password">
      <div className="container">
        <InputForm
          phoneNumber={values.phoneNumber}
          password={values.password}
          confirmPassword={values.confirmPassword}
          onChange={onChange}
          sendOtp={sendOtp}
        />
      </div>

      <VerifyOtp
        isOpen={isOpen}
        onClose={onClose}
        reSendOtp={reSendOtp}
        verifyOtp={updatePassword}
        otp={otp}
        setOtp={setOtp}
        otpError={otpError}
      />
    </div>
  );
};

export default ForgotPassword;
