import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {
  Popover,
  Tag,
  TagLabel,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Badge,
  Stack,
} from '@chakra-ui/react';
import { IoMdCreate } from 'react-icons/io';
import { FiMapPin, FiDollarSign, FiFileText, FiInfo } from 'react-icons/fi';
// import DeleteJob from './DeleteJob';
import CheckBoxInput from '../../utilities/CheckBoxInput';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import { useToast } from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import CopyJobDetails from '../../utilities/CopyJobDetails';
import JobBadge from '../JobBadge';

const JobCard = ({ job, url, getJobs, isAdmin = false }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  /* const deleteJob = () => {
    onOpen();
  }; */

  const toast = useToast();

  const [DM, setDM] = useState(job?.flags?.digital_marketing);

  const funOnCheck = (e) => {
    api
      .post('admin/update-dm-flag', {
        value: e.target.checked,
        id: job._id,
      })
      .then((res) => {
        setDM(res.data.value);
        toast({
          title: 'Success',
          description: res.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  };

  return (
    <div className="job-card">
      <h4 className="title">
        {job.title} {job.job_no ? '- [' + job.job_no + ']' : ''}
      </h4>
      <div className="row">
        <small className="created-date">
          Created at {new Date(job.approved_on).toDateString()}
        </small>
      </div>
      <div>
        {isAdmin && job?.flags?.renewed ? (
          <div className="row">
            <Tag borderRadius="full" variant="solid" colorScheme="blue">
              <TagLabel>Renewed</TagLabel>
            </Tag>
          </div>
        ) : null}
        <Stack direction="row">
          <JobBadge flags={job?.flags} />
          {job.is_hidden ? <Badge>Hidden</Badge> : null}
        </Stack>
      </div>
      <div className="row">
        <div className="district">
          <div className="label">District</div>
          <div className="text">{job.district}</div>
        </div>
        <div className="salary">
          <div className="label">
            <FiDollarSign className="icon" />
            Salary
          </div>
          <div className="text"> {job.salary} </div>
        </div>
      </div>
      <div className="location">
        <div className="label">
          <FiMapPin className="icon" /> Location
        </div>
        <div className="text">{job.location.name}</div>
      </div>
      <div className="description">
        <div className="label">
          <FiFileText className="icon" /> Description
        </div>
        <div className="text">{job.description}</div>
      </div>
      <div className="row">
        {isAdmin ? <CheckBoxInput text="DM" onChange={funOnCheck} isChecked={DM} /> : null}
        {isAdmin ? (
          <div>
            <div className="icon-container">
              {job?.flags?.placement ? <FaCheck className="icon" /> : <FaTimes className="icon" />}
            </div>
            Placement
          </div>
        ) : null}
      </div>
      <div className="card-btn-container">
        <Link to={`${url}/details/${job._id}`} className="more-btn">
          More Info
        </Link>
        {isAdmin ? (
          <Link to={`${url}/edit/${job._id}`} className="edit-btn">
            <IoMdCreate className="icon" />
          </Link>
        ) : null}
        {isAdmin ? <CopyJobDetails job={job} /> : null}
        {isAdmin && job?.notes ? (
          <Popover isLazy>
            <PopoverTrigger>
              <Button ml={4} colorScheme="blue" leftIcon={<FiInfo />}>
                Notes
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Notes</PopoverHeader>
              <PopoverBody>{job.notes}</PopoverBody>
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
    </div>
  );
};

export default JobCard;
