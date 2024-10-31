import React, { useState } from 'react';
import './style.css';
import Button from '../../utilities/Button';
import { useToast } from '@chakra-ui/react';
import TextInput from '../../utilities/TextInput';
import PasswordInput from '../../utilities/PasswordInput';
import useForm from '../../../hooks/useForm';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { Link, useHistory } from 'react-router-dom';
import { useSetRhinoState } from '../../context';

const Login = ({ userType }) => {
  const history = useHistory();

  /* eslint-disable */
  // user is initiated to start a re render in layout
  const setUser = useSetRhinoState('user');
  /* eslint-enable */

  // State to store
  const [values, onChange] = useForm({
    phoneNumber: '',
    password: '',
  });

  // State to set error
  const [errorMsg, setErrorMsg] = useState({ phoneNumber: '', password: '' });

  // Chakra ui toast
  const toast = useToast();

  // Validation Function for Form Inputs
  const validateInput = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

  //state to set loading button
  const [loading, setLoading] = useState(false);

  // Login Button onClick function
  const onButtonClick = () => {
    if (
      values.phoneNumber !== '' &&
      values.password !== '' &&
      errorMsg.phoneNumber === '' &&
      errorMsg.password === ''
    ) {
      setLoading(true);
      api
        .post(`/${userType}/login`, {
          mobile_number: values.phoneNumber,
          password: values.password,
        })
        .then((res) => {
          setLoading(false);
          setUser({
            is_user_logged_in: true,
            user_type: userType,
            isConsultancy: res.data.isConsultancy,
          });
          toast({
            title: 'Success',
            description: res.data.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          history.push(`/${userType}/dashboard`);
        })
        .catch((err) => {
          setLoading(false);
          showErrorToast(toast, err);
        });
    } else {
      showErrorMsg('phoneNumber', values.phoneNumber, setErrorMsg);
      showErrorMsg('password', values.password, setErrorMsg);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h3>{userType === 'employer' ? 'Employer Login' : 'Job Seeker Login'}</h3>
        <TextInput
          idName="phoneNumber"
          placeholder="Mobile Number"
          value={values.phoneNumber}
          isInvalid={errorMsg.phoneNumber === '' ? false : true}
          name="phoneNumber"
          onChange={onChange}
          className="input"
          onBlur={validateInput}
          errorMsg={errorMsg.phoneNumber}
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
        <div className="forgot-container">
          <Link to={`/${userType}/forgot-password`} className="forgot-link">
            Forgot Password ?
          </Link>
        </div>
        <Button
          mt="1rem"
          height="45px"
          width="150px"
          variant="solid"
          onClick={onButtonClick}
          isLoading={loading}
        >
          LogIn
        </Button>
        <p className="register">
          Don't have an account ?&nbsp;
          <Link
            to={userType === 'employer' ? '/employer/register' : '/job-seeker'}
            className="register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
