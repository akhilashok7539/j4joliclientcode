import React, { useState } from 'react';

import TextInput from '../../utilities/TextInput';
import Button from '../../utilities/Button';
import './JobSubCategory.css';
import { useToast } from '@chakra-ui/react';
import { validateString } from '../../../helpers/validate';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const JobSubCategory = (props) => {
    const [jobSubCategoryName, setjobSubCategoryName] = useState('');
    const [jobSubCategoryError, setjobSubCategoryError] = useState('');
    const [jobSubCategoryDetails, setEditjobSubCategoryDetails] = useState('');
   
    const toast = useToast();
   
    const handleJobSubCategorySubmit = async (e) => {
        const { result: isjobSubCategoryValid, msg: errorMessage } = validateString(
            jobSubCategoryName,
            4,
            30,
            'Job-subcategory',
            true
        );

        if (!isjobSubCategoryValid) {
            setjobSubCategoryError(errorMessage);
            return;
        }

        try {
            await api.post('/job-sub-category', {
                name: jobSubCategoryName,
            });
            toast({
                title: 'Added Successfully',
                description: 'New Job Sub-category has been added successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            setjobSubCategoryName('');
        } catch (err) {
            showErrorToast(toast, err);
        }
    };

    const handlejobSubCategoryChange = (e) => {
        setjobSubCategoryName(e.target.value);
    };

    const handleTelecallerUpdate = async (e) => {
        const { result: isjobSubCategoryValid, msg: errorMessage } = validateString(
            jobSubCategoryName,
            4,
            30,
            'Job-subcategory',
            true
        );

        if (!isjobSubCategoryValid) {
            setjobSubCategoryError(errorMessage);
            return;
        }

        try {
            const apiEndpoint = '/job-sub-category/' + jobSubCategoryDetails._id
            await api.patch(apiEndpoint, {
                name: jobSubCategoryName,
                isHidden: false
            }).then((res) => {

                setEditjobSubCategoryDetails(res.data)
                setjobSubCategoryName(res.data.name)
                console.log(res.data)
                console.log(jobSubCategoryDetails)
            });
            toast({
                title: 'Updated Successfully',
                description: 'Job Sub category has been updated successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

        } catch (err) {
            showErrorToast(toast, err);
        }
    };
    useEffect(() => {
        if (props.isEdit) {
            const jobSubCategory = JSON.parse(sessionStorage.getItem("jobSubCategory"));
            if (jobSubCategory) {
                setEditjobSubCategoryDetails(jobSubCategory);
                if (jobSubCategory.name) {
                    setjobSubCategoryName(jobSubCategory.name);
                }
            }
        }
    }, [props.isEdit]);

    return (
        <>
            <div className="add-job-category">
                <TextInput

                    LabelName="Sub Category Name"
                    value={jobSubCategoryName}
                    onChange={handlejobSubCategoryChange}
                    errorMsg={jobSubCategoryError}
                    isInvalid={jobSubCategoryError !== ''}

                />

               
                {props.isEdit ? (<Button onClick={handleTelecallerUpdate}>Update</Button>) : (<Button onClick={handleJobSubCategorySubmit}>Save</Button>)}

            </div>
        </>
    )

}

export default JobSubCategory;