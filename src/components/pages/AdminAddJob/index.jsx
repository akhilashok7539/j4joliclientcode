import React, { useState, useEffect, useRef } from 'react';

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
import {
  FcDocument,
  FcInspection,
  FcAssistant,
  FcOrganization,
  FcCustomerSupport,
} from 'react-icons/fc';
import {
  IoLocationSharp,
} from 'react-icons/io5';
import { getDistricts } from '../../../districts';
import Autocomplete from 'react-google-autocomplete';

const AdminAddJob = () => {
  // states used by useForm hook
  const [values, onChange, setValues] = useForm({
    title: '',
    salary: '',
    district: '',
    location: '',
    description: '',
    job_category: '',
    jobSubCategory: '',
    working_time: '',
    experience_required: '',
    companyName: '',
    city: '',
    state: '',
    name: '',
    phoneNumber: '',
    email: '',
    designation: '',
    whatsAppNumber: '',
    telecallerName: '',
    jobSource: '',
    notes: '',
  });
  //state to update pin code

  const [zip, setZip] = useState('');

  //custom state for gender
  const [gender, setGender] = useState({ male: true, female: true, others: true });

  //custom state for contactMedium
  const [contactMedium, setContactMedium] = useState({
    byCall: false,
    byEmail: false,
    byWhatsapp: false,
  });

  const [placement, setPlacement] = useState(false);

  // custom state for vacancies
  const [vacancies, setVacancies] = useState('');

  // To set loading button active
  const [buttonLoading, setButtonLoading] = useState(false);
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
    jobSubCategory: '',
    working_time: '',
    preferred_gender: '',
    experience_required: '',
    number_of_vacancies: '',
    companyName: '',
    city: '',
    state: '',
    zip: '',
    name: '',
    phoneNumber: '',
    email: '',
    designation: '',
    whatsAppNumber: '',
    telecallerName: '',
    jobSource: '',
    preferredContactMedium: '',
    placement: '',
    notes: '',
  });

  // state for job category
  const [jobCategories, setJobCategories] = useState([]);

  // district list for select input
  const districtList = getDistricts()

  const [dataPersist, setDataPersist] = useState(false);

  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [place, setPlace] = useState(null);
  const autocompleteRef = useRef(null);
  const [error, setError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setcategories] = useState([]);
  // telecallers
  const [callers, setTelecaller] = useState('')

  // history to set router url
  const history = useHistory();

  // toast
  const toast = useToast();
  /* eslint-disable */
  // api call to get job categories
  useEffect(() => {
    let isMounted = true;
    getJobCategoriesAndSubCategories();
    getDistrictsList();
    getTeleCallers();
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

  // function to set error msg state
  const validateData = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMsg);
  };

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


  const getTeleCallers = () => {
    api.get('/telecaller').then((res) => {
      const TelecallersList = res.data.map(x => x.name)
      setTelecaller(TelecallersList)
    }).catch((err) => {
      showErrorToast(toast, err);
    });
  }
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const category = categories.find(cat => cat.id === categoryId);

    setSelectedCategory(categoryId);
    setSubCategories(category ? category.subCategories : []);

    setValues((prevValues) => ({
      ...prevValues,
      job_category: categoryId,
      jobSubCategory: '' // Reset jobSubCategory when category changes
    }));

  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategory = event.target.value;

    // Update jobSubCategory in the form state
    setValues((prevValues) => ({
      ...prevValues,
      jobSubCategory: selectedSubCategory
    }));
  };

  const handlePlaceSelected = (place) => {
    setError(false);
    const name = place.name || place.formatted_address;
    const firstPart = name ? name.split(',')[0] : '';
    setPlace(firstPart);

    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setCoordinates({ lat, lng });
      // console.log("coordinates",coordinates)
    }
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
    showErrorMsg('companyName', values.companyName, setErrorMsg);
    showErrorMsg('city', values.city, setErrorMsg);
    showErrorMsg('state', values.state, setErrorMsg);
    showErrorMsg('zip', zip, setErrorMsg);
    checkGenderError();
    showErrorMsg('number_of_vacancies', vacancies, setErrorMsg);
    showErrorMsg('name', values.name, setErrorMsg);
    showErrorMsg('phoneNumber', values.phoneNumber, setErrorMsg);
    showErrorMsg('email', values.email, setErrorMsg);
    showErrorMsg('designation', values.designation, setErrorMsg);
    showErrorMsg('whatsAppNumber', values.whatsAppNumber, setErrorMsg);
    showErrorMsg('telecallerName', values.telecallerName, setErrorMsg);
    showErrorMsg('jobSource', values.jobSource, setErrorMsg);
    checkContactMediumError();
    if (
      values.title !== '' &&
      values.salary !== '' &&
      values.district !== '' &&
      // values.location !== '' &&
      values.description !== '' &&
      values.job_category !== '' &&
      values.working_time !== '' &&
      values.companyName !== '' &&
      values.experience_required !== '' &&
      values.city !== '' &&
      values.state !== '' &&
      zip !== '' &&
      vacancies !== '' &&
      values.name !== '' &&
      values.phoneNumber !== '' &&
      values.designation !== '' &&
      values.telecallerName !== '' &&
      values.jobSource !== '' &&
      errorMsg.title === '' &&
      errorMsg.salary === '' &&
      errorMsg.district === '' &&
      // errorMsg.location === '' &&
      errorMsg.description === '' &&
      errorMsg.job_category === '' &&
      errorMsg.working_time === '' &&
      errorMsg.preferred_gender === '' &&
      errorMsg.experience_required === '' &&
      errorMsg.number_of_vacancies === '' &&
      errorMsg.companyName === '' &&
      errorMsg.city === '' &&
      errorMsg.state === '' &&
      errorMsg.zip === '' &&
      errorMsg.name === '' &&
      errorMsg.phoneNumber === '' &&
      errorMsg.email === '' &&
      errorMsg.designation === '' &&
      errorMsg.whatsAppNumber === '' &&
      errorMsg.telecallerName === '' &&
      errorMsg.jobSource === '' &&
      errorMsg.preferredContactMedium === ''
    ) {

      values.location = {
        "type": "Point",
        "coordinates": [coordinates.lat, coordinates.lng],
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
        company_address: {
          name: values.companyName,
          city: values.city,
          state: values.state,
          zip: zip,
        },
        number_of_vacancies: parseInt(vacancies),
        contact_person: {
          name: values.name,
          designation: values.designation,
          mobile_number: values.phoneNumber,
          whatsapp_number: values.whatsAppNumber,
          email_id: values.email,
        },
        telecallerName: values.telecallerName,
        jobSource: values.jobSource,
        preferred_contact_medium: contactMedium,
        flags: {
          placement: placement,
        },
        notes: values.notes,
      };

      if (values.whatsAppNumber === '') delete job.contact_person['whatsapp_number'];
      setButtonLoading(true);
      api
        .post('/admin/job', job)
        .then((res) => {
          setButtonLoading(false);
          toast({
            title: 'Successfully Added',
            description: ' Your new job has been successfully added. Job No.: ' + res.data.job_no,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          if (!dataPersist) {
            history.push('/admin/dashboard');
          }
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

  const formOnPlacementChange = (e) => {
    setPlacement(e.target.checked);
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

  const handleDataPersistCheckboxChange = (e) => {
    setDataPersist(e.target.checked);
  };

  const resetForm = () => {
    setValues({
      title: '',
      salary: '',
      district: '',
      location: '',
      description: '',
      job_category: '',
      jobSubCategory: '',
      working_time: '',
      experience_required: '',
      companyName: '',
      city: '',
      state: '',
      name: '',
      phoneNumber: '',
      email: '',
      designation: '',
      whatsAppNumber: '',
      telecallerName: '',
      jobSource: '',
      notes: '',
    });
    setZip('');
    setGender({ male: true, female: true, others: true });
    setContactMedium({ byCall: false, byEmail: false, byWhatsapp: false });
    setVacancies('');
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
                <label style={{ fontSize: '0.8rem' }}>Job Category</label>
                {categories.length > 0 ? (

                  <select

                    style={{
                      width: '100%',
                      border: '1px solid #0000001f',
                      padding: '10px',
                      borderRadius: '4px'
                    }}
                    id="job-category" onChange={handleCategoryChange}>
                    <option value="">--Select a category--</option>
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

                <label style={{ fontSize: '0.8rem' }}>Job Sub Category</label>
                <select style={{
                  width: '100%',
                  border: '1px solid #0000001f',
                  padding: '10px',

                  borderRadius: '4px'
                }} id="job-subcategory" onChange={handleSubCategoryChange} disabled={!selectedCategory}>
                  <option value="">--Select a subcategory--</option>
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
                dataList={dataListDistrict}
                mt={4}
                name="district"
                value={values.district}
                onChange={onChange}
                LabelName="District"
                onBlur={validateData}
              />
              {/* <TextInput
                idName="location"
                isRequired={true}
                isInvalid={errorMsg.location !== ''}
                LabelName="Location"
                placeholder="Enter  location"
                value={values.location}
                name="location"
                onChange={onChange}
                onBlur={validateData}
                errorMsg={errorMsg.location}
                mt={4}
              /> */}


              <Autocomplete
                apiKey={'AIzaSyA5jp74cQNLfkHhs4u9jUg_2g-N5xUa9VU'}
                onPlaceSelected={handlePlaceSelected}
                placeholder='Search your location'
                style={{
                  width: '100%',
                  border: '1px solid #0000001f',
                  padding: '11px',
                  marginTop: '18px',
                  borderRadius: '4px'
                }}

              />
            </div>
          </div>
          <div className="column">
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
                placeholder="Enter name"
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
                placeholder="Enter designation"
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
                placeholder="Enter  phone number"
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
                placeholder="Enter whatsapp number"
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
                placeholder="Enter  email"
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

            <div className="container">
              <div className="heading-container">
                <FcOrganization className="icon" />
                <h4>Company Address</h4>
              </div>
              <TextInput
                idName="companyName"
                LabelName="Company Name"
                isRequired={true}
                isInvalid={errorMsg.companyName !== ''}
                placeholder="Enter company name"
                name="companyName"
                value={values.companyName}
                onChange={onChange}
                errorMsg={errorMsg.companyName}
                onBlur={validateData}
                mt={4}
              />
              <TextInput
                idName="city"
                isRequired={true}
                isInvalid={errorMsg.city !== ''}
                LabelName="City and District"
                placeholder="In which city and district  company located"
                value={values.city}
                name="city"
                onChange={onChange}
                errorMsg={errorMsg.city}
                onBlur={validateData}
                mt={4}
              />
              <TextInput
                idName="state"
                isRequired={true}
                isInvalid={errorMsg.state !== ''}
                LabelName="State"
                placeholder="In which state  company located"
                value={values.state}
                name="state"
                onChange={onChange}
                errorMsg={errorMsg.state}
                onBlur={validateData}
                mt={4}
              />
              <NumInput
                idName="zip"
                isRequired={true}
                isInvalid={errorMsg.zip !== ''}
                LabelName="PIN Code"
                value={zip}
                placeholder="Enter postal pin code"
                name="zip"
                onChange={(value) => setZip(value)}
                errorMsg={errorMsg.zip}
                onBlur={validateData}
                mt={4}
              />
            </div>
            <div className="container">
              <div className="heading-container">
                <FcCustomerSupport className="icon" />
                <h4>Other Details</h4>
              </div>
              <TextInput
                idName="telecallerName"
                LabelName="Telecaller Name"
                isRequired={true}
                isInvalid={errorMsg.telecallerName !== ''}
                placeholder="Enter Telecaller Name"
                name="telecallerName"
                value={values.telecallerName}
                onChange={onChange}
                errorMsg={errorMsg.telecallerName}
                onBlur={validateData}
                mt={4}
              />
             
              <TextInput
                idName="jobSource"
                LabelName="Job Source"
                isRequired={true}
                isInvalid={errorMsg.jobSource !== ''}
                placeholder="Enter Source of Job"
                name="jobSource"
                value={values.jobSource}
                onChange={onChange}
                errorMsg={errorMsg.jobSource}
                onBlur={validateData}
                mt={4}
              />
              <TextAreaInput
                idName="notes"
                isRequired={false}
                LabelName="Notes"
                isInvalid={errorMsg.notes !== ''}
                errorMsg={errorMsg.notes}
                placeholder="Notes on Job (Internal Use Only)"
                mt={4}
                value={values.notes}
                name="notes"
                onChange={onChange}
                onBlur={validateData}
              />
              <CheckBoxInput
                isName="placement"
                isInvalid={errorMsg.placement !== ''}
                isChecked={placement}
                name="placement"
                onChange={formOnPlacementChange}
                text="Placement"
                mt={4}
              />
            </div>
          </div>
        </div>
        <CheckBoxInput
          isName="dataPersist"
          isChecked={dataPersist}
          name="dataPersist"
          onChange={handleDataPersistCheckboxChange}
          text="Check this box, if another job needs same details"
          ml={1}
        />
        <Button onClick={onButtonClick} isLoading={buttonLoading}>
          Add Job
        </Button>
        <Button onClick={resetForm} colorScheme="red" ml={4}>
          Reset Form
        </Button>
      </div>
    </div>
  );
};

export default AdminAddJob;
