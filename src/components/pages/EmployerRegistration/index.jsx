/*
React component for employer registration
This component validate all the data before api call
*/
import React, { useState, useEffect } from 'react';
import './style.css';
import TextInput from '../../utilities/TextInput';
import NumInput from '../../utilities/NumInput';
import EmailInput from '../../utilities/EmailInput';
import PasswordInput from '../../utilities/PasswordInput';
import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import CheckBoxInput from '../../utilities/CheckBoxInput';
import useForm from '../../../hooks/useForm.js';
import VerifyOtp from '../../utilities/VerifyOtp';
import { showErrorToast } from '../../../helpers/errorToast.js';
import { useToast, useDisclosure } from '@chakra-ui/react';
import api from '../../../helpers/axios';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { useHistory } from 'react-router-dom';
import { FcBusinessman, FcPrivacy, FcOrganization } from 'react-icons/fc';
import {  IoLocationSharp } from 'react-icons/io5';

import Button from '../../utilities/Button';
import { HashLink } from 'react-router-hash-link';

const EmployerRegistration = () => {
  // React Router dom useHistory to Redirect to Login
  const history = useHistory();
  // State to set otp input
  const [otp, setOtp] = useState('');
  // State to set otp error
  const [otpError, setOtpError] = useState(false);
  // State to set error msg
  const [ErrorMessage, setErrorMessage] = useState({
    name: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    companyName: '',
    city: '',
    state: '',
    zip: '',
    designation: '',
    password: '',
    confirmPassword: '',
  });
  /**
   * custom hook to handle form
   */
  const [values, onChange] = useForm({
    name: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    companyName: '',
    city: '',
    state: '',
    designation: '',
    password: '',
    confirmPassword: '',
  });
  // State to update pin code

  const [zip, setZip] = useState('');
  // States set register and re-send-otp button active

  const [buttonState, setButtonState] = useState(true);

  // State to set confirm password error
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    isInvalid: false,
    errMsg: '',
  });

  // To display toast

  const toast = useToast();

  // To display otp modal
    // eslint-disable-next-line
  const { isOpen, onOpen, onClose } = useDisclosure();

  // To set loading button active
  const [buttonLoading, setButtonLoading] = useState(false);

  // States to set two checkboxes active

  const [TermsAndConditions, setTermsAndCondition] = useState(false);
  const [DataSharingPolicy, setDataSharingPolicy] = useState(false);

  // Variables that controls the validity of reg form
  let formValidity = true;

  useEffect(() => {
    if (TermsAndConditions && DataSharingPolicy) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [TermsAndConditions, DataSharingPolicy]);

  // Function that set Register button active

  const handleTermsAndConditions = (e) => {
    setTermsAndCondition(e.target.checked);
  };
  const handleDataSharingPolicy = (e) => {
    setDataSharingPolicy(e.target.checked);
  };

  // Function to match match password and confirmPassword

  const validateConfirmPassword = () => {
    if (values.confirmPassword === values.password) {
      setConfirmPasswordError({ isInvalid: false, errMsg: '' });
    } else {
      setConfirmPasswordError({ isInvalid: true, errMsg: "Password doesn't match " });
      formValidity = false;
    }
  };
  // Function to handle form submit

  function handleForm() {
    // To check for empty fields

    if (
      values.name === '' ||
      values.password === '' ||
      values.designation === '' ||
      values.phoneNumber === '' ||
      values.companyName === '' ||
      values.city === '' ||
      values.state === '' ||
      zip === '' ||
      values.confirmPassword === ''
    ) {
      // If required fields are empty then form validity will be false
      formValidity = false;
    }
    showErrorMsg('name', values.name, setErrorMessage);
    showErrorMsg('phoneNumber', values.phoneNumber, setErrorMessage);
    showErrorMsg('whatsAppNumber', values.whatsAppNumber, setErrorMessage);
    showErrorMsg('email', values.email, setErrorMessage);
    showErrorMsg('companyName', values.companyName, setErrorMessage);
    showErrorMsg('city', values.city, setErrorMessage);
    showErrorMsg('state', values.state, setErrorMessage);
    showErrorMsg('zip', zip, setErrorMessage);
    showErrorMsg('designation', values.designation, setErrorMessage);
    showErrorMsg('password', values.password, setErrorMessage);
    validateConfirmPassword();
    if (
      ErrorMessage.name !== '' ||
      ErrorMessage.phoneNumber !== '' ||
      ErrorMessage.whatsAppNumber !== '' ||
      ErrorMessage.email !== '' ||
      ErrorMessage.companyName !== '' ||
      ErrorMessage.city !== '' ||
      ErrorMessage.state !== '' ||
      ErrorMessage.zip !== '' ||
      ErrorMessage.designation !== '' ||
      ErrorMessage.password !== ''
    )
      formValidity = false;

    let registerObj = {
      name: values.name,
      email: values.email,
      password: values.password,
      designation: values.designation,
      mobile_number: values.phoneNumber,
      company_address: {
        name: values.companyName,
        city: values.city,
        state: values.state,
        zip: zip,
      },
      whatsapp_number: values.whatsAppNumber,
    };
    if (values.whatsAppNumber === '') {
      delete registerObj['whatsapp_number'];
    }
    if (values.email === '') {
      delete registerObj['email'];
    }
    if (formValidity) {
      setButtonLoading(true);
      api
        .post('/employer/register', registerObj)
        .then((res) => {
          setButtonLoading(false);
          // onOpen();
          history.push('/employer/login');
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err);
        });
    }
  }

  // Function re-send otp
  const reSendOtp = () => {
    setOtp('');
    setOtpError(false);
    // Object to be passed with api request
    let registerObj = {
      name: values.name,
      email: values.email,
      password: values.password,
      designation: values.designation,
      mobile_number: values.phoneNumber,
      company_address: {
        name: values.companyName,
        city: values.city,
        state: values.state,
        zip: zip,
      },
      whatsapp_number: values.whatsAppNumber,
    };
    if (values.whatsAppNumber === '') {
      delete registerObj['whatsapp_number'];
    }
    if (values.email === '') {
      delete registerObj['email'];
    }
    api
      .post('/employer/register', registerObj)
      .then((res) => {
        toast({
          title: 'Success',
          description: 'OTP has been sended agin',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  };

  // Function to verify otp

  const verifyOtp = () => {
    const otpObj = {
      otp: otp,
      mobile_number: values.phoneNumber,
    };
    api
      .post('/employer/verify', otpObj)
      .then((res) => {
        onClose();
        history.push('/employer/login');
        toast({
          title: 'OTP verified',
          description: ' Your account has been verified ',
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
  // Function to show error message
  const validateData = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMessage);
  };

  return (
    <div className="employer-registration">
      <h2>Registration</h2>
      <div className="form">
        <div className="row">
          <div className="column">
            <div className="container">
              <div className="heading-container">
                <FcBusinessman className="icon" />
                <h4>Your Info</h4>
              </div>
              <TextInput
                idName="name"
                isRequired={true}
                isInvalid={ErrorMessage.name !== ''}
                LabelName="Name"
                placeholder="Enter your Name"
                value={values.name}
                name="name"
                onChange={onChange}
                onBlur={validateData}
                errorMsg={ErrorMessage.name}
                mt={4}
              />
              <PhoneNumberInput
                idName="phoneNumber"
                isRequired={true}
                isInvalid={ErrorMessage.phoneNumber !== ''}
                LabelName="Phone Number"
                placeholder="Enter your phone number"
                value={values.phoneNumber}
                name="phoneNumber"
                onChange={onChange}
                errorMsg={ErrorMessage.phoneNumber}
                onBlur={validateData}
                mt={4}
              />
              <PhoneNumberInput
                idName="whatsAppNumber"
                isRequired={false}
                isInvalid={ErrorMessage.whatsAppNumber !== ''}
                LabelName="WhatsApp Number"
                placeholder="Enter your whatsapp number"
                value={values.whatsAppNumber}
                name="whatsAppNumber"
                onChange={onChange}
                errorMsg={ErrorMessage.whatsAppNumber}
                onBlur={validateData}
                mt={4}
              />
              <EmailInput
                idName="email"
                isInvalid={ErrorMessage.email !== ''}
                LabelName="Email"
                placeholder="Enter your email"
                value={values.email}
                name="email"
                onChange={onChange}
                errorMsg={ErrorMessage.email}
                onBlur={validateData}
                mt={4}
              />
            </div>
            <div className="container">
              <div className="heading-container">
                <FcOrganization className="icon" />
                <h4>Company Info</h4>
              </div>
              <TextInput
                idName="companyName"
                LabelName="Company Name"
                isRequired={true}
                isInvalid={ErrorMessage.companyName !== ''}
                placeholder="Enter your company name"
                name="companyName"
                value={values.companyName}
                onChange={onChange}
                errorMsg={ErrorMessage.companyName}
                onBlur={validateData}
                mt={4}
              />
              <TextInput
                idName="designation"
                isRequired={true}
                isInvalid={ErrorMessage.designation !== ''}
                LabelName=" Your Designation"
                placeholder="Enter your designation"
                value={values.designation}
                name="designation"
                onChange={onChange}
                errorMsg={ErrorMessage.designation}
                onBlur={validateData}
                mt={4}
              />
            </div>
          </div>
          <div className="column">
            <div className="container">
              <div className="heading-container">
                <IoLocationSharp className="icon" color="#1565C0" />
                <h4>Company Location </h4>
              </div>
              <TextInput
                idName="city"
                isRequired={true}
                isInvalid={ErrorMessage.city !== ''}
                LabelName="City and District"
                placeholder="Enter city and district"
                value={values.city}
                name="city"
                onChange={onChange}
                errorMsg={ErrorMessage.city}
                onBlur={validateData}
                mt={4}
              />
              <TextInput
                idName="state"
                isRequired={true}
                isInvalid={ErrorMessage.state !== ''}
                LabelName="State"
                placeholder="Enter state"
                value={values.state}
                name="state"
                onChange={onChange}
                errorMsg={ErrorMessage.state}
                onBlur={validateData}
                mt={4}
              />
              <NumInput
                idName="zip"
                isRequired={true}
                isInvalid={ErrorMessage.zip !== ''}
                LabelName="PIN Code"
                value={values.zip}
                placeholder="Enter postal pin code"
                name="zip"
                onChange={(value) => setZip(value)}
                errorMsg={ErrorMessage.zip}
                onBlur={validateData}
                mt={4}
              />
            </div>
            <div className="container">
              <div className="heading-container">
                <FcPrivacy className="icon" />
                <h4>Pick a Password</h4>
              </div>
              <PasswordInput
                idName="password"
                isRequired={true}
                isInvalid={ErrorMessage.password}
                LabelName="Password"
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={onChange}
                errorMsg={ErrorMessage.password}
                onBlur={validateData}
                mt={4}
              />
              <PasswordInput
                idName="confirmPassword"
                isRequired={true}
                isInvalid={confirmPasswordError.isInvalid}
                LabelName="Confirm Password"
                placeholder="Enter your password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
                errorMsg={confirmPasswordError.errMsg}
                onBlur={validateConfirmPassword}
                mt={4}
              />
            </div>
          </div>
        </div>
        <div className="policy-wrapper">
          <div className="policy-checkbox">
            <CheckBoxInput
              idName="TermsAndConditions"
              isChecked={TermsAndConditions}
              onChange={handleTermsAndConditions}
              mt={2}
              mb={2}
            />
            <div className="policy-checkbox-text">
              <p>
                I have read and accepted the&nbsp;
                <HashLink smooth className="link" to="/policies/#terms" target="_blank">
                  Terms and Condition
                </HashLink>
              </p>
            </div>
          </div>
          <div className="policy-checkbox">
            <CheckBoxInput
              className="checkbox"
              idName="DataSharing"
              isChecked={DataSharingPolicy}
              onChange={handleDataSharingPolicy}
              mb={2}
            />
            <div className="policy-checkbox-text">
              <p>
                I have read and accepted the&nbsp;
                <HashLink smooth className="link" to="/policies/#privacy-policy" target="_blank">
                  PrivacyPolicy
                </HashLink>
              </p>
            </div>
          </div>
        </div>
        <Button isDisabled={buttonState} onClick={handleForm} isLoading={buttonLoading}>
          Register
        </Button>
      </div>

      <VerifyOtp
        isOpen={isOpen}
        onClose={onClose}
        reSendOtp={reSendOtp}
        verifyOtp={verifyOtp}
        otp={otp}
        setOtp={setOtp}
        otpError={otpError}
      />
    </div>
  );
};

export default EmployerRegistration;
