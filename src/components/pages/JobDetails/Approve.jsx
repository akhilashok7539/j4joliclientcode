import React, { useState } from 'react';

import { useToast } from '@chakra-ui/react';
import { showErrorToast } from '../../../helpers/errorToast';
import Button from '../../utilities/Button';
import { useHistory } from 'react-router-dom';
import api from '../../../helpers/axios';
const Approve = ({ id, job, url, goBack }) => {
  const toast = useToast();

  const history = useHistory();

  // To set loading button active
  const [buttonLoading, setButtonLoading] = useState(false);

  const ApproveJob = () => {
    const jobDetails = {
      id: id,
      title: job.title,
      salary: job.salary,
      district: job.district,
      location: job.location,
      description: job.description,
      job_category: job.job_category,
      working_time: job.working_time,
      preferred_gender: job.preferred_gender,
      experience_required: job.experience_required,
      company_address: job.company_address,
      number_of_vacancies: parseInt(job.number_of_vacancies),
      contact_person: job.contact_person,
      preferred_contact_medium: job.preferred_contact_medium,
    };
    setButtonLoading(true);
    api
      .patch('/admin/job', jobDetails)
      .then((res) => {
        setButtonLoading(false);
        toast({
          title: 'Successfully Added',
          description: ' Your new job has been successfully added for review',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        if (goBack) {
          history.goBack();
        } else {
          history.push(`${url}`);
        }
      })
      .catch((err) => {
        setButtonLoading(false);
        showErrorToast(toast, err);
      });
  };

  return (
    <Button onClick={ApproveJob} isLoading={buttonLoading}>
      Approve
    </Button>
  );
};

export default Approve;
