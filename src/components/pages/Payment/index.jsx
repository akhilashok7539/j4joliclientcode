import './style.css';
import InitiatePayment from './InitiatePayment';
import img from '../../../images/payment.svg';

const Payment = ({ getValidity }) => {
  return (
    <div className="payment-wrapper">
      <div className="welcome-section">
        <img src={img} alt="searching for illustration" />
        <div className="welcome-text">
          <h3>Pay to get Job updates</h3>
          <p>Job provider details included, you can also directly call the job provider</p>
          <p>You need to pay an amount &#8377; 499 (including GST)</p>
          <p>
            Every payment will add <strong>180 days</strong> validity to your account
          </p>
        </div>
        <InitiatePayment
          className="payment-button"
          getValidity={getValidity}
          buttonText="Make Payment"
        />
      </div>
    </div>
  );
};

export default Payment;
