import React, { useEffect, useRef } from 'react';
import TextInput from '../../utilities/TextInput';
import Button from '../../utilities/Button';
import {
    FcInspection,
    FcAssistant,
} from 'react-icons/fc';
import {
    IoLocationSharp,
} from 'react-icons/io5';
import './AddUser.css';
import PhoneNumberInput from '../../utilities/PhoneNumberInput';
import useForm from '../../../hooks/useForm';
import { useState } from 'react';
import { showErrorToast } from '../../../helpers/errorToast';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { useHistory } from 'react-router-dom';
import { FormControl, FormErrorMessage, FormLabel, IconButton, Stack, useToast } from '@chakra-ui/react';
import api from '../../../helpers/axios';
import CheckBoxInput from '../../utilities/CheckBoxInput';
import { getDistricts } from '../../../districts';
import SelectInput from '../../utilities/SelectInput';

// SelectInputV2.jsx
import Autocomplete from 'react-google-autocomplete';
import { CloseIcon } from '@chakra-ui/icons';

const AddUser = () => {
    const [values, onChange, setValues] = useForm({
        name: '',
        gender: '',
        phoneNumber: '',
        experience_required: '',
        district: '',
        locationSelected: '',
        location: '',
        job_category: '',
        jobSubCategory: '',
        followedUpBy: '',

    })
    const [gender, setGender] = useState({ male: false, female: false, others: false });
    const [errorMsg, setErrorMsg] = useState({
        name: '',
        gender: '',
        phoneNumber: '',
        experience_required: '',
        district: '',
        locationSelected: '',
        preferred_gender: '',
        location: '',
        job_category: '',
        jobSubCategory: '',
        followedUpBy: ''

    });
    const [districtsFull, setdistrictsFull] = useState([]);
    const [dataPersist, setDataPersist] = useState(false);
    const [jobCategories, setJobCategories] = useState([]);
    const [dataListDistrict, setDataListDistrict] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    const [place, setPlace] = useState(null);
    const autocompleteRef = useRef(null);
    const [prefferedlocationFullList, setLocationsListFull] = useState([])
    const [prefferedlocationList, setPrefferedLocations] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setcategories] = useState([]);
    const [callers, setTelecaller] = useState('')

    // for selectbox prefferd locations
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    const [isOpenSubcat, setIsOpenSubcat] = useState(false);
    const [selectedOptionsSubCat, setSelectedOptionsSubCat] = useState([]);
    const dropdownRefSubCat = useRef(null);


    // autocompltelocation
    const [locations, setLocations] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Vadldation 
    const [errorPrefferedLocation, setErrorPrefferedLocation] = useState(false);
    const [errorJobCategroy, setErrorJobCategroy] = useState(false);

    // console.log("districtList",districtList)
    const history = useHistory();
    const toast = useToast();
    useEffect(() => {
        let isMounted = true;
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handlerOutsideClick);

        const fetchData = async () => {
            try {
                await updateJobCategoryArray();
                await getDistrictsList();
                await getPrefferedLocations();
                await getJobCategoriesAndSubCategories();
                await getTeleCallers();
            } catch (err) {
                if (isMounted) showErrorToast(toast, err);
            }
        };
        const updateJobCategoryArray = async () => {
            const result = await api.get('/job-category');
            const jobCategoryArray = result.data.job_categories.map(cat => cat.name);
            if (isMounted) setJobCategories(jobCategoryArray);
        };
        fetchData();
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousedown", handlerOutsideClick);

            isMounted = false; // Cleanup function to avoid state update if unmounted
        };
    }, []);

    // function to set error msg state
    const validateData = (e) => {
        showErrorMsg(e.target.name, e.target.value, setErrorMsg);
    };
    const getDistrictsList = () => {
        api.get('/district').then((res) => {
            setdistrictsFull(res.data)
            const list = []
            res.data.forEach((item) => {
                list.push(item.name)
            })
            setDataListDistrict(list)

        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }
    const getPrefferedLocations = () => {
        api.get('/preferred-location').then((res) => {
            setLocationsListFull(res.data)
            const list = []
            res.data.forEach((item) => {
                list.push(item.name)
            })
            setPrefferedLocations(list)
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }

    const getJobCategoriesAndSubCategories = () => {
        api.get('/job-category?include_hidden=false&sub_category=true').then((res) => {
            setcategories(res.data.job_categories)
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }


    const getTeleCallers = () => {
        api.get('/telecaller').then((res) => {
            setTelecaller(res.data)
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
        setSelectedOptionsSubCat([])
        setValues((prevValues) => ({
            ...prevValues,
            job_category: categoryId,
            jobSubCategory: '' // Reset jobSubCategory when category changes
        }));

    };
    const handleTelecallerChange = (event) => {
        const telecallerId = event.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            followedUpBy: telecallerId,
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

    const getTrueValues = (obj) => {
        // Use Object.entries to get an array of key-value pairs
        return Object.entries(obj)
            .filter(([key, value]) => value === true) // Filter for true values
            .map(([key]) => key); // Map to get only the keys
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdownSubCat = () => {
        setIsOpenSubcat(!isOpenSubcat);
    };

    const handleOptionClick = (option) => {
        setErrorPrefferedLocation(false);
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleOptionClickSubCat = (option) => {
        if (selectedOptionsSubCat.includes(option)) {
            setSelectedOptionsSubCat(selectedOptionsSubCat.filter((item) => item !== option));
        } else {
            setSelectedOptionsSubCat([...selectedOptionsSubCat, option]);
        }
    };
    const isSelected = (option) => selectedOptions.includes(option);
    const isSelectedSubCat = (option) => selectedOptionsSubCat.includes(option);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handlerOutsideClick = (event) => {
        if (dropdownRefSubCat.current && !dropdownRefSubCat.current.contains(event.target)) {
            setIsOpenSubcat(false)
        }
    }

    // function to post job after checking api call
    const onButtonClick = () => {
        showErrorMsg('name', values.name, setErrorMsg);
        showErrorMsg('phoneNumber', values.phoneNumber, setErrorMsg);
        showErrorMsg('experience_required', values.experience_required, setErrorMsg);
        showErrorMsg('district', values.district, setErrorMsg);
        showErrorMsg('location', values.location, setErrorMsg);
        showErrorMsg('job_category', values.job_category, setErrorMsg);
        showErrorMsg('jobSubCategory', values.jobSubCategory, setErrorMsg);
        showErrorMsg('locationSelected', values.locationSelected, setErrorMsg);
        checkGenderError();

        if (selectedOptions.length > 0 || locations.length > 0) {
            setErrorPrefferedLocation(false)
        } else {
            setErrorPrefferedLocation(true)
        }
        if (values.job_category === '') {
            setErrorJobCategroy(true)
        }
        else {
            setErrorJobCategroy(false)
        }
        if (
            values.name !== '',
            values.phoneNumber != '',
            values.experience_required !== '',
            values.job_category != '',
            values.district !== ''
        ) {
            const prefLoc = []
            const subCat = [];
            if (selectedOptions.length > 0) {
                const filteredLocations = prefferedlocationFullList.filter(location => selectedOptions.includes(location.name));
                const locationsWithoutId = filteredLocations.map(({ _id, ...rest }) => rest);
                locationsWithoutId.forEach(location => prefLoc.push(location));
            }

            if (selectedOptionsSubCat.length > 0) {
                const FilterSubCat = subCategories.filter(subCat => selectedOptionsSubCat.includes(subCat.name))
                const filterWithId = FilterSubCat.map(x => x._id)
                filterWithId.forEach(cat => subCat.push(cat))
            }

            const selectDist = []
            if (values.district !== '') {
                const filterList = districtsFull.filter((res) => {
                    return res.name === values.district
                })
                selectDist.push(filterList[0]._id)
            }
            const trueValues = getTrueValues(gender);
            const currentDate = new Date(); // Current date and time
            const currentIsoString = currentDate.toISOString(); // Convert to ISO string

            const job = {
                name: values.name,
                phoneNumber: values.phoneNumber,
                experience: values.experience_required,
                preferredDistricts: selectDist,
                jobCategory: values.job_category,
                jobSubCategory: subCat,
                gender: trueValues[0],
                preferredLocation: prefLoc.concat(locations),
                followedUpBy: values.followedUpBy,
                followUpStatus: "Pending",
                followUps: [
                    {
                        "status": "Pending",
                        "date": currentIsoString,
                        "remarks": "Will follow up next week."
                    }
                ]
            };
            console.log(job)
            // //   setButtonLoading(true);
            api
                .post('/follow-up-user', job)
                .then((res) => {
                    //   setButtonLoading(false);
                    toast({
                        title: 'Successfully Added',
                        description: 'Follow Up user created',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    if (!dataPersist) {
                        history.push('/admin/dashboard/follow-up');
                    }
                })
                .catch((err) => {
                    //   setButtonLoading(false);
                    showErrorToast(toast, err);
                });
        }
        else {
            console.log("form invalud")
        }
    };
    const formOnChange = (e) => {
        setGender((prevGender) => ({
            ...prevGender,
            [e.target.name]: e.target.checked,
        }));
    };
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


    const resetForm = () => {
        setValues({
            name: '',
            gender: '',
            phoneNumber: '',
            experience_required: '',
            district: '',
            location: '',
            job_category: '',
            jobSubCategory: '',
            locationSelected: '',
            followedUpBy: ''
        });
        setGender({ male: true, female: true, others: true });
    };


    const handlePlaceSelected = (place) => {
        setErrorPrefferedLocation(false);
        const name = place.name || place.formatted_address;
        const firstPart = name ? name.split(',')[0] : '';
        if (place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setCoordinates({ lat, lng });
            const prefObj = {
                type: "Point",
                coordinates: [lat,lng],  // Note: usually [lng, lat]
                name: firstPart
            };
            // Use the functional form of setLocations to add the new object
            setLocations((prevLocations) => [...prevLocations, prefObj]);
        }
        // setLocations((prevLocations) => [...prevLocations, firstPart]);
        setInputValue('');
    };

    const handleRemoveLocation = (index) => {
        const updatedLocations = locations.filter((_, i) => i !== index);
        setLocations(updatedLocations);
    };

    return (
        <>
            <div className="add-job">
                <div className="form">
                    <div className="row">
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
                                    placeholder="Enter user name"
                                    value={values.name}
                                    mt={4}
                                    name="name"
                                    onChange={onChange}
                                    onBlur={validateData}
                                    errorMsg={errorMsg.name}
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
                                <PhoneNumberInput

                                    idName="phoneNumber"
                                    isRequired={true}
                                    isInvalid={errorMsg.phoneNumber !== ''}
                                    LabelName="phoneNumber"
                                    placeholder="Enter phone number"
                                    value={values.phoneNumber}
                                    mt={4}
                                    name="phoneNumber"
                                    onChange={onChange}
                                    onBlur={validateData}
                                    errorMsg={errorMsg.phoneNumber}
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

                                <label className="dropdown-label">Preffered Locations <span className='isRequired'>*</span></label>
                                <div className="dropdown-container" ref={dropdownRef}>
                                    <div className="dropdown-header" onClick={toggleDropdown}>
                                        {selectedOptions.length > 0
                                            ? selectedOptions.join(", ")
                                            : "Select Preffered Locations"}
                                        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
                                    </div>

                                    {isOpen && (
                                        <div className="dropdown-list">
                                            {prefferedlocationFullList.map((option) => (
                                                <div
                                                    key={option._id}
                                                    onClick={() => handleOptionClick(option.name)}
                                                    className={`dropdown-item ${isSelected(option.name) ? "selected" : ""
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected(option.name)}
                                                        readOnly
                                                    />
                                                    <span>{option.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <Autocomplete
                                    options={{
                                        types: ['geocode'], // Use 'geocode' for broader location results
                                        componentRestrictions: { country: 'IN' } // Restrict results to India
                                    }}
                                    onPlaceSelected={handlePlaceSelected}
                                    placeholder="Search your location"
                                    className='autocomplete'
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                {errorPrefferedLocation ? <p className='Validation'>Choose atleast one location</p> : <></>}

                                <div className='locationContainer' >
                                    {locations.map((location, index) => (
                                        <div key={index} className='locationChips'>
                                            <span>{location.name}</span>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleRemoveLocation(index)}
                                                style={{ marginLeft: '8px' }}
                                                className='iconBackground'
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                        <div className="column">
                            <div className="container">
                                <div className="heading-container">
                                    <FcInspection className="icon" />
                                    <h4>Job Requirements</h4>
                                </div>
                                <TextInput
                                    idName="experience_required"
                                    isRequired={true}
                                    isInvalid={errorMsg.experience_required !== ''}
                                    LabelName="Experience required"
                                    value={values.experience_required}
                                    placeholder="Enter the Total YOE"
                                    name="experience_required"
                                    onChange={onChange}
                                    onBlur={validateData}
                                    errorMsg={errorMsg.experience_required}
                                    mt={4}
                                />

                                <div className='containerDiv'>
                                    <label style={{ fontSize: '0.8rem' }}>Job Category <span className='isRequired'>*</span></label>
                                    {categories.length > 0 ? (
                                        <select
                                            style={{
                                                width: '100%',
                                                border: `2px solid ${errorJobCategroy ? 'red' : '#0000001f'}`,
                                                padding: '10px',
                                                borderRadius: '4px'
                                            }}
                                            id="job-category" value={values.job_category} onChange={handleCategoryChange}>
                                            <option value="">Select a category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select id="job-category" >
                                            <option disabled value="">No data</option>
                                        </select>
                                    )}
                                    {errorJobCategroy ? <p className='Validation'>Job Category cannot be empty</p> : <></>}
                                </div>

                                <div className='containerDiv'>
                                    <label style={{ fontSize: '0.8rem' }}>Job Sub Category</label>
                                    <div className="dropdown-container" ref={dropdownRefSubCat}>
                                        <div className="dropdown-header" onClick={toggleDropdownSubCat}>
                                            {selectedOptionsSubCat.length > 0
                                                ? selectedOptionsSubCat.join(", ")
                                                : "Select job sub categories"}
                                            <span className="dropdown-arrow">{isOpenSubcat ? "▲" : "▼"}</span>
                                        </div>

                                        {isOpenSubcat && (
                                            <div className="dropdown-list">
                                                {subCategories.map((option) => (
                                                    <div
                                                        key={option._id}
                                                        onClick={() => handleOptionClickSubCat(option.name)}
                                                        className={`dropdown-item ${isSelectedSubCat(option.name) ? "selected" : ""
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelectedSubCat(option.name)}
                                                            readOnly
                                                        />
                                                        <span>{option.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="container">
                                <div className="heading-container">
                                    <FcAssistant className="icon" />
                                    <h4>Tele-Caller Details</h4>
                                </div>
                                <div className='containerDiv'>
                                    <label style={{ fontSize: '0.8rem' }}>Telecaller Name</label>
                                    <select className='telecallerName' id="job-subcategory" onChange={handleTelecallerChange} >
                                        {callers.length > 0 ? (
                                            <>
                                                <option disabled value="">Select a telecaller</option>
                                                {callers.map(telecaller => (
                                                    <option key={telecaller._id} value={telecaller._id}>
                                                        {telecaller.name}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value="">No telecallers available</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <Button onClick={onButtonClick} >
                                Add User
                            </Button>
                            <Button colorScheme="red" onClick={resetForm}>
                                Reset Form
                            </Button >
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddUser;