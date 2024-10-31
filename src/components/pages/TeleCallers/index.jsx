
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useToast, Button } from '@chakra-ui/react';
import './style.css';
import { useHistory } from 'react-router-dom';
import TextInput from '../../utilities/TextInput';
import api from '../../../helpers/axios';
import { useEffect } from 'react';
import { showErrorToast } from '../../../helpers/errorToast';

// history = useHistory();


const TeleCallers = () => {
    const [callers, setTelecaller] = useState('')
    const history = useHistory();
    const toast = useToast();

    const AddTelecallers = () => {
        history.push(`/admin/dashboard/add-telecallers`);
    }

    useEffect(() => {
        getTeleCallers()
    }, [])


    const getTeleCallers = () => {
        api.get('/telecaller').then((res) => {
            setTelecaller(res.data)
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }
    const handleEdit = (props) =>{
        sessionStorage.setItem("teleCaller", JSON.stringify(props));
        history.push(`/admin/dashboard/edit-telecallers`);
    }
    const handleDelete = (props) =>{
        const ENDPOINT = '/telecaller/'+props._id
        api.delete(ENDPOINT).then((res) => {
            getTeleCallers()
            toast({
                title: 'Deleted Successfully',
                description: 'Tele Caller has been deleted successfully',
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
                <TextInput
                    LabelName="search Tele Caller"
                    placeholder="Search with Name"
                    name="serach_tele_Caller"
                    mt={4}
                ></TextInput>
                <button className="add-user-btn" onClick={AddTelecallers}>
                    Add Tele Callers
                </button>
            </div>
            <div className="user-warpper" id="sub-category">
                <Table variant="striped" colorScheme="purple" className="sub-category-table">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th className='action-button'>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {callers.length > 0 ? (
                            callers.map((item, index) => (
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
                                <Td colSpan="2" style={{ textAlign: 'center' }}>No Telecallers found</Td>
                            </Tr>
                        )}


                    </Tbody>
                </Table>
            </div>

        </div>
    );
};

export default TeleCallers;
