import React, { useState } from 'react';

import './style.css';
import api from '../../../helpers/axios';
import { useToast } from '@chakra-ui/react';
import Button from '../../utilities/Button';
import useForm from '../../../hooks/useForm';
import { useHistory } from 'react-router-dom';
import PasswordInput from '../../utilities/PasswordInput';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { showErrorToast } from '../../../helpers/errorToast';

const ChangePassword = ({ user }) => {
  const history = useHistory();

  const [buttonLoading, setButtonLoading] = useState(false);

  const [values, onChange] = useForm({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State to set error
  const [errorMsg, setErrorMsg] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Chakra ui toast
  const toast = useToast();

  // Validation Function for Form Inputs
  const validateInput = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

  // validation function for confirm password
  const validateConfirmPassword = () => {
    if (values.newPassword !== values.confirmPassword) {
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

  // update Password onClick function
  const onButtonClick = () => {
    showErrorMsg('oldPassword', values.oldPassword, setErrorMsg);
    showErrorMsg('newPassword', values.newPassword, setErrorMsg);
    validateConfirmPassword();
    if (
      values.oldPassword !== '' &&
      values.newPassword !== '' &&
      errorMsg.oldPassword === '' &&
      errorMsg.newPassword === '' &&
      values.newPassword === values.confirmPassword
    ) {
      setButtonLoading(true);
      api
        .post(`/${user}/change-password`, {
          old_password: values.oldPassword,
          new_password: values.newPassword,
        })
        .then((res) => {
          setButtonLoading(false);
          toast({
            title: 'Success',
            description: 'Your password is successfully updated ',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          history.push('/employer/dashboard');
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err);
        });
    }
  };

  return (
    <div className="update-password">
      <div className="container">
        <h3>Update Password</h3>
        <PasswordInput
          idName="oldPassword"
          LabelName="Old Password"
          placeholder="Enter your old Password"
          value={values.oldPassword}
          isInvalid={errorMsg.oldPassword === '' ? false : true}
          name="oldPassword"
          onChange={onChange}
          className="input"
          onBlur={validateInput}
          errorMsg={errorMsg.oldPassword}
          mt={4}
        />
        <PasswordInput
          idName="newPassword"
          LabelName="New Password"
          placeholder="Enter the new Password"
          value={values.newPassword}
          isInvalid={errorMsg.newPassword === '' ? false : true}
          name="newPassword"
          onChange={onChange}
          className="input"
          onBlur={validateInput}
          errorMsg={errorMsg.newPassword}
          mt={4}
        />
        <PasswordInput
          idName="confirmPassword"
          isInvalid={errorMsg.confirmPassword !== ''}
          LabelName="Confirm Password"
          placeholder="Reenter  Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          errorMsg={errorMsg.confirmPassword}
          onBlur={validateConfirmPassword}
          mt={4}
        />
        <Button onClick={onButtonClick} isLoading={buttonLoading} className="button">
          Update Password
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
