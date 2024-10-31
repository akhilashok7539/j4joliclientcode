/* 
  Including this component in any page locks it as password protected staff admin use only feature
*/

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
import { UnlockIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import PasswordInput from '../PasswordInput';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { showErrorMsg } from '../../../helpers/showErrorMsg';

const StaffAdminLogin = () => {
  const { onClose } = useDisclosure();
  const [modalState, setModalState] = useState(true);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ password: '' });
  const [buttonLoading, setButtonLoading] = useState(false);

  const history = useHistory();
  const toast = useToast();

  const handleUnlockClick = () => {
    if (password !== '' && errorMessage.password === '') {
      setButtonLoading(true);
      api
        .post(`/admin/staffAdminLogin`, {
          password: password,
        })
        .then((res) => {
          setButtonLoading(false);
          const grantAccess = res.data.grantAccess;
          if (grantAccess) {
            setModalState(false);
          } else {
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
          showErrorToast(toast, err);
        });
    } else {
      showErrorMsg('password', password, setErrorMessage);
    }
  };

  const handleOnCancel = () => {
    history.push('/admin/dashboard/approved-jobs/1'); //Redirecting to default admin page
  };

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  const validateInput = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMessage);
  };
  return (
    <>
      <Modal isOpen={modalState} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Locked Feature</ModalHeader>
          <ModalBody>
            You are trying to enter a Staff Admin only feature, please enter the Staff Admin
            password to use this feature or press Cancel
            <PasswordInput
              idName="password"
              isRequired={true}
              LabelName="Password"
              placeholder="Enter Staff Admin Password"
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
            <Button colorScheme="red" mr={3} onClick={handleOnCancel}>
              Cancel
            </Button>
            <Button
              colorScheme="primaryColor"
              onClick={handleUnlockClick}
              isLoading={buttonLoading}
            >
              <UnlockIcon mr={2} />
              Unlock
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StaffAdminLogin;
