import React, { useEffect, useState } from 'react';

import './style.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../../helpers/axios';
import { useRhinoState } from '../../context';
// import DeleteJob from '../../utilities/DeleteJob';
import { useToast, Tag, TagLabel } from '@chakra-ui/react';
import {
  IoLocationSharp,
} from 'react-icons/io5';
import {
  FcOrganization,
  FcAssistant,
  FcInspection,
  FcCustomerSupport,
} from 'react-icons/fc';
import Approve from './Approve';
import Loading from '../../utilities/Loading';
import Button from '../../utilities/Button';
import { showErrorToast } from '../../../helpers/errorToast';
import { getDateFromNow } from '../../../helpers/dateDifference';
import { FiCopy } from 'react-icons/fi';

const JobDetails = ({ url, approved }) => {
  const [user] = useRhinoState('user');
  const { id } = useParams();

  const [job, setJob] = useState({});

  const history = useHistory();

  const toast = useToast();
  const [jobCategories,setJobCategories] = useState([])
  const [jobCatogory,setJobCategoy] = useState('')
  // const { isOpen, onOpen, onClose } = useDisclosure();

  /* const deleteJob = () => {
    onOpen();
  }; */
  const expired = new Date(job.expires_on) < new Date();
  const validity = getDateFromNow(new Date(job.expires_on));
  const onEditButtonClick = () => {
    history.push(`${url}/edit/${id}`);
  };
  /*eslint-disable */
  useEffect(() => {
    api
      .get(`/${user.user_type}/job/${id}`)
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  }, [id]);

  
  useEffect(() => {
    api
      .get(`/job-category?include_hidden=false&sub_category=true`)
      .then((res) => {
        setJobCategories(res.data.job_categories);
        // console.log(res.data.job_categories)
        // const jobCat = res.data.job_categories.filter(x=> x.id === job.job_category )
        // console.log(job.job_category,jobCat[0].name)
        // setJobCategoy(jobCat[0].name)
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  },[])
  useEffect(() => {
    const jobCat = jobCategories.filter(x=> x.id === job.job_category )
    console.log(jobCategories)
    setJobCategoy(jobCat[0]?.name)
  },[job.job_category,jobCategories])

  const funOnCopyBtnClick = async () => {
    try {
      let data = `Hi,\n\nAs part of our telephonic conversation, the job vacancy in your organization is advertised on our portal for free.\n\nJob Posted On : ${new Date(
        job.approved_on
      ).toLocaleString()}\nTelecaller Name : ${job.telecallerName? job.telecallerName : ''}\nVacancy given by : ${
        job.contact_person.mobile_number
      }\nPortal : Yes\nPlacement : ${
        job?.flags?.placement ? 'Yes' : 'No'
      }\n\nWe request you to inform when the vacancy is filled.\n\nThanks & Regards\nJ4JOLI.COM\nKERALA'S JOB PORTAL\nAny Complaints? Contact +919895205746\n\nOur Services\n✅️OFFICE WORKS ✅️ACCOUNTS ✅️CIVIL ✅️SOFTWARE ✅️TECHNICIAN ✅️DESIGNER ✅️HOSPITAL ✅️HOTEL ✅️HELPER ✅️MECHANICAL ✅️SALES & MARKETING ✅️DRIVER ✅️HELPER ✅️SECURITY ✅️HOUSEKEEPING`;
      await navigator.clipboard.writeText(data);
      toast({
        title: 'Success',
        description: 'Content copied to Clipboard',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed',
        description: 'Could not copy details to clipboard',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }
  };
  /* eslint-enable */
  if (Object.keys(job).length === 0 && job.constructor === Object) {
    return <Loading />;
  } else {
    return (
      <div className="job-details">
        <div className="validity">
          <Tag
            size="lg"
            borderRadius="full"
            variant="solid"
            colorScheme={expired ? 'red' : 'green'}
            className="tags"
          >
            <TagLabel>
              {expired
                ? 'Expired'
                : validity === 1
                ? 'Expires Today'
                : `Expires in : ${validity} days`}{' '}
            </TagLabel>
          </Tag>
          {job.flags !== undefined ? (
            job.flags.renewed !== undefined && job.flags.renewed === true ? (
              <Tag
                size="lg"
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
                className="tags"
              >
                <TagLabel>Renewed</TagLabel>
              </Tag>
            ) : null
          ) : null}
        </div>
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
                  <div>{jobCatogory}</div>
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
                <div> {job.location.name} </div>
              </div>
            </div>
            {job.telecallerName && job.jobSource ? (
              <div className="container">
                <h5>
                  <FcCustomerSupport className="icon" />
                  Other Details
                </h5>
                <div className="sub-container">
                  <div className="label">Telecaller Name</div>
                  <div>{job.telecallerName}</div>
                </div>
                <div className="sub-container">
                  <div className="label">Job Source</div>
                  <div>{job.jobSource}</div>
                </div>
                {job?.notes ? (
                  <div className="sub-container">
                    <div className="label">Notes</div>
                    <div>{job.notes}</div>
                  </div>
                ) : null}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="button-container">
          {user.user_type === 'admin' && approved !== true ? (
            <Approve id={id} job={job} url={url} className="button" goBack={true} />
          ) : (
            ''
          )}
          <Button onClick={onEditButtonClick} className="button">
            Edit / Delete{' '}
            {expired && user.user_type === 'admin' && approved === true ? '/ Renew' : null}
          </Button>
          <Button onClick={funOnCopyBtnClick}>
            <FiCopy className="icon" /> Copy Acknowledgment Mail Content
          </Button>
          {/* <Button onClick={deleteJob} className="button">
            Delete
          </Button>
          <DeleteJob isOpen={isOpen} onClose={onClose} id={id} url={url} /> */}
        </div>
      </div>
    );
  }
};

export default JobDetails;
