
import './style.css';

import img from '../../../images/no-jobs.svg'
const NoJobs = () => {
  return (
    <div className="no-job">
      <img src={img} alt="no jobs" className="no-job-image"/>
      <h4>Jobs for this Category are currently Unavailable!</h4>
      <p>Please try again after some time.</p>
    </div>
  );
};

export default NoJobs;
