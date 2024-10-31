
import { useHistory } from 'react-router-dom';

const LoginButton = ({ closeNav }) => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/job-seeker/login');
    closeNav();
  };

  return (
    <>
      <button className="login-btn" onClick={handleLoginClick}>
        Login
      </button>
    </>
  );
};

export default LoginButton;
