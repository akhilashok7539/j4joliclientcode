import React, { useRef } from 'react';
import api from '../../../helpers/axios';
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
import { useHistory } from 'react-router-dom';
import { errorToast } from '../../../helpers/errorToast';
import { useRhinoState } from '../../context';
const DeleteJob = ({ isOpen, onClose, id, approved }) => {
  const cancelRef = useRef();

  const [user] = useRhinoState('user');

  const toast = useToast();

  const history = useHistory();

  const deleteJob = () => {
    api
      .delete(`/${user.user_type}/job/${id}`)
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Job successfully deleted',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        if(approved.approved) {
          history.push('/admin/dashboard/approved-jobs/1');
        } else {
          history.push('/admin/dashboard/reviewed-jobs/1');
        }
        onClose();
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          const { title, msg } = errorToast(err);
          toast({
            title: title,
            description: msg,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        } else if (err.request) {
          toast({
            title: 'Network Error.',
            description: 'Please check your network connection.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
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
          <AlertDialogHeader>Delete Job</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this job.It will be completely removed.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={deleteJob}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteJob;
