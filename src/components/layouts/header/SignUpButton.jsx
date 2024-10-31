import { useHistory } from 'react-router-dom';

const SignUpButton = ({ closeNav }) => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/job-seeker');
    closeNav();
  };

  return (
    <>
      <button className="sign-in-btn" onClick={handleLoginClick}>
        Sign Up
      </button>
    </>
  );
};

export default SignUpButton;
