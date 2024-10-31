import React, { useState } from 'react';
import './style.css';
import Button from '../../utilities/Button';
import { useToast } from '@chakra-ui/react';
import PasswordInput from '../../utilities/PasswordInput';
import useForm from '../../../hooks/useForm';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { useHistory } from 'react-router-dom';
import { useSetRhinoState } from '../../context';

const AdminLogin = () => {
  /* eslint-disable */
  // user is initiated to start a re render in layout
  const setUser = useSetRhinoState('user');
  /* eslint-enable */

  const history = useHistory();
  // State to store
  const [values, onChange] = useForm({
    username: '',
    password: '',
  });

  // State to set error
  const [errorMsg, setErrorMsg] = useState({ username: '', password: '' });

  // To set loading button active
  const [buttonLoading, setButtonLoading] = useState(false);

  // Chakra ui toast
  const toast = useToast();

  // Validation Function for Form Inputs
  const validateInput = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

  // Login Button onClick function
  const onButtonClick = () => {
    if (
      values.username !== '' &&
      values.password !== '' &&
      errorMsg.username === '' &&
      errorMsg.password === ''
    ) {
      setButtonLoading(true);
      api
        .post(`/admin/login`, {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          setButtonLoading(false);
          toast({
            title: 'Success',
            description: 'You are now logged in ',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setUser({ is_user_logged_in: true, user_type: 'admin' });
          history.push('/admin/dashboard/approved-jobs/1');
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err);
        });
    } else {
      showErrorMsg('username', values.username, setErrorMsg);
      showErrorMsg('password', values.password, setErrorMsg);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h3>Admin Login</h3>
        <PasswordInput
          idName="username"
          placeholder="User Name"
          value={values.username}
          isInvalid={errorMsg.username === '' ? false : true}
          name="username"
          onChange={onChange}
          className="input"
          onBlur={validateInput}
          errorMsg={errorMsg.username}
        />
        <PasswordInput
          idName="password"
          placeholder="Password"
          value={values.password}
          isInvalid={errorMsg.password === '' ? false : true}
          name="password"
          onChange={onChange}
          className="input"
          onBlur={validateInput}
          errorMsg={errorMsg.password}
        />
        <Button mt="2rem" onClick={onButtonClick} isLoading={buttonLoading}>
          LogIn
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
