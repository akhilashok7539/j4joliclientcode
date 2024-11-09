import React, { useState, useEffect } from 'react';

import './style.css';
import useForm from '../../../hooks/useForm';
import TextAreaInput from '../../utilities/TextAreaInput';
import TextInput from '../../utilities/TextInput';
import EmailInput from '../../utilities/EmailInput';
import NumInput from '../../utilities/NumInput';
import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import CheckBoxInput from '../../utilities/CheckBoxInput';
import SelectInput from '../../utilities/SelectInput';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { FormControl, FormLabel, FormErrorMessage, Stack, useToast } from '@chakra-ui/react';
import Button from '../../utilities/Button';
import api from '../../../helpers/axios';
import { useHistory } from 'react-router-dom';
import { showErrorToast } from '../../../helpers/errorToast';
import { IoLocationSharp } from 'react-icons/io5';
import { FcInspection, FcAssistant, FcDocument } from 'react-icons/fc';

import { useRhinoState } from '../../context';
import { getDistricts } from '../../../districts';
import Autocomplete from 'react-google-autocomplete';

const EmployerAddJob = () => {
  // states used by useForm hook
  const [values, onChange, setValues] = useForm({
    title: '',
    district: '',
    location: '',
    description: '',
    job_category: '',
    working_time: '',
    experience_required: '',
    name: '',
    salary: '',
    phoneNumber: '',
    email: '',
    designation: '',
    whatsAppNumber: '',
    jobSubCategory: ''
  });

  //custom state for gender
  const [gender, setGender] = useState({ male: true, female: true, others: true });
  const [errorJobCategroy, setErrorJobCategroy] = useState(false);

  //custom state for contactMedium
  const [contactMedium, setContactMedium] = useState({
    byCall: false,
    byEmail: false,
    byWhatsapp: false,
  });

  // custom state for vacancies
  const [vacancies, setVacancies] = useState('');

  //state to set loading button
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setcategories] = useState([]);
  const [districtsFull, setdistrictsFull] = useState([]);
  const [dataListDistrict, setDataListDistrict] = useState([]);
  // state to set error message
  const [errorMsg, setErrorMsg] = useState({
    title: '',
    salary: '',
    district: '',
    location: '',
    description: '',
    job_category: '',
    working_time: '',
    preferred_gender: '',
    experience_required: '',
    number_of_vacancies: '',
    name: '',
    phoneNumber: '',
    email: '',
    designation: '',
    whatsAppNumber: '',
    preferredContactMedium: '',
    jobSubCategory: '',
  });

  // state for job category
  const [jobCategories, setJobCategories] = useState([]);

  // district list for select input
  const districtList = getDistricts()

  const [user] = useRhinoState('user');

  // history to set router url
  const history = useHistory();
  const [coordinates, setCoordinates] = useState({ lng: '', lat: '' });

  const [place, setPlace] = useState(null);

  // toast
  const toast = useToast();
  /* eslint-disable */
  // api call to get job categories
  useEffect(() => {
    let isMounted = true;
    getJobCategoriesAndSubCategories();
    getDistrictsList();
    const updateJobCategoryArray = async () => {
      try {
        const result = await api.get('/job-category');

        let jobCategoryArray = [];

        for (let i = 0; i < result.data.job_categories.length; i++) {
          jobCategoryArray.push(result.data.job_categories[i].name);
        }

        if (isMounted) setJobCategories([...jobCategoryArray]);
      } catch (err) {
        if (isMounted) showErrorToast(toast, err);
      }
    };
    updateJobCategoryArray();

    return () => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable */
  const getJobCategoriesAndSubCategories = () => {
    api.get('/job-category?include_hidden=false&sub_category=true').then((res) => {
      setcategories(res.data.job_categories)
    }).catch((err) => {
      showErrorToast(toast, err);
    });
  }
  const getDistrictsList = () => {
    api.get('/district').then((res) => {
      setdistrictsFull(res.data)
      const list = []
      res.data.forEach((item) => {
        list.push(item.name)
      })
      // console.log(list)
      setDataListDistrict(list)

    }).catch((err) => {
      showErrorToast(toast, err);
    });
  }
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const category = categories.find(cat => cat.id === categoryId);
    setErrorJobCategroy(false)
    setSelectedCategory(categoryId);
    setSubCategories(category ? category.subCategories : []);

    setValues((prevValues) => ({
      ...prevValues,
      job_category: categoryId,
      jobSubCategory: '' // Reset jobSubCategory when category changes
    }));

  };
  const checkjobCategoryError = () =>{
    if(values.job_category === '')
    {
      setErrorJobCategroy(true) 
    }
    else{
      setErrorJobCategroy(false) 
    }
  }
  const handleSubCategoryChange = (event) => {
    const selectedSubCategory = event.target.value;

    // Update jobSubCategory in the form state
    setValues((prevValues) => ({
      ...prevValues,
      jobSubCategory: selectedSubCategory
    }));
  };

  const handlePlaceSelected = (place) => {
    // setError(false);
    const name = place.name || place.formatted_address;
    const firstPart = name ? name.split(',')[0] : '';
    setPlace(firstPart);

    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setCoordinates({ lng, lat });
      // console.log("coordinates",coordinates)
    }
  };
  // function to set error msg state
  const validateData = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

  // function to post job after checking api call
  const onButtonClick = () => {
    showErrorMsg('title', values.title, setErrorMsg);
    showErrorMsg('salary', values.salary, setErrorMsg);
    showErrorMsg('district', values.district, setErrorMsg);
    showErrorMsg('location', values.location, setErrorMsg);
    showErrorMsg('description', values.description, setErrorMsg);
    showErrorMsg('job_category', values.job_category, setErrorMsg);
    showErrorMsg('working_time', values.working_time, setErrorMsg);
    showErrorMsg('experience_required', values.experience_required, setErrorMsg);
    checkGenderError();
    showErrorMsg('number_of_vacancies', vacancies, setErrorMsg);
    showErrorMsg('name', values.name, setErrorMsg);
    showErrorMsg('phoneNumber', values.phoneNumber, setErrorMsg);
    showErrorMsg('email', values.email, setErrorMsg);
    showErrorMsg('designation', values.designation, setErrorMsg);
    showErrorMsg('whatsAppNumber', values.whatsAppNumber, setErrorMsg);
    checkContactMediumError();
    checkjobCategoryError();

    if (
      values.title !== '' &&
      values.salary !== '' &&
      values.district !== '' &&
      // values.location !== '' &&
      values.description !== '' &&
      values.job_category !== '' &&
      values.working_time !== '' &&
      values.experience_required !== '' &&
      vacancies !== '' &&
      values.name !== '' &&
      values.phoneNumber !== '' &&
      values.designation !== '' &&
      errorMsg.title === '' &&
      errorMsg.salary === '' &&
      errorMsg.district === '' &&
      // errorMsg.location === '' &&
      errorMsg.description === '' &&
      errorMsg.working_time === '' &&
      errorMsg.preferred_gender === '' &&
      errorMsg.experience_required === '' &&
      errorMsg.number_of_vacancies === '' &&
      errorMsg.name === '' &&
      errorMsg.phoneNumber === '' &&
      errorMsg.email === '' &&
      errorMsg.designation === '' &&
      errorMsg.whatsAppNumber === '' &&
      errorMsg.preferredContactMedium === ''
    ) {
      values.location = {
        "type": "Point",
        "coordinates": [coordinates.lng, coordinates.lat],
        "name": place
      }
      const job = {
        title: values.title,
        salary: values.salary,
        district: values.district,
        location: values.location,
        description: values.description,
        job_category: values.job_category,
        jobSubCategory: values.jobSubCategory,
        working_time: values.working_time,
        preferred_gender: gender,
        experience_required: values.experience_required,
        number_of_vacancies: parseInt(vacancies),
        contact_person: {
          name: values.name,
          designation: values.designation,
          mobile_number: values.phoneNumber,
          whatsapp_number: values.whatsAppNumber,
          email_id: values.email,
        },
        preferred_contact_medium: contactMedium,
        flags: {
          fromConsultancy: user?.isConsultancy ? true : false,
        },
        company_address: {
          name: "",
          city: "",
          state: "",
          zip: "",
        },
        jobSource: "",
        notes: ""
      };
      console.log(job)
      setButtonLoading(true);
      api
        .post('/employer/job', job)
        .then((res) => {
          setButtonLoading(false);
          toast({
            title: 'Successfully Added',
            description: ' Your new job has been successfully added for review',
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

  // onchange function for gender input
  const formOnChange = (e) => {
    setGender((prevGender) => ({
      ...prevGender,
      [e.target.name]: e.target.checked,
    }));
  };

  // onchange function for contact medium input
  const contactMediumOnChange = (e) => {
    setContactMedium((prevContactMedium) => ({
      ...prevContactMedium,
      [e.target.name]: e.target.checked,
    }));
  };

  // function to set gender error state
  const checkGenderError = () => {
    if (gender.male === false && gender.female === false && gender.others === false) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        preferred_gender: 'At least one gender must be chosen',
      }));
    } else {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        preferred_gender: '',
      }));
    }
  };

  // function to set contact medium error state
  const checkContactMediumError = () => {
    if (
      contactMedium.byCall === false &&
      contactMedium.byEmail === false &&
      contactMedium.byWhatsapp === false
    ) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        preferredContactMedium: 'At least one Contact Medium must be chosen',
      }));
    } else {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        preferredContactMedium: '',
      }));
    }
  };

  return (
    <div className="add-job">
      <div className="form">
        <div className="row">
          <div className="column">
            <div className="container">
              <div className="heading-container">
                <FcDocument className="icon" />

                <h4>Job Description</h4>
              </div>
              <TextInput
                idName="title"
                isRequired={true}
                isInvalid={errorMsg.title !== ''}
                LabelName="Job Title"
                placeholder="Enter Job Title"
                value={values.title}
                mt={4}
                name="title"
                onChange={onChange}
                onBlur={validateData}
                errorMsg={errorMsg.title}
              />

              {/* <SelectInput
                isRequired={true}
                isInvalid={errorMsg.job_category !== ''}
                errorMsg={errorMsg.job_category}
                dataList={jobCategories}
                mt={4}
                name="job_category"
                value={values.job_category}
                onChange={onChange}
                LabelName="Job Category"
                onBlur={validateData}
              /> */}
              <div className='containerDiv'>
                <label className='labelValidation'>Job Category <span className='isRequired'>*</span></label>
                {categories.length > 0 ? (
                  <select
                    className='selectBoxContainer'
                    style={{
                      border: `2px solid ${errorJobCategroy ? 'red' : '#0000001f'}`,
                    }}
                    id="job-category" onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select id="job-category" >
                    <option value="">No data</option>
                  </select>
                )}
              </div>

              <div className='containerDiv'>

                <label className='labelValidation'>Job Sub Category</label>
                <select
                  className='selectBoxContainer'
                  id="job-subcategory" onChange={handleSubCategoryChange} disabled={!selectedCategory}>
                  <option value="">Select a subcategory</option>
                  {subCategories.map(subCategory => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <TextAreaInput
                idName="description"
                isRequired={true}
                LabelName="Description"
                isInvalid={errorMsg.description !== ''}
                errorMsg={errorMsg.description}
                placeholder="Job description with Qualification requirements"
                mt={4}
                value={values.description}
                name="description"
                onChange={onChange}
                onBlur={validateData}
              />
            </div>

            <div className="container">
              <div className="heading-container">
                <FcAssistant className="icon" />
                <h4>Contact Details</h4>
              </div>
              <TextInput
                idName="name"
                isRequired={true}
                isInvalid={errorMsg.name !== ''}
                LabelName="Name"
                placeholder="Enter your name"
                value={values.name}
                name="name"
                onChange={onChange}
                onBlur={validateData}
                errorMsg={errorMsg.name}
                mt={4}
              />
              <TextInput
                idName="designation"
                isRequired={true}
                isInvalid={errorMsg.designation !== ''}
                LabelName=" Your Designation"
                placeholder="Enter your designation"
                value={values.designation}
                name="designation"
                onChange={onChange}
                errorMsg={errorMsg.designation}
                onBlur={validateData}
                mt={4}
              />
              <PhoneNumberInput
                idName="phoneNumber"
                isRequired={true}
                isInvalid={errorMsg.phoneNumber !== ''}
                LabelName="Phone Number"
                placeholder="Enter your phone number"
                value={values.phoneNumber}
                name="phoneNumber"
                onChange={onChange}
                errorMsg={errorMsg.phoneNumber}
                onBlur={validateData}
                mt={4}
              />
              <PhoneNumberInput
                idName="whatsAppNumber"
                isRequired={false}
                isInvalid={errorMsg.whatsAppNumber !== ''}
                LabelName="WhatsApp Number"
                placeholder="Enter your whatsapp number"
                value={values.whatsAppNumber}
                name="whatsAppNumber"
                onChange={onChange}
                errorMsg={errorMsg.whatsAppNumber}
                onBlur={validateData}
                mt={4}
              />
              <EmailInput
                idName="email"
                isRequired={false}
                isInvalid={errorMsg.email !== ''}
                LabelName="Email"
                placeholder="Enter your email"
                value={values.email}
                name="email"
                onChange={onChange}
                errorMsg={errorMsg.email}
                onBlur={validateData}
                mt={4}
              />
              <FormControl
                isInvalid={errorMsg.preferredContactMedium !== ''}
                onBlur={checkContactMediumError}
                isRequired="true"
              >
                <FormLabel fontSize=".8rem" mt={4}>
                  Preferred Contact Medium
                </FormLabel>
                <Stack spacing={10} direction="row">
                  <CheckBoxInput
                    isName="byCall"
                    isInvalid={errorMsg.preferredContactMedium !== ''}
                    isChecked={contactMedium.byCall}
                    name="byCall"
                    onChange={contactMediumOnChange}
                    text="By Call"
                  />
                  <CheckBoxInput
                    isName="byEmail"
                    isInvalid={errorMsg.preferredContactMedium !== ''}
                    isChecked={contactMedium.byEmail}
                    name="byEmail"
                    onChange={contactMediumOnChange}
                    text="By Email"
                  />
                  <CheckBoxInput
                    isName="byWhatsapp"
                    isInvalid={errorMsg.preferredContactMedium !== ''}
                    isChecked={contactMedium.byWhatsapp}
                    name="byWhatsapp"
                    onChange={contactMediumOnChange}
                    text="By Whatsapp"
                  />
                </Stack>
                <FormErrorMessage>{errorMsg.preferredContactMedium}</FormErrorMessage>
              </FormControl>
            </div>
          </div>
          <div className="column">
            <div className="container">
              <div className="heading-container">
                <FcInspection className="icon" />

                <h4>Job Requirements</h4>
              </div>
              <TextInput
                idName="salary"
                isRequired={true}
                isInvalid={errorMsg.salary !== ''}
                LabelName="Salary"
                value={values.salary}
                placeholder="Enter Salary"
                name="salary"
                onChange={onChange}
                errorMsg={errorMsg.salary}
                onBlur={validateData}
                mt={4}
              />

              <FormControl
                isInvalid={errorMsg.preferred_gender !== ''}
                onBlur={checkGenderError}
                isRequired="true"
              >
                <FormLabel fontSize=".8rem" mt={4}>
                  Preferred Gender
                </FormLabel>
                <Stack spacing={10} direction="row">
                  <CheckBoxInput
                    isName="male"
                    isInvalid={errorMsg.preferred_gender !== ''}
                    isChecked={gender.male}
                    name="male"
                    onChange={formOnChange}
                    text="Male"
                  />
                  <CheckBoxInput
                    isName="female"
                    isInvalid={errorMsg.preferred_gender !== ''}
                    isChecked={gender.female}
                    name="female"
                    onChange={formOnChange}
                    text="Female"
                  />
                  <CheckBoxInput
                    isName="others"
                    isInvalid={errorMsg.preferred_gender !== ''}
                    isChecked={gender.others}
                    name="others"
                    onChange={formOnChange}
                    text="Others"
                  />
                </Stack>
                <FormErrorMessage>{errorMsg.preferred_gender}</FormErrorMessage>
              </FormControl>
              <TextInput
                idName="working_time"
                isRequired={true}
                isInvalid={errorMsg.working_time !== ''}
                LabelName="Working time"
                placeholder="Describe about the working time"
                value={values.working_time}
                name="working_time"
                onChange={onChange}
                onBlur={validateData}
                errorMsg={errorMsg.working_time}
                mt={4}
              />
              <TextInput
                idName="experience_required"
                isRequired={true}
                isInvalid={errorMsg.experience_required !== ''}
                LabelName="Experience required"
                value={values.experience_required}
                placeholder="Enter the minimum Experience required"
                name="experience_required"
                onChange={onChange}
                onBlur={validateData}
                errorMsg={errorMsg.experience_required}
                mt={4}
              />
              <NumInput
                idName="number_of_vacancies"
                isRequired={true}
                isInvalid={errorMsg.number_of_vacancies !== ''}
                LabelName="Number of vacancies"
                min="1"
                max="100"
                value={vacancies}
                placeholder="Enter the number of vacancies"
                name="number_of_vacancies"
                onChange={(value) => setVacancies(value)}
                errorMsg={errorMsg.number_of_vacancies}
                onBlur={validateData}
                mt={4}
              />
            </div>
            <div className="container">
              <div className="heading-container">
                <IoLocationSharp className="icon" color="#1565C0" />
                <h4>Location Details</h4>
              </div>
              <SelectInput
                isRequired={true}
                isInvalid={errorMsg.district !== ''}
                errorMsg={errorMsg.district}
                dataList={dataListDistrict.length > 0 ? dataListDistrict : []}
                mt={4}
                name="district"
                value={values.district}
                onChange={onChange}
                LabelName="District"
                onBlur={validateData}
              />

              <Autocomplete
                className='autoCompleteDropDownBox'
                onPlaceSelected={handlePlaceSelected}
                placeholder='Search your location'
                options={{
                  types: ['geocode'],
                  componentRestrictions: { country: 'IN' }
                }}
              />
            </div>
          </div>
        </div>
        <Button onClick={onButtonClick} isLoading={buttonLoading}>
          Add Job
        </Button>
      </div>
    </div>
  );
};

export default EmployerAddJob;
