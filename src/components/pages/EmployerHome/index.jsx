import './style.css';
import { useHistory } from 'react-router-dom';
import img from '../../../images/employer-hero-img.svg';
import Blob1 from '../../../images/Blobs/blob1.svg';
import Blob2 from '../../../images/Blobs/blob2.svg';
import Blob3 from '../../../images/Blobs/blob3.svg';
import Blob4 from '../../../images/Blobs/blob4.svg';

const EmployerHome = () => {
  const history = useHistory();

  const goToEmployerRegister = () => {
    history.push('/employer/register');
  };
  const goToEmployerLogin = () => {
    history.push('/employer/login');
  };

  return (
    <div className="employer-home">
      <section className="section hero-section">
        <div className="content-container">
          <h2 className="main-heading">Built Your Dream With the Best Employees </h2>
          <p>
            J4JOLI offers a portal to post your Job Vacancies to build your Dream team. Hurry up &
            Register Now for Free.
          </p>
          <div className="btn-container">
            <button className="btn register-btn" onClick={goToEmployerRegister}>
              Register
            </button>
            <button className="btn login-btn" onClick={goToEmployerLogin}>
              Login
            </button>
          </div>
        </div>
        <img src={img} alt="hero illustration" className="hero-image" />
        <img src={Blob1} alt="blob1" className="blob blob-1" />
        <img src={Blob2} alt="blob2" className="blob blob-2" />
        <img src={Blob3} alt="blob3" className="blob blob-3" />
        <img src={Blob4} alt="blob4" className="blob blob-4" />
      </section>
    </div>
  );
};

export default EmployerHome;
