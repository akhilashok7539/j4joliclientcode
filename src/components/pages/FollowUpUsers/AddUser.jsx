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
    const [error, setError] = useState(false);
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

    // autocompltelocation
    const [locations, setLocations] = useState([]);
    const [inputValue, setInputValue] = useState('');


    // console.log("districtList",districtList)
    const history = useHistory();
    const toast = useToast();
    useEffect(() => {
        let isMounted = true;
        document.addEventListener("mousedown", handleClickOutside);
        const fetchData = async () => {
            try {
                // Call all three functions here
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

        // Call the fetchData function
        fetchData();

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
            // console.log(list)
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

        setSelectedCategory(categoryId);
        setSubCategories(category ? category.subCategories : []);

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

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const isSelected = (option) => selectedOptions.includes(option);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };




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
        console.log(values)
        if (
            values.name !== ''


        ) {
            console.log("selectedOptions", selectedOptions)
            const prefLoc = []
          
            if (selectedOptions.length > 0) {
                const filteredLocations = prefferedlocationFullList.filter(location => selectedOptions.includes(location.name));
                const locationsWithoutId = filteredLocations.map(({ _id, ...rest }) => rest);
                // prefLoc = locationsWithoutId
                locationsWithoutId.forEach(location => prefLoc.push(location));
            }

            // if(locations.length>0)
            // {

            //     console.log("finallist",prefLoc.concat(locations))
            // }


            // if (values.locationSelected !== '' && place !== '') {
            //     console.log('check')
            //     const filterList = prefferedlocationFullList.filter((res) => {
            //         return res.name === values.locationSelected
            //     })

            //     let prefObj = {
            //         "type": filterList[0].type,
            //         "coordinates": filterList[0].coordinates,
            //         "name": filterList[0].name
            //     }
            //     prefLoc.push(prefObj)

            //     let prefObj2 = {
            //         "type": "Point",
            //         "coordinates": [coordinates.lat, coordinates.lng],
            //         "name": place
            //     }
            //     prefLoc.push(prefObj2)

            // }
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
                district: selectDist,
                jobCategory: values.job_category,
                jobSubCategory: values.jobSubCategory,
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
        setError(false);
        const name = place.name || place.formatted_address;
        const firstPart = name ? name.split(',')[0] : '';
        setPlace(firstPart);

        if (place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            setCoordinates({ lat, lng });
            // console.log("coordinates",coordinates)

            const prefObj = {
                type: "Point",
                coordinates: [lng, lat],  // Note: usually [lng, lat]
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
    // console.log("categories", categories.job_categories)
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
                                {/* <TextInput
                                    idName="districts"
                                    LabelName="Districts"
                                    placeholder="Enter  location"
                                    name="location"
                                    mt={4}
                                /> */}
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

                                {/* <SelectInput
                                    isRequired={false}
                                    isInvalid={false}
                                    dataList={prefferedlocationList}
                                    mt={4}
                                    name="prefferedLocations"
                                    value={values.locationSelected}
                                    onChange={(e) => setValues({ ...values, locationSelected: e.target.value })}
                                    LabelName="Preffered Locations"
                                    onBlur={validateData}
                                /> */}

                                <label className="dropdown-label">Preffered Locations</label>

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



                                {/* <Autocomplete
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

                                /> */}
                                <Autocomplete
                                    apiKey="AIzaSyA5jp74cQNLfkHhs4u9jUg_2g-N5xUa9VU"
                                    onPlaceSelected={handlePlaceSelected}
                                    placeholder="Search your location"
                                    style={{
                                        width: '100%',
                                        border: '1px solid #0000001f',
                                        padding: '11px',
                                        marginTop: '18px',
                                        borderRadius: '4px'
                                    }}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />


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

                                {/* <TextInput
                                    idName="subjobcategory"
                                    LabelName="Job Sub Category"
                                    mt={4}
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
                                            <option disabled value="">Select a category</option>
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
                                </div>

                                <div className='containerDiv'>

                                    <label style={{ fontSize: '0.8rem' }}>Job Sub Category</label>
                                    <select style={{
                                        width: '100%',
                                        border: '1px solid #0000001f',
                                        padding: '10px',

                                        borderRadius: '4px'
                                    }} id="job-subcategory" onChange={handleSubCategoryChange} disabled={!selectedCategory}>
                                        <option disabled value="">Select a subcategory</option>
                                        {subCategories.map(subCategory => (
                                            <option key={subCategory._id} value={subCategory._id}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="container">
                                <div className="heading-container">
                                    <FcAssistant className="icon" />

                                    <h4>Tele-Caller Details</h4>
                                </div>
                                <div className='containerDiv'>

                                    <label style={{ fontSize: '0.8rem' }}>Telecaller Name</label>
                                    <select style={{
                                        width: '100%',
                                        border: '1px solid #0000001f',
                                        padding: '10px',

                                        borderRadius: '4px'
                                    }} id="job-subcategory" onChange={handleTelecallerChange} >
                                        {/* <option value="">--Select a Telecaller--</option> */}
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
                            <Button colorScheme="red" >
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