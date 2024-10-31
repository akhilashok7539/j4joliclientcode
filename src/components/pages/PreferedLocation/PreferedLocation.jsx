
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useToast, Button } from '@chakra-ui/react';
import './PreferedLocation.css';
import { useHistory } from 'react-router-dom';
import TextInput from '../../utilities/TextInput';
import api from '../../../helpers/axios';
import { useEffect } from 'react';
import { showErrorToast } from '../../../helpers/errorToast';

// history = useHistory();


const PreferedLocation = () => {
    const [district, setPrefferedLocations] = useState('')
    const history = useHistory();
    const toast = useToast();

    const AddPrefferedLocations = () => {
        history.push(`/admin/dashboard/add-locations`);
    }

    useEffect(() => {
        getPrefferedLocations()
    }, [])


    const getPrefferedLocations = () => {
        api.get('/preferred-location').then((res) => {
            setPrefferedLocations(res.data)
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }
    const handleEdit = (props) =>{
        sessionStorage.setItem("district", JSON.stringify(props));
        history.push(`/admin/dashboard/edit-district`);
    }
    const handleDelete = (props) =>{
        const ENDPOINT = '/preferred-location/'+props._id
        api.delete(ENDPOINT).then((res) => {
            getPrefferedLocations()
            toast({
                title: 'Deleted Successfully',
                description: 'District has been deleted successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }
    
    return (


        <div className="follow-up-container">
            <div className='addUserButtoncontainer'>
                {/* <TextInput
                    LabelName="search Locations"
                    placeholder="Search your locations"
                    name="serach_district"
                    mt={4}
                ></TextInput> */}
                <div></div>
                <button className="add-user-btn" onClick={AddPrefferedLocations}>
                    Add Locations
                </button>
            </div>
            <div className="user-warpper" id="sub-category">
                <Table variant="striped" colorScheme="purple" className="sub-category-table">
                    <Thead>
                        <Tr>
                            <Th>Location</Th>
                            <Th className='action-button'>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {district.length > 0 ? (
                            district.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.name}</Td>
                                    <Td className='action-button'>
                                        <Button onClick={() => handleDelete(item)}>Delete</Button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="2" style={{ textAlign: 'center' }}>No Locations found</Td>
                            </Tr>
                        )}


                    </Tbody>
                </Table>
            </div>

        </div>
    );
};

export default PreferedLocation;
