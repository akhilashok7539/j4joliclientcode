import './MatchingJobs.css';
import React, { useEffect, useState } from 'react';
import {

  Tag,
  TagLabel,
} from '@chakra-ui/react';
// import { IoMdCreate } from 'react-icons/io';
// import CheckBoxInput from '../../utilities/CheckBoxInput';
// import api from '../../../helpers/axios';
// import { showErrorToast } from '../../../helpers/errorToast';
// import { useToast } from '@chakra-ui/react';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import CopyJobDetails from '../../utilities/CopyJobDetails';
// import JobBadge from '../JobBadge';
import { FiMapPin, FiDollarSign, FiFileText } from 'react-icons/fi';
import api from '../../../helpers/axios';

const MatchingJobs = () => {
  const [matchingJobsList, setMatchingJobs] = useState([])
  useEffect(() => {

    getUserList()
  }, [])

  const getUserList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem("selectedUser"))
    const ENDPOINT = 'follow-up-user/matching-job/' + userDetails._id + '/Pending'
    api.get(ENDPOINT).then((res) => {
      setMatchingJobs(res.data)
    }).catch((err) => {
      console.log("error", err)
    });
  }


  const informJobs = (job) => {
    // const userDetails = JSON.parse(sessionStorage.getItem("selectedUser"))
    const ENDPOINT = 'follow-up-user/matching-job/' + job._id + '/Informed'
    api.patch(ENDPOINT).then((res) => {
      getUserList()
    }).catch((err) => {
      console.log("error", err)
    });
  }
  return (
    <div className="job-list">

      {matchingJobsList.length === 0 ? ( // Check if the length is 0
        <p>No jobs found !</p>
      ) : (

        matchingJobsList.map((job) => (
          <div className="job-card" key={job.id}> {/* Assuming job has a unique id */}
            <h4 className="title">{job.job.title}</h4> {/* Use job.title or relevant property */}
            <div className="row">
              <small className="created-date">Created at {new Date(job.job.approved_on).toLocaleDateString()}</small>
            </div>
            <div>
              <div className="row">
                {job.job?.flags?.renewed ? (
                  <div className="row">
                    <Tag borderRadius="full" variant="solid" colorScheme="blue">
                      <TagLabel>Renewed</TagLabel>
                    </Tag>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="district">
                <div className="label">District</div>
                <div className="text">{job.job.district}</div> {/* Use job.district or relevant property */}
              </div>
              <div className="salary">
                <div className="label">
                  <FiDollarSign className="icon" />
                  Salary
                </div>
                <div className="text">{job.job.salary}</div> {/* Use job.salary or relevant property */}
              </div>
            </div>
            <div className="location">
              <div className="label">
                <FiMapPin className="icon" /> Location
              </div>
              <div className="text">{job.job.location.name}</div> {/* Use job.location or relevant property */}
            </div>
            <div className="description">
              <div className="label">
                <FiFileText className="icon" /> Description
              </div>
              <div className="text">{job.job.description}</div> {/* Use job.description or relevant property */}
            </div>
            <div className="card-btn-container">
              <button className='informButton' onClick={() => informJobs(job)}>Inform</button>
            </div>
          </div>
        ))


      )}
    </div>
  )
}

export default MatchingJobs