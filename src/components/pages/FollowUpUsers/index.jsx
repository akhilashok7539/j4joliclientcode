
import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useToast, Button } from '@chakra-ui/react';
import './style.css';
// import AddUserModal from './UserModal';
import { useHistory } from 'react-router';
import TextInput from '../../utilities/TextInput';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';

const FollowUpUser = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [followUpUsers, setFollowUpUsers] = useState('')
    const history = useHistory();
    const toast = useToast();
    // const openModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);
    const viewUsers = (data) => {
        // /admin/dashboard/view-users
        sessionStorage.setItem('selectedUser', JSON.stringify(data));
        history.push(`/admin/dashboard/view-users`)
    }
    const addUser = () => {

        history.push(`/admin/dashboard/add-user`)

    }
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        api.get('/follow-up-user').then((res) => {
            setFollowUpUsers(res.data)
        }).catch((err) => {
            showErrorToast(toast, err);
        });
    }
    const updateUser = (data) => {
        sessionStorage.setItem('UserDetailsUpdate', JSON.stringify(data));
        history.push(`/admin/dashboard/update-user`)
    }
    const deleteUser = (data)=>{
        sessionStorage.setItem('UserDetailsUpdate', JSON.stringify(data));
        const API_ENDPOINT = '/follow-up-user/'+ data._id
        api.delete(API_ENDPOINT).then((res) => {
            getUsers()
            toast({
                title: 'User deleted',
                description: 'User deleted sucessfully',
                status: 'success',
                duration: 3000,
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
                <button className="add-user-btn" onClick={addUser}>
                    Add Users
                </button>
            </div>
            <div className="user-warpper" id="sub-category">
                <Table variant="striped" colorScheme="purple" className="sub-category-table">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Gender</Th>
                            <Th>Experience</Th>
                            <Th>Phone Number</Th>
                            <Th>Matching Jobs Count</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>


                        {followUpUsers.length > 0 ? (
                            followUpUsers.map(data => (
                                <Tr key={data._id} >
                                    <Td>{data.name}</Td>
                                    <Td>{data.gender}</Td>
                                    <Td>{data.experience}</Td>
                                    <Td>{data.phoneNumber}</Td>
                                    <Td>{data.matchingJobs.length}</Td>
                                    <Td className='action-button'>
                                        <Button onClick={() => viewUsers(data)}>View Matching Jobs</Button>
                                        <Button onClick={() => updateUser(data)}>Edit</Button>
                                        <Button onClick={() => deleteUser(data)}>Delete</Button>

                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="7" style={{ textAlign: 'center' }}>
                                    No users available
                                </Td>
                            </Tr>
                        )}




                    </Tbody>
                </Table>
            </div>
            {/* <AddUserModal isOpen={isModalOpen} closeModal={closeModal}>
                <h2>This is a dialog box!</h2>
                <p>You can add any content here.</p>
            </AddUserModal> */}
        </div>
    );
};

export default FollowUpUser;
