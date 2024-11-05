import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import TextInput from '../../utilities/TextInput';
import NumInput from '../../utilities/NumInput';
import EmailInput from '../../utilities/EmailInput';
import PasswordInput from '../../utilities/PasswordInput';
import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import CheckBoxInput from '../../utilities/CheckBoxInput';
import GenderPicker from '../../utilities/GenderPicker';
import SelectInput from '../../utilities/SelectInput';
import DatePicker from '../../utilities/DatePicker';
import VerifyOtp from '../../utilities/VerifyOtp';
import useForm from '../../../hooks/useForm.js';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { showErrorToast } from '../../../helpers/errorToast';
import api from '../../../helpers/axios';
import { useHistory } from 'react-router-dom';
import { useToast, useDisclosure, Alert, AlertIcon } from '@chakra-ui/react';
import Button from '../../utilities/Button';
import { FcAdvertising, FcBusinessman, FcGraduationCap, FcHome, FcPrivacy } from 'react-icons/fc';
import { HashLink } from 'react-router-hash-link';
import { getDistricts } from '../../../districts.js';

const JobSeekerRegistration = () => {
  // variables that controls the validity of reg form
  let formValidity = true;
  // array that store all values for referred by select input
  let referredBy = ['J4Joli tele-caller', 'Facebook', 'Advertisements', 'Instagram', 'Other'];
  // array that store all the educational qualification
  let educational_qualification = [
    'SSLC',
    'Plus-2',
    'Graduation',
    'Post Graduation',
    'Engineering',
    'Diploma',
    'ITA',
    'ITC',
    'Other',
  ];

  // const districtList = getDistricts()
  const { CategoryName } = useParams();

  // React Router dom useHistory to Redirect to Login
  const history = useHistory();

  //to display toast
  const toast = useToast();

  // Chakra ui Modal useDisclosure
  // eslint-disable-next-line
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for OTP
  const [otp, setOtp] = useState('');

  // state to set otp error
  const [otpError, setOtpError] = useState(false);

  //state to set gender
  const [gender, setGender] = useState('null');

  //state to set referred by
  const [reference, setReference] = useState('');

  //state set educational qualification
  const [educationalQualification, setEducationalQualification] = useState('');

  //state to update dob
  const [dob, setDob] = useState('');

  // states set register and re-send-otp button active
  const [buttonState, setButtonState] = useState(true);

  // To set loading button active
  const [buttonLoading, setButtonLoading] = useState(false);

  // states to set two checkboxes active

  const [TermsAndConditions, setTermsAndCondition] = useState(false);
  const [DataSharingPolicy, setDataSharingPolicy] = useState(false);

  const [districtList,setDistrictList] = useState([]);

  /**
   * custom hook to handle form
   */
  const [values, onChange] = useForm({
    name: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    address_line_1: '',
    address_line_2: '',
    district: '',
    state: '',
    experience: '',
    languages_known: '',
    computer_knowledge: '',
    tele_caller_id: '',
    password: '',
    confirmPassword: '',
  });

  //state to set error msg
  const [ErrorMessage, setErrorMessage] = useState({
    name: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    address_line_1: '',
    address_line_2: '',
    state: '',
    zip: '',
    gender: '',
    dob: '',
    educational_qualification: '',
    experience: '',
    languages_known: '',
    computer_knowledge: '',
    reference: '',
    tele_caller_id: '',
    password: '',
    confirmPassword: '',
  });

  //state to update pin code

  const [zip, setZip] = useState('');

  const [district, setDistrict] = useState('');

  // state to set confirm password error
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    isInvalid: false,
    errMsg: '',
  });

  // State to set sub categories
  const [subCategories, setSubCategories] = useState([]);

  //function that set Register button active
  const handleTermsAndConditions = (e) => {
    setTermsAndCondition(e.target.checked);
  };
  const handleDataSharingPolicy = (e) => {
    setDataSharingPolicy(e.target.checked);
  };
  //function to match match password and confirmPassword

  const validateConfirmPassword = (e) => {
    if (values.confirmPassword === values.password) {
      setConfirmPasswordError({ isInvalid: false, errMsg: '' });
    } else {
      setConfirmPasswordError({ isInvalid: true, errMsg: "Password doesn't match " });
      formValidity = false;
    }
  };
  // function validate data and show error msg
  const validateData = (e) => {
    formValidity = showErrorMsg(e.target.name, e.target.value, setErrorMessage);
  };
  const removeGenderErrorMsg = () => {
    if (gender !== 'null') {
      setErrorMessage((prevErrorMessage) => {
        return {
          ...prevErrorMessage,
          gender: '',
        };
      });
    }
  };
  //function to update values of (referred by, educational qualification, dob)i
  const updateFormValues = (e) => {
    if (e.target.name === 'reference') {
      setReference(e.target.value);
      showErrorMsg('reference', reference, setErrorMessage);
    } else if (e.target.name === 'educational_qualification') {
      setEducationalQualification(e.target.value);
      formValidity = showErrorMsg('educational_qualification', e.target.value, setErrorMessage);
    } else if (e.target.name === 'dob') {
      setDob(e.target.value);
    } else if (e.target.name === 'district') {
      setDistrict(e.target.value);
    }
  };
  // function to handle reg form submit
  const handleForm = () => {
    //to check for empty fields
    if (
      values.name === '' ||
      values.phoneNumber === '' ||
      gender === 'gender' ||
      dob === '' ||
      values.address_line_1 === '' ||
      values.address_line_2 === '' ||
      district === '' ||
      values.state === '' ||
      zip === '' ||
      reference === '' ||
      educationalQualification === '' ||
      values.password === ''
    )
      formValidity = false;

    if (reference === 'J4Joli tele-caller' && values.tele_caller_id === '') {
      formValidity = false;
    }
    showErrorMsg('name', values.name, setErrorMessage);
    showErrorMsg('phoneNumber', values.phoneNumber, setErrorMessage);
    showErrorMsg('whatsAppNumber', values.whatsAppNumber, setErrorMessage);
    showErrorMsg('email', values.email, setErrorMessage);
    showErrorMsg('gender', gender, setErrorMessage);
    showErrorMsg('dob', dob, setErrorMessage);
    showErrorMsg('address_line_1', values.address_line_1, setErrorMessage);
    showErrorMsg('address_line_2', values.address_line_2, setErrorMessage);
    showErrorMsg('district', district, setErrorMessage);
    showErrorMsg('state', values.state, setErrorMessage);
    showErrorMsg('zip', zip, setErrorMessage);
    showErrorMsg('educational_qualification', educationalQualification, setErrorMessage);
    showErrorMsg('experience', values.experience, setErrorMessage);
    showErrorMsg('languages_known', values.languages_known, setErrorMessage);
    showErrorMsg('computer_knowledge', values.computer_knowledge, setErrorMessage);
    showErrorMsg('reference', reference, setErrorMessage);
    showErrorMsg('password', values.password, setErrorMessage);
    validateConfirmPassword();
    // To check tele-caller id if reference is
    if (reference === 'J4Joli tele-caller') {
      showErrorMsg('tele_caller_id', values.tele_caller_id, setErrorMessage);
    }
    if (
      //to check for error in all fields
      ErrorMessage.name !== '' ||
      ErrorMessage.phoneNumber !== '' ||
      ErrorMessage.whatsAppNumber !== '' ||
      ErrorMessage.email !== '' ||
      ErrorMessage.gender !== '' ||
      ErrorMessage.dob !== '' ||
      ErrorMessage.address_line_1 !== '' ||
      ErrorMessage.address_line_2 !== '' ||
      ErrorMessage.district !== '' ||
      ErrorMessage.state !== '' ||
      ErrorMessage.zip !== '' ||
      ErrorMessage.educational_qualification !== '' ||
      ErrorMessage.experience !== '' ||
      ErrorMessage.computer_knowledge !== '' ||
      ErrorMessage.languages_known !== '' ||
      ErrorMessage.reference !== '' ||
      ErrorMessage.password !== '' ||
      ErrorMessage.confirmPassword !== ''
    ) {
      formValidity = false;
    }
    if (reference === 'J4Joli tele-caller' && ErrorMessage.tele_caller_id !== '') {
      formValidity = false;
    }

    if (formValidity) {
      let jobSeekerDetails = {
        name: values.name,
        email: values.email,
        gender: gender,
        address: {
          line_one: values.address_line_1,
          line_two: values.address_line_2,
          district: district,
          state: values.state,
          zip: zip,
        },
        password: values.password,
        experience: values.experience,
        referred_by: reference,
        job_category: CategoryName,
        mobile_number: values.phoneNumber,
        date_of_birth: dob,
        languages_known: values.languages_known,
        whatsapp_number: values.whatsAppNumber,
        education_details: educationalQualification,
        computer_knowledge: values.computer_knowledge,
      };
      // Remove not required values if they are null
      if (values.whatsAppNumber === '') delete jobSeekerDetails['whatsapp_number'];
      if (values.email === '') delete jobSeekerDetails['email'];
      if (values.experience === '') delete jobSeekerDetails['experience'];
      if (values.languages_known === '') delete jobSeekerDetails['languages_known'];
      if (values.computer_knowledge === '') delete jobSeekerDetails['computer_knowledge'];
      if (reference === '') jobSeekerDetails.referred_by = 'Not Provided';
      else if (reference === 'J4Joli tele-caller')
        jobSeekerDetails.referred_by = 'Tele Caller ID ' + values.tele_caller_id;

      // Api call
      setButtonLoading(true);
      api
        .post('/job-seeker/register', jobSeekerDetails)
        .then((res) => {
          setButtonLoading(false);
          // onOpen();
          toast({
            title: 'Account Created',
            description: ' Your account has been created. Now you can Login ',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          history.push('/job-seeker/login');
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err);
        });
    }
  };

  // Function re-send otp
  const reSendOtp = () => {
    setOtp('');
    setOtpError(false);
    // Object to be passed with api request
    let jobSeekerDetails = {
      name: values.name,
      email: values.email,
      gender: gender,
      address: {
        line_one: values.address_line_1,
        line_two: values.address_line_2,
        district: district,
        state: values.state,
        zip: zip,
      },
      password: values.password,
      experience: values.experience,
      referred_by: reference,
      job_category: CategoryName,
      mobile_number: values.phoneNumber,
      date_of_birth: dob,
      languages_known: values.languages_known,
      whatsapp_number: values.whatsAppNumber,
      education_details: educationalQualification,
      computer_knowledge: values.computer_knowledge,
    };
    // Remove not required values if they are null

    if (values.whatsAppNumber === '') delete jobSeekerDetails['whatsapp_number'];
    if (values.email === '') delete jobSeekerDetails['email'];
    if (values.experience === '') delete jobSeekerDetails['experience'];
    if (values.languages_known === '') delete jobSeekerDetails['languages_known'];
    if (values.computer_knowledge === '') delete jobSeekerDetails['computer_knowledge'];
    if (reference === '') jobSeekerDetails.referred_by = 'Not Provided';
    else if (reference === 'J4Joli tele-caller')
      jobSeekerDetails.referred_by = 'Tele Caller ID ' + values.tele_caller_id;

    // Api call
    api
      .post('/job-seeker/register', jobSeekerDetails)
      .then()
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
      .post('/job-seeker/verify', otpObj)
      .then((res) => {
        onClose();
        history.push('/job-seeker/login');
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

  useEffect(() => {
    if (TermsAndConditions && DataSharingPolicy) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [TermsAndConditions, DataSharingPolicy]);
  useEffect(() => {
    api.get('/district').then((res) => {
      // setDistrictList(res.data)
      const list = []
      res.data.forEach((item) => {
        list.push(item.name)
      })
      // console.log(list)
      setDistrictList(list)

    }).catch((err) => {
      showErrorToast(toast, err);
    });
  },[])
  const getSubCategories = async () => {
    api
      .get(`/job-category/get-job-category?job_category=${CategoryName}`)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.job_category?.sub_category) {
          setSubCategories(res?.data?.job_category?.sub_category);
        }
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  };
 //eslint-disable-next-line
  useEffect(() => {
    getSubCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="job-seeker-registration">
      <h2>Registration</h2>
      <p className="category-details">{`You are registering for ${CategoryName} Category`}</p>
      {subCategories.length ? (
        <Alert status="info">
          <AlertIcon />
          The following jobs will be available in this category: {subCategories.join(', ')}
        </Alert>
      ) : null}
      <div className="form">
        <div className="row">
          <div className="column">
            <div className="container">
              <div className="heading-container">
                <FcBusinessman className="icon" />
                <h4>Personal Details</h4>
              </div>
              <TextInput
                idName="name"
                isRequired={true}
                isInvalid={ErrorMessage.name !== ''}
                LabelName="Name"
                placeholder="Enter your name"
                value={values.name}
                name="name"
                onChange={onChange}
                onBlur={validateData}
                errorMsg={ErrorMessage.name}
                mt={4}
              />
              <GenderPicker
                idName="gender"
                isRequired={true}
                isInvalid={ErrorMessage.gender !== ''}
                errorMsg={ErrorMessage.gender}
                onBlur={validateData}
                LabelName="Gender"
                direction="row"
                name="gender"
                mt={4}
                value={gender}
                onChange={setGender}
                onClick={removeGenderErrorMsg}
              />
              <DatePicker
                idName="dob"
                name="dob"
                isRequired={true}
                isInvalid={ErrorMessage.dob !== ''}
                LabelName="Date of Birth"
                mt={4}
                errorMsg={ErrorMessage.dob}
                value={dob}
                onChange={updateFormValues}
                onBlur={validateData}
              />
            </div>
            <div className="container">
              <div className="heading-container">
                <FcGraduationCap className="icon" />
                <h4>Qualification Details</h4>
              </div>
              <SelectInput
                isRequired={true}
                isInvalid={ErrorMessage.educational_qualification !== ''}
                errorMsg={ErrorMessage.educational_qualification}
                dataList={educational_qualification}
                mt={4}
                name="educational_qualification"
                value={educationalQualification}
                onChange={updateFormValues}
                LabelName="Educational Qualification"
                onBlur={validateData}
              />
              <TextInput
                idName="experience"
                isRequired={false}
                isInvalid={ErrorMessage.experience !== ''}
                LabelName="Experience"
                placeholder="Enter your experience"
                value={values.experience}
                name="experience"
                onChange={onChange}
                errorMsg={ErrorMessage.experience}
                onBlur={validateData}
                mt={4}
              />
              <TextInput
                idName="languages_known"
                isRequired={false}
                isInvalid={ErrorMessage.languages_known !== ''}
                LabelName="Languages Known"
                placeholder="Languages you know"
                value={values.languages_known}
                name="languages_known"
                onChange={onChange}
                errorMsg={ErrorMessage.languages_known}
                onBlur={validateData}
                mt={4}
              />
              <TextInput
                idName="computer_knowledge"
                isRequired={false}
                isInvalid={ErrorMessage.computer_knowledge !== ''}
                LabelName="Computer Knowledge"
                placeholder="Your computer knowledge "
                value={values.computer_knowledge}
                name="computer_knowledge"
                onChange={onChange}
                errorMsg={ErrorMessage.computer_knowledge}
                onBlur={validateData}
                mt={4}
              />
            </div>
            <div className="container">
              <div className="heading-container">
                <FcAdvertising className="icon" />
                <h4>Reference</h4>
              </div>
              <SelectInput
                isRequired={true}
                dataList={referredBy}
                mt={4}
                name="reference"
                value={reference}
                onChange={updateFormValues}
                LabelName="From Where you got to Know about J4Joli"
                isInvalid={ErrorMessage.reference !== ''}
                errorMsg={ErrorMessage.reference}
                onBlur={validateData}
              />

              {reference === 'J4Joli tele-caller' ? (
                <TextInput
                  isRequired={true}
                  idName="tele-caller-id"
                  isInvalid={ErrorMessage.tele_caller_id !== ''}
                  errorMsg={ErrorMessage.tele_caller_id}
                  name="tele_caller_id"
                  LabelName="Tele Caller ID"
                  placeholder="Enter Tele caller ID"
                  mt={4}
                  value={values.tele_caller_id}
                  onChange={onChange}
                  onBlur={validateData}
                />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="column">
            <div className="container">
              <div className="heading-container">
                <FcHome className="icon" />
                <h4>Contact Details</h4>
              </div>
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
              <TextInput
                idName="address_line_1"
                isRequired={true}
                LabelName="Address Line 1"
                isInvalid={ErrorMessage.address_line_1 !== ''}
                placeholder="Enter your address line 1"
                value={values.address_line_1}
                name="address_line_1"
                onChange={onChange}
                errorMsg={ErrorMessage.address_line_1}
                onBlur={validateData}
                mt={4}
              />

              <TextInput
                idName="address_line_2"
                isRequired={true}
                isInvalid={ErrorMessage.address_line_2 !== ''}
                LabelName="Address Line 2"
                placeholder=" Enter your address line 2"
                value={values.address_line_2}
                name="address_line_2"
                onChange={onChange}
                errorMsg={ErrorMessage.address_line_2}
                onBlur={validateData}
                mt={4}
              />
              <SelectInput
                isRequired={true}
                isInvalid={ErrorMessage.district !== ''}
                errorMsg={ErrorMessage.district}
                dataList={districtList?districtList:[]}
                mt={4}
                name="district"
                value={district}
                onChange={updateFormValues}
                LabelName="District"
                onBlur={validateData}
              />
              <TextInput
                idName="state"
                isRequired={true}
                isInvalid={ErrorMessage.state !== ''}
                LabelName="State"
                placeholder="Enter your state"
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

export default JobSeekerRegistration;
