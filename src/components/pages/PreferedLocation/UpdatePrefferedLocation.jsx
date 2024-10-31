import React, { useState } from 'react';

import TextInput from '../../utilities/TextInput';
import Button from '../../utilities/Button';
import './AddPrefferedLocation.css';
import { useToast } from '@chakra-ui/react';
import { validateString } from '../../../helpers/validate';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Autocomplete from 'react-google-autocomplete';

const AddPrefferedLocation = (props) => {

    console.log(props.isEdit)
    const [districtName, setdistrictName] = useState('');
    const [districtError, setdistrictError] = useState('');
    const [districtDetails, setEditdistrictDetails] = useState('');
    const [place, setPlace] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    // Chakra ui toast
    const toast = useToast();

    const handleTelecallerSubmit = async (e) => {
        const { result: isTelecallerValid, msg: errorMessage } = validateString(
            districtName,
            4,
            30,
            'District',
            true
        );

        if (!isTelecallerValid) {
            setdistrictError(errorMessage);
            return;
        }

        try {
            await api.post('/district', {
                name: districtName,
            });
            toast({
                title: 'Added Successfully',
                description: 'District has been added successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });

            setdistrictName('');
        } catch (err) {
            showErrorToast(toast, err);
        }
    };

    const handleTelecallerChange = (e) => {
        setdistrictName(e.target.value);
    };

    const handleTelecallerUpdate = async (e) => {
        const { result: isTelecallerValid, msg: errorMessage } = validateString(
            districtName,
            4,
            30,
            'District',
            true
        );

        if (!isTelecallerValid) {
            setdistrictError(errorMessage);
            return;
        }

        try {
            const apiEndpoint = '/district/' + districtDetails._id
            await api.patch(apiEndpoint, {
                name: districtName,
                isHidden: false
            }).then((res) => {

                setEditdistrictDetails(res.data)
                setdistrictName(res.data.name)
                console.log(res.data)
                console.log(districtDetails)
            });
            toast({
                title: 'Updated Successfully',
                description: 'District has been updated successfully',
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
            const districtData = JSON.parse(sessionStorage.getItem("district"));
            if (districtData) {
                setEditdistrictDetails(districtData);
                if (districtData.name) {
                    setdistrictName(districtData.name);
                }
            }
        }
    }, [props.isEdit]);
    const handlePlaceSelected = (place) => {
        setPlace(place);

        if (place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setCoordinates({ lat, lng });
        }
    };
    return (
        <>
            <div className="add-job-category">
                <TextInput

                    LabelName="Location"
                    value={districtName}
                    onChange={handleTelecallerChange}
                    errorMsg={districtError}
                    isInvalid={districtError !== ''}

                />
                {props.isEdit ? (<Button onClick={handleTelecallerUpdate}>Update</Button>) : (<Button onClick={handleTelecallerSubmit}>Save</Button>)}
                {/* <div>
                    <h2>Google Places Autocomplete</h2>
                    <Autocomplete
                        apiKey={'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg'}
                        onPlaceSelected={handlePlaceSelected}
                        types={['(cities)']} // restrict to cities, optional
                        fields={['geometry', 'name']} // fetch geometry to get lat and lng
                        options={{
                            componentRestrictions: { country: 'us' }, // restrict to a country, optional
                        }}
                    />
                    {place && (
                        <div>
                            <h3>Selected Place Details:</h3>
                            <p><strong>Name:</strong> {place.name}</p>
                            <p><strong>Latitude:</strong> {coordinates.lat}</p>
                            <p><strong>Longitude:</strong> {coordinates.lng}</p>
                        </div>
                    )}
                </div> */}
            </div>


        </>
    )

}

export default AddPrefferedLocation;