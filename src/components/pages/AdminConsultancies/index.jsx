import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import useForm from '../../../hooks/useForm';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { showErrorToast } from '../../../helpers/errorToast.js';
import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import CheckBoxInput from '../../utilities/CheckBoxInput';
import Button from '../../utilities/Button';
import { FcOk, FcCancel } from 'react-icons/fc';
import api from '../../../helpers/axios';
import './style.css';

const AdminConsultancies = () => {
  const toast = useToast();

  const [values, onChange] = useForm({
    phoneNumber: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    phoneNumber: '',
  });

  const [buttonLoading, setButtonLoading] = useState(false);

  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

  const [jobCategories, setJobCategories] = useState([]);

  const [consultancy, setConsultancy] = useState(null);

  const [selectedJobCategories, setSelectedJobCategories] = useState([]);

  const [isConsultancy, setIsConsultancy] = useState(false);

  const validateData = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

  const handleCheckboxChange = (event) => {
    let newArray = [...selectedJobCategories, event.target.name];

    if (selectedJobCategories.includes(event.target.name)) {
      newArray = newArray.filter((item) => item !== event.target.name);
    }

    setSelectedJobCategories(newArray);
  };

  const onButtonClick = () => {
    showErrorMsg('phoneNumber', values.phoneNumber, setErrorMsg);
    if (values.phoneNumber !== '') {
      setButtonLoading(true);
      api
        .post(`admin/employer-details`, {
          phoneNumber: values.phoneNumber,
        })
        .then((res) => {
          setButtonLoading(false);
          if (res.data) {
            setConsultancy(res.data);
            setSelectedJobCategories(res.data?.consultancy_options?.allowed_job_categories);
            setIsConsultancy(res.data?.consultancy_options?.is_consultancy);
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

  useEffect(() => {
    api
      .get('/job-category')
      .then((res) => {
        let jobCategoryArray = [];
        for (let i = 0; i < res.data.job_categories.length; i++) {
          jobCategoryArray.push(res.data.job_categories[i].name);
        }

        setJobCategories([...jobCategoryArray]);
      })
      /* eslint-disable */
      .catch((err) => {
        toast({
          title: 'Failed to Process order',
          description: err.response.data.error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  }, []);

  const submitForm = () => {
    if (!consultancy._id) {
      toast({
        title: 'Submit Error',
        description: 'Employer Not Found',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    if (!selectedJobCategories.length) {
      toast({
        title: 'Submit Error',
        description: 'Atleast 1 Job category is required',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    setSubmitButtonLoading(true);
    api
      .post('admin/convert-to-consultancy', {
        id: consultancy._id,
        jobCategories: selectedJobCategories,
        isConsultancy: isConsultancy,
      })
      .then((res) => {
        setSubmitButtonLoading(false);
        toast({
          title: 'Success',
          description: res.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onButtonClick();
      })
      .catch((err) => {
        setSubmitButtonLoading(false);
        toast({
          title: 'Failed to Convert',
          description: err.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <div className="page">
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
        {consultancy && (
          <div>
            <div className="details">
              <div className="row">
                <div className="column">
                  <div className="container">
                    <div className="sub-container">
                      <div className="label">Name</div>
                      <div>{consultancy.name}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">Mobile Number</div>
                      <div>{consultancy.mobile_number}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">Whatsapp Number</div>
                      <div>{consultancy.whatsapp_number}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">City</div>
                      <div>{consultancy.company_address.city}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">PIN</div>
                      <div>{consultancy.company_address.zip}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">Type</div>
                      <div>
                        {consultancy.consultancy_options.is_consultancy
                          ? 'Consultancy'
                          : 'Employer'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="container">
                    <div className="sub-container">
                      <div className="label">Company Name</div>
                      <div>{consultancy.company_address.name}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">Email</div>
                      <div>{consultancy.email}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">Designation</div>
                      <div>{consultancy.designation}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">State</div>
                      <div>{consultancy.company_address.state}</div>
                    </div>
                    <div className="sub-container">
                      <div className="label">Status</div>
                      <div>
                        {consultancy.verified ? (
                          <span>
                            <FcOk className="icon" /> Verified
                          </span>
                        ) : (
                          <span>
                            <FcCancel className="icon" /> Not Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="consultancy">
              <h5>Consultancy Setting's</h5>
              <CheckBoxInput
                idName="isConsultancy"
                name="isConsultancy"
                isChecked={isConsultancy}
                onChange={() => setIsConsultancy(!isConsultancy)}
                text="Check this box to enable Consultancy Feature for this Employer"
              />
              <h5>Check the categories for the consultancy to Post Jobs</h5>
              <div className="job-categories">
                {jobCategories.map((item) => {
                  return (
                    <div className="job-category-checkbox" key={item}>
                      <CheckBoxInput
                        idName={item}
                        text={item}
                        name={item}
                        onChange={handleCheckboxChange}
                        isChecked={selectedJobCategories.includes(item)}
                      />
                    </div>
                  );
                })}
              </div>
              <Button isLoading={submitButtonLoading} onClick={submitForm}>
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminConsultancies;
