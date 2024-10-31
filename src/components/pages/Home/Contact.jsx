import './style.css';
import contactPhoneImg from '../../../images/contact-phone-image.svg';
import contactSystemImg from '../../../images/contact-system-image.svg';

const Contact = () => {
  return (
    <div id="contact" className="contact-section">
      <div className="contact-header">
        <h3>Get In Touch</h3>
        <p>
          We provide services all across kerala. If you have any questions or doubts regarding our
          services, we'd like to hear from you.
        </p>
      </div>
      <div className="contact-details">
      <div className="phone-number-container">
          <h5>Technical Support</h5>
          <a className="phone-number" href="tel:04844046187">
            0484-4046187
          </a>
        </div>
        
        <div className="email-container">
          <h5>Email</h5>
          <a href="mailto:jobs@j4joli.com" className="email">
            jobs@j4joli.com
          </a>
        </div>
        <div className="phone-number-container">
          <h5>Customer Care</h5>
          <a className="phone-number" href="tel:04846162222">
            0484-6162222
          </a>
        </div>
      </div>
      <img src={contactPhoneImg} className="contact-img contact-phone-img" alt="" />
      <img src={contactSystemImg} className="contact-img contact-system-img" alt="" />
    </div>
  );
};

export default Contact;
