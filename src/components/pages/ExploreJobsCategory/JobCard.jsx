import './jobcard.css';
import { Link } from 'react-router-dom';
import { MdAttachMoney,  MdAccessTime,  } from 'react-icons/md';
import { BiDetail,BiPhone } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';


const JobCard = ({ url, job, job_category }) => {
  return (
    <div className="job-card">
      <h4 className="title">
        {job.title} {job.job_no ? '- [' + job.job_no + ']' : ''}
      </h4>
      <div className="row">
        <div className="district">
          <div className="label">
            <IoLocationOutline className="icon" /> District
          </div>
          <div className="text">{job.district}</div>
        </div>
        <div className="salary">
          <div className="label">
            <MdAttachMoney className="icon" />
            Salary
          </div>
          <div className="text"> As per industrial standard </div>
        </div>
      </div>
      <div className="row">
        <div className="working-time">
          <div className="label">
            <MdAccessTime className="icon" /> Working Time
          </div>
          <div className="text">{job.working_time}</div>
        </div>
        <div className="contact">
          <div className="label">
            <BiPhone className="icon" />
            Customer Care / Whatsapp No.
          </div>
          <div className="text">
            <a href="tel:+04846162222">04846162222</a> /{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/918157840476">
              8157840476
            </a>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="label">
          <BiDetail className="icon" /> Description
        </div>
        <div className="text">{job.description}</div>
      </div>

      <div className="card-btn-container">
        <Link to={`/job-seeker/register/${job_category}`} className="more-btn">
          More Info
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
