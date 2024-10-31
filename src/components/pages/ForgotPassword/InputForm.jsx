import React, { useState } from 'react';

import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import PasswordInput from '../../utilities/PasswordInput';
import Button from '../../utilities/Button';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
const InputForm = ({ phoneNumber, password, confirmPassword, onChange, sendOtp }) => {
  // State to set error msg of input
  const [errorMsg, setErrorMsg] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  //   function to validate input
  const validateInput = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

  // validation function for confirm password
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        confirmPassword: 'Password and Confirm Password does not match',
      }));
    } else {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        confirmPassword: '',
      }));
    }
  };
  // Function to call sendOtp if no error
  const buttonClick = () => {
    if (
      phoneNumber !== '' &&
      password !== '' &&
      password === confirmPassword &&
      errorMsg.phoneNumber === '' &&
      errorMsg.password === ''
    ) {
      sendOtp();
    } else {
      showErrorMsg('phoneNumber', phoneNumber, setErrorMsg);
      showErrorMsg('password', password, setErrorMsg);
      validateConfirmPassword();
    }
  };

  return (
    <>
      <h3 className="heading">Forgot Your Password ?</h3>
      <PhoneNumberInput
        idName="phoneNumber"
        isInvalid={errorMsg.phoneNumber !== ''}
        LabelName="Mobile Number"
        placeholder="Enter Mobile Number"
        value={phoneNumber}
        name="phoneNumber"
        onChange={onChange}
        errorMsg={errorMsg.password}
        onBlur={validateInput}
        mt={4}
      />
      <PasswordInput
        idName="password"
        isRequired={true}
        isInvalid={errorMsg.password !== ''}
        LabelName="New Password"
        placeholder="Enter New Password"
        name="password"
        value={password}
        onChange={onChange}
        errorMsg={errorMsg.password}
        onBlur={validateInput}
        mt={4}
      />
      <PasswordInput
        idName="confirmPassword"
        isRequired={true}
        isInvalid={errorMsg.confirmPassword !== ''}
        LabelName="Confirm Password"
        placeholder="Reenter  Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        errorMsg={errorMsg.confirmPassword}
        onBlur={validateConfirmPassword}
        mt={4}
      />
      <Button mt="3rem" onClick={buttonClick}>
        Change Password
      </Button>
    </>
  );
};

export default InputForm;
