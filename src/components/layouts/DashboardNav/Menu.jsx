import { Menu, MenuButton, MenuList, MenuItem, useDisclosure } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SocialMediaPopUp from './SocialMediaPopUp';

const HeaderMenu = ({ installable, handleInstallClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePopUpClick = () => {
    onOpen();
  };
  return (
    <>
      <Menu>
        <MenuButton>
          <FiMoreVertical className="more-icon" />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link to="/about" className="menu-item">
              About Us
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact" className="menu-item">
              Contact Us
            </Link>
          </MenuItem>
          <MenuItem>
            <a href="https://g.co/kgs/56pLac" target="_blank" rel="noopener noreferrer" className="menu-item">
              Rate Us
            </a>
          </MenuItem>
          <MenuItem>
            <div onClick={handlePopUpClick} className="menu-item">
              Social Media
            </div>
          </MenuItem>
          {installable && (
            <MenuItem>
              <div onClick={handleInstallClick} className="menu-item">
                Install
              </div>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <SocialMediaPopUp isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default HeaderMenu;
