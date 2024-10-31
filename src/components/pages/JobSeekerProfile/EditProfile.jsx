import React, { useState } from 'react';
import TextInput from '../../utilities/TextInput';
import NumInput from '../../utilities/NumInput';
import EmailInput from '../../utilities/EmailInput';
import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import SelectInput from '../../utilities/SelectInput';
import useForm from '../../../hooks/useForm.js';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { showErrorToast } from '../../../helpers/errorToast';
import api from '../../../helpers/axios';
import { useToast } from '@chakra-ui/react';
import Button from '../../utilities/Button';
import { FcBusinessman, FcGraduationCap, FcHome } from 'react-icons/fc';

const EditProfile = ({ profileInfo }) => {
  // variables that controls the validity of reg form
  let formValidity = true;
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

  //to display toast
  const toast = useToast();

  //state set educational qualification
  const [educationalQualification, setEducationalQualification] = useState(
    profileInfo.education_details
  );

  //state to set error msg
  const [ErrorMessage, setErrorMessage] = useState({
    name: '',
    whatsAppNumber: '',
    email: '',
    address_line_1: '',
    address_line_2: '',
    district: '',
    state: '',
    zip: '',
    educational_qualification: '',
    experience: '',
    languages_known: '',
    computer_knowledge: '',
    reference: '',
  });

  //state to set loading button
  const [buttonLoading, setButtonLoading] = useState(false);

  //state to update pin code

  const [zip, setZip] = useState(profileInfo.address.zip);

  // function validate data and show error msg
  const validateData = (e) => {
    formValidity = showErrorMsg(e.target.name, e.target.value, setErrorMessage);
  };

  //function to update values of (referred by, educational qualification, dob)i
  const updateFormValues = (e) => {
    if (e.target.name === 'educational_qualification') {
      setEducationalQualification(e.target.value);
      formValidity = showErrorMsg('educational_qualification', e.target.value, setErrorMessage);
    }
  };

  // function to handle reg form submit
  const handleForm = () => {
    //to check for empty fields
    if (
      values.name === '' ||
      values.address_line_1 === '' ||
      values.address_line_2 === '' ||
      values.district === '' ||
      values.state === '' ||
      zip === '' ||
      educationalQualification === ''
    )
      formValidity = false;

    showErrorMsg('name', values.name, setErrorMessage);
    showErrorMsg('whatsAppNumber', values.whatsAppNumber, setErrorMessage);
    showErrorMsg('email', values.email, setErrorMessage);
    showErrorMsg('address_line_1', values.address_line_1, setErrorMessage);
    showErrorMsg('address_line_2', values.address_line_2, setErrorMessage);
    showErrorMsg('district', values.district, setErrorMessage);
    showErrorMsg('state', values.state, setErrorMessage);
    showErrorMsg('zip', zip, setErrorMessage);
    showErrorMsg('educational_qualification', educationalQualification, setErrorMessage);
    showErrorMsg('experience', values.experience, setErrorMessage);
    showErrorMsg('languages_known', values.languages_known, setErrorMessage);
    showErrorMsg('computer_knowledge', values.computer_knowledge, setErrorMessage);
    if (
      //to check for error in all fields
      ErrorMessage.name !== '' ||
      ErrorMessage.whatsAppNumber !== '' ||
      ErrorMessage.email !== '' ||
      ErrorMessage.address_line_1 !== '' ||
      ErrorMessage.address_line_2 !== '' ||
      ErrorMessage.district !== '' ||
      ErrorMessage.state !== '' ||
      ErrorMessage.zip !== '' ||
      ErrorMessage.educational_qualification !== '' ||
      ErrorMessage.experience !== '' ||
      ErrorMessage.computer_knowledge !== '' ||
      ErrorMessage.languages_known !== ''
    )
      formValidity = false; // false if error in any field

    if (formValidity) {
      let jobSeekerDetails = {
        name: values.name,
        email: values.email,
        address: {
          line_one: values.address_line_1,
          line_two: values.address_line_2,
          district: values.district,
          state: values.state,
          zip: zip,
        },
        experience: values.experience,
        languages_known: values.languages_known,
        whatsapp_number: values.whatsAppNumber,
        education_details: educationalQualification,
        computer_knowledge: values.computer_knowledge,
      };

      setButtonLoading(true);

      api
        .patch('/job-seeker', jobSeekerDetails)
        .then((res) => {
          setButtonLoading(false);
          toast({
            title: 'Success',
            description: 'Profile Updated Successfully',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err);
        });
    }
  };

  /**
   * custom hook to handle form
   */
  const [values, onChange] = useForm({
    name: profileInfo.name,
    whatsAppNumber: profileInfo.whatsapp_number ? profileInfo.whatsapp_number : '',
    email: profileInfo.email,
    address_line_1: profileInfo.address.line_one,
    address_line_2: profileInfo.address.line_two,
    district: profileInfo.address.district,
    state: profileInfo.address.state,
    experience: profileInfo.experience ? profileInfo.experience : '',
    languages_known: profileInfo.languages_known ? profileInfo.languages_known : '',
    computer_knowledge: profileInfo.computer_knowledge ? profileInfo.computer_knowledge : '',
  });
  return (
    <div className="edit-profile">
      <h3>Edit Profile</h3>
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
                placeholder="Enter your Experience"
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
                placeholder="Languages You Know"
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
                placeholder="Your Computer Knowledge "
                value={values.computer_knowledge}
                name="computer_knowledge"
                onChange={onChange}
                errorMsg={ErrorMessage.computer_knowledge}
                onBlur={validateData}
                mt={4}
              />
            </div>
          </div>
          <div className="column">
            <div className="container">
              <div className="heading-container">
                <FcHome className="icon" />
                <h4>Contact Details</h4>
              </div>
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
              <TextInput
                idName="district"
                isRequired={true}
                isInvalid={ErrorMessage.district !== ''}
                errorMsg={ErrorMessage.district}
                mt={4}
                name="district"
                value={values.district}
                onChange={onChange}
                LabelName="District"
                onBlur={validateData}
              />
              <TextInput
                idName="state"
                isRequired={true}
                isInvalid={ErrorMessage.state !== ''}
                LabelName="State"
                placeholder="In which state your company located"
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
                defaultValue={profileInfo.address.zip}
                value={values.zip}
                placeholder="Enter postal pin code"
                name="zip"
                onChange={(value) => setZip(value)}
                errorMsg={ErrorMessage.zip}
                onBlur={validateData}
                mt={4}
              />
            </div>
          </div>
        </div>
        <Button onClick={handleForm} isLoading={buttonLoading}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
