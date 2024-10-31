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
  Box,
} from '@chakra-ui/react';
import PasswordInput from '../PasswordInput';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { validatePhone } from '../../../helpers/validate';
import { TimeIcon } from '@chakra-ui/icons';
import NumInput from '../NumInput';

const UpdateValidity = ({ mobile, callbackOnValidityUpdate }) => {
  const { onClose } = useDisclosure();
  const [modalState, setModalState] = useState(false);
  const [password, setPassword] = useState('');
  const [validityDays, setValidityDays] = useState(1);
  const [errorMessage, setErrorMessage] = useState({ password: '', validityDays: '' });
  const [buttonLoading, setButtonLoading] = useState(false);

  const toast = useToast();

  const handleOnChange = (e) => {
    setPassword(e.target.value);
  };

  const validateInput = (e) => {
    showErrorMsg(e.target.name, e.target.value, setErrorMessage);
  };

  const openModal = () => {
    setPassword('');
    setModalState(true);
  };

  const actionOnClick = async () => {
    if (password !== '' && errorMessage.password === '') {
      setButtonLoading(true);
      api
        .post(`/admin/superAdminLogin`, {
          password: password,
        })
        .then((res) => {
          const grantAccess = res.data.grantAccess;
          if (grantAccess) {
            validityUpdate(mobile);
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
          showErrorToast(toast, err);
          console.log(err.message);
        });
    } else {
      showErrorMsg('password', password, setErrorMessage);
    }
  };

  const validityUpdate = async (number) => {
    if (validityDays < 1) {
      setErrorMessage({
        ...errorMessage,
        validityDays: 'The number of days must be larger than 1',
      });
      toast({
        title: 'Failed',
        description: 'The number of days must be larger than 1',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setButtonLoading(false);
      return false;
    } else {
      setErrorMessage({ ...errorMessage, validityDays: '' });
    }

    if (validatePhone(number, 'Mobile Number', true).result) {
      const days = Number(validityDays);
      api
        .put(`admin/job-seekers-details`, {
          validityDays: days,
          mobileNumber: number,
        })
        .then((res) => {
          toast({
            title: 'Success',
            description: res.data.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          setButtonLoading(false);
          setModalState(false);
          callbackOnValidityUpdate();
        })
        .catch((err) => {
          setButtonLoading(false);
          showErrorToast(toast, err);
        });
    } else {
      setButtonLoading(false);
      setModalState(false);
      toast({
        title: 'Failed',
        description: 'Incorrect Mobile Number',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={openModal} mt="2.4rem" colorScheme="blue" isLoading={modalState}>
        <TimeIcon mr={2} />
        Update Validity
      </Button>
      <div>
        <Modal isOpen={modalState} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Validity</ModalHeader>
            <ModalBody>
              <Box mb={4}>
                <NumInput
                  name="validityDays"
                  value={validityDays}
                  onChange={(val) => setValidityDays(val)}
                  LabelName="Validity in days"
                  isRequired={true}
                  placeholder="Enter the no. of days you need to add in validity"
                  errorMsg={errorMessage.validityDays}
                  isInvalid={errorMessage.validityDays === '' ? false : true}
                  onBlur={validateInput}
                  idName="validityDays"
                />
              </Box>
              <p>
                Please enter Super Admin password to update the validity of this user by{' '}
                {validityDays} days. This action is not reversible!
              </p>
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
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  setModalState(false);
                }}
              >
                Close
              </Button>
              <Button colorScheme="primaryColor" onClick={actionOnClick} isLoading={buttonLoading}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default UpdateValidity;
