import React from 'react'; // Add React here
import { NavLink } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import Logout from '../../utilities/Logout';
import { FiLogOut } from 'react-icons/fi';

const Nav = ({ user, navList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("navList")
  return (
    <nav className="dashboard-nav-list">
      {React.Children.toArray(
        navList.map((data) => (
          <NavLink to={data.url} className="nav-link" activeClassName="active-link" key={data.url}> {/* Add key prop */}
            <div className="icon">{data.icon}</div>
            <div className="text">{data.name}</div>
          </NavLink>
        ))
      )}
      <button
        onClick={(e) => {
          onOpen();
        }}
        className="nav-link"
      >
        <div className="icon">
          <FiLogOut />
        </div>
        <div className="text">LogOut</div>
      </button>
      <Logout user={user} isOpen={isOpen} onClose={onClose} />
    </nav>
  );
};

export default Nav;
