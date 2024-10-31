import './style.css';
import img from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';
import {
 
  FiPhone,
  FiMail,
 
} from 'react-icons/fi';

import {AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="column first-column">
          <div className="logo-container">
            <img src={img} alt="logo" />
            <h4>J4JOLI</h4>
          </div>
          <HashLink smooth className="link" to="/policies/#privacy-policy">
            Privacy Policy
          </HashLink>
          <HashLink smooth className="link" to="/policies/#refund-policy">
            Refund Policy
          </HashLink>
          <HashLink smooth className="link" to="/policies/#terms">
            Terms and conditions
          </HashLink>
          <HashLink smooth to="/policies/#refund-policy" className="link">
            Services & Pricing
          </HashLink>
        </div>

        <div className="column second-column">
          <h4>Explore</h4>
          <Link to="/job-seeker" className="link">
            Job Seeker
          </Link>
          <Link to="/employer" className="link">
            Employer
          </Link>
          <HashLink smooth to="/#about" className="link">
            About Us
          </HashLink>
          <HashLink smooth to="/contact" className="link">
            Contact Us
          </HashLink>
        </div>

        <div className="column third-column">
          <h4>Contact</h4>
          <a href="tel:0484-4046187">
            <FiPhone className="icon" />
            0484-4046187
          </a>
          <a href="tel:04846162222">
            <FiPhone className="icon" />
            0484-6162222
          </a>
          <a href="mailto:jobs@j4joli.com">
            <FiMail className="icon" />
            jobs@j4joli.com
          </a>
        </div>

        <div className="column fourth-column">
          <h4>Follow Us</h4>
          <div className="social-media-links">
            <a href="https://www.facebook.com/J4joli/" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare className="icon" />
            </a>
            <a href="https://www.instagram.com/j4joli/" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/j4joli-kerala-948256209/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="icon" />
            </a>
            <a href="https://t.me/j4joli" target="_blank" rel="noopener noreferrer">
              <FaTelegram className="icon" />
            </a>
            <a href="https://wa.me/918157840476" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="separator"></div>
      <div className="bottom-text">
        <p>
          &#169; {new Date().getFullYear()} J4Joli All rights reserved | Developed by{' '}
          <a
            className="footer-link"
            href="https://pixenova.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixenova
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
