import './jobcard.css';
import { Link } from 'react-router-dom';
import { IoLocationOutline,  } from 'react-icons/io5';
import {  MdAttachMoney } from 'react-icons/md';
import {  BiDetail } from 'react-icons/bi';

import JobBadge from '../../utilities/JobBadge';

const JobCard = ({ url, job }) => {
  return (
    <div className="job-card">
      <h4 className="title">
        {job.title} {job.job_no ? '- [' + job.job_no + ']' : ''}
      </h4>
      <div>
        <JobBadge flags={job?.flags} />
      </div>
      <div className="row">
        <small className="created-date">
          Created at {new Date(job.approved_on).toDateString()}
        </small>
      </div>
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
          <div className="text"> {job.salary} </div>
        </div>
      </div>
      <div className="description">
        <div className="label">
          <BiDetail className="icon" /> Description
        </div>
        <div className="text">{job.description}</div>
      </div>
      <div className="card-btn-container">
        <Link to={`${url}/details/${job._id}`} className="more-btn">
          More Info
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
