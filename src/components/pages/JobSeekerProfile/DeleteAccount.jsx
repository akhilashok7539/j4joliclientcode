import Button from '../../utilities/Button';
import { FcFullTrash } from 'react-icons/fc';
import ConfirmDelete from './ConfirmDelete';
import { useDisclosure } from '@chakra-ui/react';

const DeleteAccount = () => {
  //to show chakra UI modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  //function to open chakra modal
  const openModel = () => {
    onOpen();
  };

  return (
    <div className="delete-account">
      <div className="delete-wrapper">
        <div className="delete-heading">
          <FcFullTrash className="icon" />
          <h4>Delete Your Account</h4>
        </div>
        <div className="para">
          <p>
            By deleting your account all of your data stored in the database will be permanently
            lost.
          </p>
          <p>Any remaining validity will be lost by performing this action </p>
        </div>
        <Button mt={6} colorScheme="red" onClick={openModel}>
          Delete My Account
        </Button>
        <ConfirmDelete isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default DeleteAccount;
