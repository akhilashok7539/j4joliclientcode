
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useToast, Button } from '@chakra-ui/react';
import './style.css';
import { useHistory } from 'react-router-dom';
import TextInput from '../../utilities/TextInput';
import api from '../../../helpers/axios';
import { useEffect } from 'react';
import { showErrorToast } from '../../../helpers/errorToast';

// history = useHistory();


const District = () => {
    const [district, setdistrict] = useState('')
    const history = useHistory();
    const toast = useToast();

    const AddDistrict = () => {
        history.push(`/admin/dashboard/add-district`);
    }

    useEffect(() => {
        getDistricts()
    }, [])


    const getDistricts = () => {
        api.get('/district?include_hidden=false').then((res) => {
            setdistrict(res.data)
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }
    const handleEdit = (props) =>{
        sessionStorage.setItem("district", JSON.stringify(props));
        history.push(`/admin/dashboard/edit-district`);
    }
    const handleDelete = (props) =>{
        const ENDPOINT = '/district/'+props._id
        api.delete(ENDPOINT).then((res) => {
            getDistricts()
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
            <div> </div>
                <button className="add-user-btn" onClick={AddDistrict}>
                    Add District
                </button>
            </div>
            <div className="user-warpper" id="sub-category">
                <Table variant="striped" colorScheme="purple" className="sub-category-table">
                    <Thead>
                        <Tr>
                            <Th>District</Th>
                            <Th className='action-button'>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {district.length > 0 ? (
                            district.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.name}</Td>
                                    <Td className='action-button'>
                                        {/* {item.isHidden ? (
                                            <Button>Show</Button>
                                        ) : (
                                            <Button>Hide</Button>
                                        )} */}
                                        <Button onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button onClick={() => handleDelete(item)}>Delete</Button>

                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="2" style={{ textAlign: 'center' }}>No District found</Td>
                            </Tr>
                        )}


                    </Tbody>
                </Table>
            </div>

        </div>
    );
};

export default District;
