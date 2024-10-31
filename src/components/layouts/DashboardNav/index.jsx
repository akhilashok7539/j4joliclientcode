import img from '../../../images/logo.png';
import Nav from './Nav';
import reviewImage from '../../../images/review.svg';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa';
import './style.css';

const DashboardNav = ({ user, navList }) => {
  return (
    <div className="dashboard-nav">
      <div className="logo-container">
        <img src={img} alt="logo" className="logo-img" />
        <div className="logo-text">
          <h4>J4JOLI</h4>
        </div>
      </div>
      <Nav navList={navList} user={user} />
      {user !== 'admin' ? (
        <div className="review-container">
          <img src={reviewImage} alt="Review Illustration" className="image" />
          <p>Please consider leaving us a review.</p>
          <a href="https://g.co/kgs/56pLac" target="_blank" rel="noopener noreferrer" className="review-btn">
            Rate Us
          </a>
          <div className="social-media-links">
            <a
              href="https://www.facebook.com/J4joli/"
              target="_blank"
              className="link"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare className="icon facebook" />
            </a>
            <a
              href="https://www.instagram.com/j4joli/"
              target="_blank"
              className="link"
              rel="noopener noreferrer"
            >
              <FaInstagram className="icon instagram" />
            </a>
            <a
              href="https://t.me/j4joli"
              target="_blank"
              className="link"
              rel="noopener noreferrer"
            >
              <FaTelegram className="icon telegram" />
            </a>
            <a
              href="https://www.linkedin.com/in/j4joli-kerala-948256209/"
              target="_blank"
              className="link"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="icon linked-in" />
            </a>

          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardNav;
