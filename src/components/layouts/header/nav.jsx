import React, { useState, useEffect } from 'react';

import img from '../../../images/logo.png';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';
import ExploreJobButton from './ExploreJobButton';

const Nav = () => {
  const [navVisible, setNavVisible] = useState(false);

  // Disable body scrolling when nav is active
  useEffect(() => {
    if (navVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [navVisible]);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  const closeNav = () => {
    setNavVisible(false);
  };

  return (
    <nav className="nav">
      <NavHashLink smooth to="/#" className="logo-container" onClick={closeNav}>
        <img src={img} alt="logo" className="logo-img" />
        <h4>J4JOLI</h4>
      </NavHashLink>
      <ul className={navVisible ? 'nav-list visible' : 'nav-list'}>
        <li className="list-item">
          <NavHashLink
            smooth
            to="/#"
            className="link"
            activeClassName="active-link"
            onClick={closeNav}
          >
            Home
          </NavHashLink>
        </li>

        <li className="list-item">
          <NavLink to="/employer" className="link" activeClassName="active-link" onClick={closeNav}>
            Employer / Post a Job
          </NavLink>
        </li>
        <li className="list-item">
          <NavHashLink
            smooth
            to="/#about"
            className="link"
            activeClassName="active-link"
            onClick={closeNav}
          >
            About Us
          </NavHashLink>
        </li>

        <li className="list-item">
          <NavHashLink
            smooth
            to="/contact"
            className="link"
            activeClassName="active-link"
            onClick={closeNav}
          >
            Contact Us
          </NavHashLink>
        </li>

        <div className="btns">
          <ExploreJobButton closeNav={closeNav} />
          <LoginButton closeNav={closeNav} />
          <SignUpButton closeNav={closeNav} />
        </div>
      </ul>

      <div className="menu-icon" onClick={toggleNav}>
        <FiMenu className="icon" />
      </div>
    </nav>
  );
};

export default Nav;
