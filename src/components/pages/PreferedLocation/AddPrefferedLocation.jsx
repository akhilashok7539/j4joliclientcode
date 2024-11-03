import React, { useRef, useState } from 'react';

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

    const [districtName, setdistrictName] = useState('');
    const [districtError, setdistrictError] = useState('');
    const [districtDetails, setEditdistrictDetails] = useState('');
    
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    const [place, setPlace] = useState(null);

    const [error, setError] = useState(false); 
    const autocompleteRef = useRef(null);
    // Chakra ui toast
    const toast = useToast();

    const handlePrefferedLocationSubmit = async (e) => {

        if (!place) {
            setError(true); // Set error if no place has been selected
        } else {
            setError(false);
            // Handle the update logic here
            try {
          
                await api.post('/preferred-location', {
                    "type": "Point",
                    "coordinates": [coordinates.lng, coordinates.lat],
                    "name":place
                });
                toast({
                    title: 'Added Successfully',
                    description: 'Preffered Location has been added successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
    
                setdistrictName('');
                setPlace('')
                if (autocompleteRef.current) {
                    autocompleteRef.current.value = '';
                }
            } catch (err) {
                showErrorToast(toast, err);
            }
        }
    };

    const handleTelecallerChange = (e) => {
        setdistrictName(e.target.value);
    };

  
    useEffect(() => {
        console.log("Updated coordinates:", coordinates);
        console.log("Updated place:", place);

    }, [coordinates]);


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
    return (
        <>
            <div className="add-job-category">

                <Autocomplete
                    // apiKey={'AIzaSyA5jp74cQNLfkHhs4u9jUg_2g-N5xUa9VU'}
                    ref={autocompleteRef}
                    onPlaceSelected={handlePlaceSelected}
                    // options={{ types: ["(cities)"] }}
                    options={{
                        types: ['geocode'], // Use 'geocode' for broader location results
                        componentRestrictions: { country: 'IN' } // Restrict results to India
                      }}
                    style={{
                        width: '100%',
                        border: '1px solid #0000001f',
                        padding: '11px'
                    }}
                   
                />
                 {error && <p style={{ color: 'red' }}>Please select a location</p>}
                 <Button onClick={handlePrefferedLocationSubmit}>Save</Button>
               
            </div>


        </>
    )

}

export default AddPrefferedLocation;

// onPlaceSelected={(place) => {
                    //     if (place.geometry) {
                    //         const latitude = place.geometry.location.lat();
                    //         const longitude = place.geometry.location.lng();
                    //         console.log('Latitude:', latitude);
                    //         console.log('Longitude:', longitude);
                    //         setCoordinates({ latitude, longitude });
                    //         console.log("coordinates",coordinates)


                    //     } else {
                    //         console.log('Location data not available');
                    //     }
                    // }}



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