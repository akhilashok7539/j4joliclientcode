import TermsAndCondition from './TermsAndCondition';
import PrivacyPolicy from './PrivacyPolicy';
import './style.css';

const Policies = () => {

  return (
    <div className="policy-wrapper">
      <TermsAndCondition />
      <hr className="hr"></hr>
      <PrivacyPolicy />
    </div>
  );
};

export default Policies;
