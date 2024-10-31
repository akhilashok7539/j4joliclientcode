import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';

const SocialMediaPopUp = ({ onClose, isOpen }) => {
  return (
    <Modal isCentered={true} closeOnOverlayClick={true} onClose={onClose} size="sm" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <div className="social-media-links">
            <a
              href="https://www.facebook.com/J4joli/"
              className="social-media-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook className="icon" />
            </a>
            <a
              href="https://www.instagram.com/j4joli/"
              className="social-media-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram className="icon" />
            </a>
            <a
              href="https://t.me/j4joli"
              className="social-media-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/j4joli-kerala-948256209/"
              className="social-media-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin className="icon" />
            </a>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SocialMediaPopUp;
