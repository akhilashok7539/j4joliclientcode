import React, { useRef } from 'react';
import api from '../../../helpers/axios';
import { useHistory } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { showErrorToast } from '../../../helpers/errorToast';
import { useRhinoState } from '../../context';
const Logout = ({ isOpen, onClose }) => {
  const cancelRef = useRef();

  const [user, setUser] = useRhinoState('user');

  const toast = useToast();

  const history = useHistory();

  const logout = () => {
    api
      .post(`/${user.user_type}/logout`)
      .then((res) => {
        toast({
          title: 'Success',
          description: 'You have successfully logged out ',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
        setUser({ is_user_logged_in: false });
        if (user.user_type === 'admin') {
          history.push('/admin');
        } else {
          history.push(`/${user.user_type}/login`);
        }
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  };
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Logout</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to Logout.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={logout}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Logout;
