import React, { useState } from 'react';

import TextInput from '../../utilities/TextInput';
import Button from '../../utilities/Button';
import './AddTeleCallers.css';
import { useToast } from '@chakra-ui/react';
import { validateString } from '../../../helpers/validate';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Autocomplete from "react-google-autocomplete";


const AddTelecallers = (props) => {
    const [telecallerName, setTeleCallerName] = useState('');
    const [teleCallerError, setTeleCallerError] = useState('');
    const [TeleCallerDetails, setEditTeleCallerDetails] = useState('');
    // Chakra ui toast
    const toast = useToast();
    const GOOGLE_MAPS_API_KEY = 'AlzaSyAwlEOuG7Ta4w-XMiJ_gEXMT6P3WOnJKzt8'
    const handleTelecallerSubmit = async (e) => {
        const { result: isTelecallerValid, msg: errorMessage } = validateString(
            telecallerName,
            4,
            30,
            'Telecaller',
            true
        );

        if (!isTelecallerValid) {
            setTeleCallerError(errorMessage);
            return;
        }

        try {
            await api.post('/telecaller', {
                name: telecallerName,
            });
            toast({
                title: 'Added Successfully',
                description: 'New Tele Caller has been added successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            setTeleCallerName('');
        } catch (err) {
            showErrorToast(toast, err);
        }
    };

    const handleTelecallerChange = (e) => {
        setTeleCallerName(e.target.value);
    };

    const handleTelecallerUpdate = async (e) => {
        const { result: isTelecallerValid, msg: errorMessage } = validateString(
            telecallerName,
            4,
            30,
            'Telecaller',
            true
        );

        if (!isTelecallerValid) {
            setTeleCallerError(errorMessage);
            return;
        }

        try {
            const apiEndpoint = '/telecaller/' + TeleCallerDetails._id
            await api.patch(apiEndpoint, {
                name: telecallerName,
                isHidden: false
            }).then((res) => {

                setEditTeleCallerDetails(res.data)
                setTeleCallerName(res.data.name)
                console.log(res.data)
                console.log(TeleCallerDetails)
            });
            toast({
                title: 'Updated Successfully',
                description: 'New Tele Caller has been updated successfully',
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
            const teleCallerData = JSON.parse(sessionStorage.getItem("teleCaller"));
            if (teleCallerData) {
                setEditTeleCallerDetails(teleCallerData);
                if (teleCallerData.name) {
                    setTeleCallerName(teleCallerData.name);
                }
            }
        }
    }, [props.isEdit]);

    return (
        <>
            <div className="add-job-category">
                <TextInput

                    LabelName="Telecaller Name"
                    value={telecallerName}
                    onChange={handleTelecallerChange}
                    errorMsg={teleCallerError}
                    isInvalid={teleCallerError !== ''}

                />

              
                {props.isEdit ? (<Button onClick={handleTelecallerUpdate}>Update</Button>) : (<Button onClick={handleTelecallerSubmit}>Save</Button>)}

            </div>
        </>
    )

}

export default AddTelecallers;