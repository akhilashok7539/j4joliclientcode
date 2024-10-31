import React, { useState, useEffect } from 'react';
import './style.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import OtpInput from 'react-otp-input';

const VerifyOtp = ({ isOpen, onClose, otp, setOtp, reSendOtp, verifyOtp, otpError }) => {
  // State to set countdown on each resend
  const [counter, setCounter] = useState(30);

  // Decrementing the countdown each second
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // Function to reset counter and resend OTP
  const resetCounter = () => {
    if (counter === 0) {
      setCounter(30);
      reSendOtp();
    }
  };

  return (
    <Modal isOpen={isOpen} size="lg" onClose={onClose} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Enter your OTP </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="otp-input-wrapper">
            <OtpInput
              shouldAutoFocus
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span>-</span>}
              isInputNum={true}
              hasErrored={otpError}
              errorStyle="error"
              inputStyle="otp-input"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={counter !== 0}
            loadingText={counter}
            variant="outline"
            onClick={resetCounter}
            size="md"
            height="48px"
            width="150px"
            border="2px"
            mr="1rem"
          >
            Resend
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={verifyOtp}
            isDisabled={!(otp.length === 6)}
            size="md"
            height="48px"
            width="150px"
            border="2px"
          >
            Verify
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerifyOtp;
