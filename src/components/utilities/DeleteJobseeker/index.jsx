import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PasswordInput from '../PasswordInput';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteJobseeker = ({ id, callbackOnDelete}) => {
  const { onClose } = useDisclosure();
  const [modalState, setModalState] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ password: '' });
  const [buttonLoading, setButtonLoading] = useState(false);

  const toast = useToast();

  const handleOnChange = (e) => {
    setPassword(e.target.value)
  }

  const validateInput = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMessage);
  }

  const openModal = () => {
    setPassword('');
    setModalState(true);
  };

  const actionOnClickDelete = () => {
    if(password !== '' && errorMessage.password === '') {
      setButtonLoading(true);
      api
        .post(`/admin/superAdminLogin`, {
          password: password
        })
        .then((res) => {
          const grantAccess = res.data.grantAccess;
          if(grantAccess) {
            deleteUser(id);
          } else {
            setButtonLoading(false);
            toast({
              title: 'Failed',
              description: 'Incorrect Password',
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err)
          console.log(err.message);
        })
    } else {
      showErrorMsg('password', password, setErrorMessage);
    }
  }

  //function delete account
  const deleteUser = async (id) => {
    const userID = id;
    try {
      await api.post('/admin/delete-jobseeker', { userID });
      toast({
        title: 'Success',
        description: 'The account has been deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setButtonLoading(false);
      setModalState(false);
      callbackOnDelete();
    } catch (err) {
      setButtonLoading(false);
      setModalState(false);
      showErrorToast(toast, err);
    }
  };
  
  return(
    <>
      <Button
        onClick={openModal}
        mt="2.4rem"
        colorScheme="red"
        isLoading={modalState}
      >
        <DeleteIcon mr={2} />
        Delete Account
      </Button>
      <div>
        <Modal isOpen={modalState} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Account</ModalHeader>
            <ModalBody>
            <p>Please enter Super Admin password to delete this user. This action is not reversible!</p>
              <PasswordInput 
                idName="password"
                isRequired={true}
                LabelName="Password"
                placeholder="Enter Super Admin Password"
                name="password"
                mt={4}
                value={password}
                onChange={handleOnChange}
                onBlur={validateInput}
                errorMsg={errorMessage.password}
                isInvalid={errorMessage.password === '' ? false : true}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={
                () => {
                  setModalState(false);
                }
              }>
                Close
              </Button>
              <Button colorScheme="primaryColor" onClick={actionOnClickDelete} isLoading={buttonLoading}>
                Confirm Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div> 
    </>
  )
}

export default DeleteJobseeker;