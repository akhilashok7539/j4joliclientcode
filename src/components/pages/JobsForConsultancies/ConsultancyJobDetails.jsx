import React, { useEffect, useState } from 'react';

import './jobDetailStyle.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import api from '../../../helpers/axios';
import { useRhinoState } from '../../context';
import { useToast } from '@chakra-ui/react';
import { FcOrganization, FcAssistant, FcInspection } from 'react-icons/fc';
import {  IoLocationSharp } from 'react-icons/io5';

import Loading from '../../utilities/Loading';
import { showErrorToast } from '../../../helpers/errorToast';

const ConsultancyJobDetails = () => {
  const [user] = useRhinoState('user');
  const { id } = useParams();

  const [job, setJob] = useState({});

  const toast = useToast();

  // const { isOpen, onOpen, onClose } = useDisclosure();

  /* const deleteJob = () => {
    onOpen();
  }; */
  /*eslint-disable */
  useEffect(() => {
    api
      .get(`/employer/get-job-details-for-consultancy/${id}`)
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  }, [id]);

  /* eslint-enable */
  if (Object.keys(job).length === 0 && job.constructor === Object) {
    return <Loading />;
  } else {
    return (
      <div className="job-details">
        <div className="row">
          <div className="column">
            <div className="container">
              <div className="title">
                <h5>
                  {job.title} {job.job_no ? '- [' + job.job_no + ']' : ''}
                </h5>
              </div>

              {user.user_type !== 'job-seeker' ? (
                <div className="sub-container">
                  <div className="label">Job Category</div>
                  <div>{job.job_category}</div>
                </div>
              ) : null}

              <div className="sub-container">
                <div className="label">Description</div>
                <div>{job.description}</div>
              </div>
            </div>
            <div className="container">
              <h5>
                <FcOrganization className="icon" />
                Company Address
              </h5>
              <div className="sub-container">
                <div className="label">Company Name</div>
                <div>{job.company_address.name}</div>
              </div>
              <div className="sub-container">
                <div className="label">City and District</div>
                <div>{job.company_address.city}</div>
              </div>
              <div className="sub-container">
                <div className="label">State</div>
                <div>{job.company_address.state}</div>
              </div>
              <div className="sub-container">
                <div className="label">Pin code</div>
                <div>{job.company_address.zip}</div>
              </div>
            </div>

            <div className="container">
              <h5>
                <FcAssistant className="icon" />
                Contact Details
              </h5>
              <div className="sub-container">
                <div className="label">Name</div>
                <div>{job.contact_person.name}</div>
              </div>
              {job.contact_person.email_id ? (
                <div className="sub-container">
                  <div className="label">Email id</div>
                  <a href={`mailto:${job.contact_person.email_id}`}>
                    {job.contact_person.email_id}
                  </a>
                </div>
              ) : null}
              <div className="sub-container">
                <div className="label">Phone Number</div>
                <a href={`tel:+91${job.contact_person.mobile_number}`}>
                  {job.contact_person.mobile_number}
                </a>
              </div>
              {job.contact_person.whatsapp_number ? (
                <div className="sub-container">
                  <div className="label">Whatsapp Number</div>
                  <a href={`tel:+91${job.contact_person.whatsapp_number}`}>
                    {job.contact_person.whatsapp_number}
                  </a>
                </div>
              ) : null}
              {job.preferred_contact_medium !== undefined ? (
                <div className="sub-container">
                  <label>Preferred Contact Medium</label>
                  <div className="gender-container">
                    <div className="preferred-gender">
                      <div className="icon-container">
                        {job.preferred_contact_medium.byCall &&
                        job.preferred_contact_medium.byCall !== undefined ? (
                          <FaCheck className="icon" />
                        ) : (
                          <FaTimes className="icon" />
                        )}
                      </div>
                      By Call
                    </div>
                    <div className="preferred-gender">
                      <div className="icon-container">
                        {job.preferred_contact_medium.byEmail ? (
                          <FaCheck className="icon" />
                        ) : (
                          <FaTimes className="icon" />
                        )}
                      </div>
                      By Email
                    </div>
                    <div className="preferred-gender">
                      <div className="icon-container">
                        {job.preferred_contact_medium.byWhatsapp ? (
                          <FaCheck className="icon" />
                        ) : (
                          <FaTimes className="icon" />
                        )}
                      </div>
                      By Whatsapp
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="column">
            <div className="container">
              <h5>
                <FcInspection className="icon" />
                Job Requirements
              </h5>
              <div className="sub-container">
                <div className="label">Salary</div>
                <div>{job.salary}</div>
              </div>
              <div className="sub-container">
                <div className="label">Working time</div>
                <div>{job.working_time}</div>
              </div>
              <div className="sub-container">
                <div className="label">Experience Details</div>
                <div>{job.experience_required}</div>
              </div>
              <div className="sub-container">
                <div className="label">Number of vacancies</div>
                <div>{job.number_of_vacancies}</div>
              </div>
              <div className="sub-container">
                <label>Preferred Gender</label>
                <div className="gender-container">
                  <div className="preferred-gender">
                    <div className="icon-container">
                      {job.preferred_gender.male ? (
                        <FaCheck className="icon" />
                      ) : (
                        <FaTimes className="icon" />
                      )}
                    </div>
                    Male
                  </div>
                  <div className="preferred-gender">
                    <div className="icon-container">
                      {job.preferred_gender.female ? (
                        <FaCheck className="icon" />
                      ) : (
                        <FaTimes className="icon" />
                      )}
                    </div>
                    Female
                  </div>
                  <div className="preferred-gender">
                    <div className="icon-container">
                      {job.preferred_gender.others ? (
                        <FaCheck className="icon" />
                      ) : (
                        <FaTimes className="icon" />
                      )}
                    </div>
                    Others
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <h5>
                <IoLocationSharp className="icon" color="#1565C0" />
                Job Location
              </h5>
              <div className="sub-container">
                <div className="label">District</div>
                <div>{job.district}</div>
              </div>
              <div className="sub-container">
                <div className="label">Location</div>
                <div> {job.location?.name} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ConsultancyJobDetails;
