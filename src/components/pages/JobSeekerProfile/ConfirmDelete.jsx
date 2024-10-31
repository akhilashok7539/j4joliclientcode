import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import Button from '../../utilities/Button';
import PasswordInput from '../../utilities/PasswordInput';
import { validatePassword } from '../../../helpers/validate';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { useHistory } from 'react-router-dom';
import { useRhinoState } from '../../context';

const ConfirmDelete = ({ isOpen, onClose }) => {
  //variable to check validity
  let formValidity = true;

  //to to chakra ui toast
  const toast = useToast();

  //state to set password
  const [password, setPassword] = useState('');

  //state to set error for password
  const [PasswordError, setPasswordError] = useState('');

  //for using global state
  /* eslint-disable */
  const [user, setUser] = useRhinoState('user');
  /* eslint-enable */

  //function to update password
  const upDatePassword = (e) => {
    setPassword(e.target.value);
  };
  // React Router dom useHistory to Redirect to home
  const history = useHistory();

  //function delete account
  const deleteAccount = () => {
    //to check password is valid or not
    let result = validatePassword(password, 'password', true);
    setPasswordError(result.msg);
    if (password === '') formValidity = false;
    if (PasswordError !== '') formValidity = false;
    if (formValidity) {
      deleteUser();
    }
  };
  //function for api call
  const deleteUser = async () => {
    try {
      await api.post('/job-seeker/delete', { password: password });
      toast({
        title: 'Success',
        description: 'Your account has been deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setUser({ is_user_logged_in: false });
      history.push('/');
    } catch (err) {
      showErrorToast(toast, err);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Please Confirm your password</p>
            <PasswordInput
              idName="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={upDatePassword}
              isInvalid={PasswordError !== ''}
              errorMsg={PasswordError}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={deleteAccount}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmDelete;
