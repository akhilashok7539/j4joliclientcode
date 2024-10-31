import './style.css';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

import Nav from './nav';

const Header = () => {
  return (
    <header className="header">
      <div className="contact">
        <div className="phone-no-container">
          <a href="tel:04846162222" className="phone-no">
            <FiPhone className="icon" />
            &nbsp; 0484-6162222
          </a>
          <a href="tel:04844046187" className="phone-no">
            <FiPhone className="icon" />
            &nbsp; 0484-4046187
          </a>
        </div>
        <a href="mailto:jobs@j4joli.com" className="email">
          <HiOutlineMail className="icon" />
          &nbsp; Jobs@j4joli.com
        </a>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
