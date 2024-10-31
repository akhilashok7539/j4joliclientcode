import React, { useState } from 'react';
import useForm from '../../../hooks/useForm';
import Button from '../../utilities/Button';
import './style.css';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import { showErrorToast } from '../../../helpers/errorToast';
import { useToast } from '@chakra-ui/react';
import api from '../../../helpers/axios';
import {
  FcBusinessman,
  FcGraduationCap,
  FcHome,
  FcInfo,
  FcAdvertising,
  FcSettings,
} from 'react-icons/fc';
import UpdateValidity from '../../utilities/UpdateValidity';
import DeleteJobseeker from '../../utilities/DeleteJobseeker';

const JobseekerSearch = () => {
  // toast
  const toast = useToast();

  // state for fetchedData
  const [userInfo, setUserInfo] = useState(null);

  // states used by useForm hook
  const [values, onChange, setValues] = useForm({
    phoneNumber: '',
  });

  // To set loading button active
  const [buttonLoading, setButtonLoading] = useState(false);

  // state to set error message
  const [errorMsg, setErrorMsg] = useState({
    phoneNumber: '',
  });

  // function to set error msg state
  const validateData = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

  // function to post job after checking api call
  const onButtonClick = () => {
    showErrorMsg('phoneNumber', values.phoneNumber, setErrorMsg);
    if (values.phoneNumber !== '') {
      setButtonLoading(true);
      api
        .get(`admin/job-seekers-details/${values.phoneNumber}`)
        .then((res) => {
          setButtonLoading(false);
          if (res.data) {
            setUserInfo(res.data);
          } else {
            toast({
              title: 'Not Found',
              description: 'The particular User could not be Found',
              status: 'error',
              duration: 2500,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err);
        });
    }
  };

  return (
    <div className="search">
      <div className="filters">
        <div className="search-component">
          <PhoneNumberInput
            idName="phoneNumber"
            isRequired={true}
            isInvalid={errorMsg.phoneNumber !== ''}
            LabelName="Phone Number"
            placeholder="Enter  phone number"
            value={values.phoneNumber}
            name="phoneNumber"
            onChange={onChange}
            errorMsg={errorMsg.phoneNumber}
            onBlur={validateData}
            mt={4}
          />
        </div>

        <div className="search-component">
          <Button onClick={onButtonClick} isLoading={buttonLoading} mt="2.4rem">
            Search
          </Button>
        </div>
      </div>

      {!userInfo ? null : (
        <div className="jobseeker-details">
          <div className="row">
            <div className="column">
              <div className="container">
                <div className="heading-container">
                  <FcBusinessman className="icon" />
                  <h4>Personal Details</h4>
                </div>
                <div className="sub-container">
                  <div className="label">Name</div>
                  <div>{userInfo.name}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Gender</div>
                  <div>
                    {userInfo.gender === 'male'
                      ? 'Male'
                      : userInfo.gender === 'female'
                      ? 'Female'
                      : 'Others'}
                  </div>
                </div>
                <div className="sub-container">
                  <div className="label">Date of Birth</div>
                  <div>{new Date(userInfo.date_of_birth).toLocaleDateString('en-GB')}</div>
                </div>
              </div>
              <div className="container">
                <div className="heading-container">
                  <FcInfo className="icon" />
                  <h4>Account Details</h4>
                </div>
                <div className="sub-container">
                  <div className="label">Verified Account</div>
                  <div>{userInfo.verified ? 'Yes' : 'No'}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Job Category</div>
                  <div>{userInfo.job_category}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Created At</div>
                  <div>{new Date(userInfo.created_at).toLocaleDateString('en-GB')}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Valid Till</div>
                  <div>{new Date(userInfo.valid_till).toLocaleDateString('en-GB')}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Last Paid On</div>
                  <div>{new Date(userInfo.last_paid_on).toLocaleString('en-GB')}</div>
                </div>
              </div>
              <div className="container">
                <div className="heading-container">
                  <FcGraduationCap className="icon" />
                  <h4>Qualification Details</h4>
                </div>
                <div className="sub-container">
                  <div className="label">Educational Qualification</div>
                  <div>{userInfo.education_details}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Experience</div>
                  <div>{userInfo.experience ? userInfo.experience : 'Nil'}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Languages Known</div>
                  <div>{userInfo.languages_known ? userInfo.languages_known : 'Nil'}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Computer Knowledge</div>
                  <div>{userInfo.computer_knowledge ? userInfo.computer_knowledge : 'Nil'}</div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="container">
                <div className="heading-container">
                  <FcHome className="icon" />
                  <h4>Contact Details</h4>
                </div>
                <div className="sub-container">
                  <div className="label">WhatsApp Number</div>
                  <div>{userInfo.whatsapp_number ? userInfo.whatsapp_number : 'Nil'}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Email</div>
                  <div>{userInfo.email ? userInfo.email : 'Nil'}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Address Line 1</div>
                  <div>{userInfo.address.line_one}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Address Line 2</div>
                  <div>{userInfo.address.line_two}</div>
                </div>
                <div className="sub-container">
                  <div className="label">District</div>
                  <div>{userInfo.address.district}</div>
                </div>
                <div className="sub-container">
                  <div className="label">State</div>
                  <div>{userInfo.address.state}</div>
                </div>
                <div className="sub-container">
                  <div className="label">PIN Code</div>
                  <div>{userInfo.address.zip}</div>
                </div>
              </div>
              <div className="container">
                <div className="heading-container">
                  <FcAdvertising className="icon" />
                  <h4>Reference Details</h4>
                </div>
                <div className="sub-container">
                  <div className="label">Referred By</div>
                  <div>{userInfo.referred_by}</div>
                </div>
              </div>
              <div className="container">
                <div className="heading-container">
                  <FcSettings className="icon" />
                  <h4>Account Actions</h4>
                </div>
                <div className="row">
                  <div className="column">
                    <UpdateValidity
                      mobile={userInfo.mobile_number}
                      callbackOnValidityUpdate={onButtonClick}
                    />
                  </div>
                  <div className="column">
                    <DeleteJobseeker
                      id={userInfo._id}
                      callbackOnDelete={() => {
                        setUserInfo(null);
                        setValues({ phoneNumber: '' });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobseekerSearch;
