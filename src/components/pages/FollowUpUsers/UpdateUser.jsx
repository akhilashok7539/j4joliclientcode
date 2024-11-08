import React, { useEffect, useRef } from 'react';
import TextInput from '../../utilities/TextInput';
import Button from '../../utilities/Button';
import {
    FcInspection,
    FcAssistant,
    FcServices,
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

const UpdateUser = () => {


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
        followUpUserStatus: '',
        followUpUserRemarks: ''

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
        followedUpBy: '',
        followUpUserStatus: '',
        followUpUserRemarks: ''



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
    // for sub category
    const [isOpenSubcat, setIsOpenSubcat] = useState(false);
    const [selectedOptionsSubCat, setSelectedOptionsSubCat] = useState([]);
    const dropdownRefSubCat = useRef(null);

    // autocompltelocation
    const [locations, setLocations] = useState([]);
    const [inputValue, setInputValue] = useState('');




    // console.log("districtList",districtList)
    const history = useHistory();
    const toast = useToast();
    const followUpUserStatusList = ['Pending', 'Informed']
    useEffect(() => {
        let isMounted = true;
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousedown", handlerOutsideClick);

        const fetchData = async () => {
            try {
                // Call all three functions here
                await Promise.all([
                    getPrefferedLocations(),
                    updateJobCategoryArray(),
                    getDistrictsList(),
                    getJobCategoriesAndSubCategories(),
                    getTeleCallers(),
                    getSubCategories()
                ]);
                await patchValue();
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
        console.log("subCategories updated:", subCategories);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousedown", handlerOutsideClick);
            isMounted = false; // Cleanup function to avoid state update if unmounted
        };
    }, []);

    useEffect(() => {
        console.log("subCategories updated:", subCategories);
        patchValue()
    }, [subCategories]);

    const patchValue = async () => {
        const data = JSON.parse(sessionStorage.getItem("UserDetailsUpdate"))

        const categoryId = data.jobCategory._id;
        console.log("categories", categories)
        const category = categories.find(cat => cat.id === categoryId);
        console.log(category)
        setSelectedCategory(categoryId);

        setValues((prevValues) => ({
            ...prevValues,
            name: data.name,
            phoneNumber: data.phoneNumber,
            experience_required: data.experience,
            job_category: data.jobCategory._id,

        }));

        const filteredList = prefferedlocationFullList.filter(location =>
            !data.preferredLocation.some(selected => selected._id === location._id)
        );
        const mapLocationNames = filteredList.map(x => x.name)
        setLocations(data.preferredLocation)
        // const list2Ids = new Set(data.jobSubCategory.map(item => item._id));
        // const commonItems = subCategories.filter(item => list2Ids.has(item._id));
        // const filterItems = commonItems.map(x => x.name);
        // console.log("filter data list")
        // jobSubCat = data.jobSubCategory;
        const subCatSession = data.jobSubCategory.map(x => x.name)
        setSelectedOptionsSubCat(subCatSession)

        setValues((prevValues) => ({
            ...prevValues,
            district: data.preferredDistricts[0] ? data.preferredDistricts[0].name : '',
            followedUpBy: data.followedUpBy._id,
            followUpUserRemarks: data.followUps[0]?.remarks,
            followUpUserStatus: data.followUps[0]?.status,
        }));

        if (data.gender === 'male') {
            setGender((prevGender) => ({
                ...prevGender,
                male: true,
                female: false,
            }));
        }

        if (data.gender === 'female') {
            setGender((prevGender) => ({
                ...prevGender,
                male: false,
                female: true,
            }));
        }


    }

    const getSubCategories = async () => {
        api.get('/job-sub-category?include_hidden=true').then((res) => {
            setSubCategories(res.data)
            console.log(subCategories)
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    };
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

        setSelectedCategory(categoryId);
        setSubCategories(category ? category.subCategories : []);
        setValues((prevValues) => ({
            ...prevValues,
            job_category: categoryId,
            jobSubCategory: ''
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

    const handleInputChange = (event) => {
        setValues({
            ...values,
            followUpUserRemarks: event.target.value,
        });
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
            values.name !== '',
            values.phoneNumber != '',
            values.experience_required !== '',
            values.job_category != '',
            values.district !== ''
        ) {
            // console.log("selectedOptions", selectedOptions)
            const prefLoc = []
            const selectDist = []

            if (selectedOptions.length > 0) {
                const filteredLocations = prefferedlocationFullList.filter(location => selectedOptions.includes(location.name));
                const locationsWithoutId = filteredLocations.map(({ _id, ...rest }) => rest);
                locationsWithoutId.forEach(location => prefLoc.push(location));
            }

            if (values.district !== '') {
                const filterList = districtsFull.filter((res) => {
                    return res.name === values.district
                })

                selectDist.push(filterList[0]._id)
            }
            const trueValues = getTrueValues(gender);
            const currentDate = new Date(); // Current date and time
            const currentIsoString = currentDate.toISOString(); // Convert to ISO string

            // const list1 = subCategories
            // const list2Ids = new Set(selectedOptionsSubCat.map(item => item._id));
            // const commonItems = subCategories.filter(item => selectedOptionsSubCat.has(item.name));
            // const filterItems = commonItems.map(x => x.name);
            const commonItems = subCategories.filter(item => selectedOptionsSubCat.includes(item.name));
            // console.log(commonItems.map(x=>x._id))
            const filterItemsSubCat = commonItems.map(item => item._id);
            // values.jobSubCategory = commonItems.map(x => x._id)
            // values.jobSubCategory = selectedOptionsSubCat.map(x=>x._id)
            // console.log("selectedOptionsSubCat",selectedOptionsSubCat,commonItems)

            const job = {
                name: values.name,
                phoneNumber: values.phoneNumber,
                experience: values.experience_required,
                preferredDistricts: selectDist,
                jobCategory: values.job_category,
                jobSubCategory: filterItemsSubCat,
                gender: trueValues[0],
                preferredLocation: prefLoc.concat(locations),
                followedUpBy: values.followedUpBy,
                followUpStatus: "Pending",
                followUps: [
                    {
                        "status": values.followUpUserStatus,
                        "date": currentIsoString,
                        "remarks": values.followUpUserRemarks
                    }
                ]
            };
           
            const data = JSON.parse(sessionStorage.getItem("UserDetailsUpdate"))

            const API_ENDPOINT = '/follow-up-user/' + data._id
            api
                .patch(API_ENDPOINT, job)
                .then((res) => {
                    //   setButtonLoading(false);
                    toast({
                        title: 'Successfully Added',
                        description: 'Follow Up user updated',
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
            followedUpBy: '',
            followUpUserStatus: '',
            followUpUserRemarks: ''

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




                                <Autocomplete
                                    // apiKey="AIzaSyA5jp74cQNLfkHhs4u9jUg_2g-N5xUa9VU"
                                    options={{
                                        types: ['geocode'], // Use 'geocode' for broader location results
                                        componentRestrictions: { country: 'IN' } // Restrict results to India
                                    }}
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

                                <p className='paragraphLocation'>Selected location lists</p>
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
                                    <label style={{ fontSize: '0.8rem' }}>Job Category</label>
                                    {categories.length > 0 ? (
                                        <select
                                            className='selectBoxContainer'
                                            id="job-category" onChange={handleCategoryChange}
                                            value={values.job_category}
                                        >
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
                                    <select className='telecallerName' id="job-subcategory"
                                        value={values.followedUpBy}
                                        onChange={(e) => setValues({ ...values, followedUpBy: e.target.value })}
                                    >
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
                            <div className="container">
                                <div className="heading-container">
                                    <FcServices className="icon" />

                                    <h4>Follow-Up Users</h4>
                                </div>
                                <div className='containerDiv'>
                                    <label className="dropdown-label">Follow Up User Status</label>
                                    <select className='selectBoxContainer' value={values.followUpUserStatus}
                                        onChange={(e) => setValues({ ...values, followUpUserStatus: e.target.value })}
                                        name="" >
                                        <option value="">Select a status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Informed">Informed</option>
                                    </select>
                                   
                                    <label className="dropdown-label">Remarks</label>
                                    <input className='selectBoxContainer' type="text" placeholder='Remarks' onChange={handleInputChange} value={values.followUpUserRemarks} />
                                </div>
                            </div>
                            <Button onClick={onButtonClick} >
                                Update User
                            </Button>

                        </div>
                    </div>


                </div>
            </div>
        </>
    )

}

export default UpdateUser;