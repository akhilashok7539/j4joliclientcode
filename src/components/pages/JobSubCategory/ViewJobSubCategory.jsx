
import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useToast, Button } from '@chakra-ui/react';
import './ViewJobSubCategory.css';
import { useHistory } from 'react-router-dom';
import TextInput from '../../utilities/TextInput';
import api from '../../../helpers/axios';
import { useEffect } from 'react';
import { showErrorToast } from '../../../helpers/errorToast';



const ViewJobSubCategory = () => {
    const [JobSubCategory, setJobSubCategory] = useState('')
    const history = useHistory();
    const toast = useToast();

    const AddTelecallers = () => {
        history.push(`/admin/dashboard/add-job-sub-category`);
    }

    useEffect(() => {
        getJobSubCategory()
    }, [])


    const getJobSubCategory = () => {
        api.get('/job-sub-category?include_hidden=true').then((res) => {
            setJobSubCategory(res.data)
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
            getJobSubCategory()
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
            <div className='addUserButtoncontainersub'>
                <TextInput
                    LabelName="search Job Sub-category"
                    placeholder="Search with Job Sub Category"
                    name="serach_Job_Sub-category"
                    mt={4}
                ></TextInput>
                <button className="add-user-btn" onClick={AddTelecallers}>
                    Add Job Sub-Category
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

                        {JobSubCategory.length > 0 ? (
                            JobSubCategory.map((item, index) => (
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

export default ViewJobSubCategory;