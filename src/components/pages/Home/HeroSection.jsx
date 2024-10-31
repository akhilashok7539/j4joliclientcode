import { useHistory } from 'react-router-dom';
import img from '../../../images/home-hero-img.svg';

const HeroSection = () => {
  const history = useHistory();

  const goToFindAJob = () => {
    history.push('/discover-jobs');
  };

  return (
    <section className="section hero-section">
      <div className="content-container">
        <h2 className="main-heading">Final Solution For Unemployment. </h2>
        <p>
          Know the job openings in any area across Kerala, You can contact the company directly.
        </p>
        <div className="btn-container">
          <button className="btn" onClick={goToFindAJob}>
            View Jobs
          </button>
        </div>
      </div>
      <img src={img} alt="search illustration" className="hero-image" />
    </section>
  );
};

export default HeroSection;
