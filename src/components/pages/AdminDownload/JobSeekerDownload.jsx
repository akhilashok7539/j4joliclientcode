import React, { useState, useEffect } from 'react';
import DatePicker from '../../utilities/DatePicker';
import useForm from '../../../hooks/useForm';
import { useToast } from '@chakra-ui/react';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import api from '../../../helpers/axios';
import { jsonToCSV } from 'react-papaparse';
import { showErrorToast } from '../../../helpers/errorToast.js';
import SelectInput from '../../utilities/SelectInput';
import Button from '../../utilities/Button';
import SwitchChoice from '../../utilities/SwitchChoice';

const JobSeekerDownload = () => {
  let jobSeekers = [];
  const [values, onChange] = useForm({
    toDate: '',
    fromDate: '',
    job_category: 'All',
  });
  //state to store list job categories
  const [jobCategories, setJobCategories] = useState([]);

  // State to set error
  const [errorMsg, setErrorMsg] = useState({ toDate: '', fromDate: '', job_category: '' });

  //to display toast

  const toast = useToast();
  //state to set loading button
  const [loading, setLoading] = useState(false);

  // state to set default value for switch
  const [notPaid, setNotPaid] = useState(false);

  useEffect(() => {
    api
      .get('/job-category?include_hidden=true')
      .then((res) => {
        let jobCategoryArray = ['All'];
        for (let i = 0; i < res.data.job_categories.length; i++) {
          jobCategoryArray.push(res.data.job_categories[i].name);
        }

        setJobCategories([...jobCategoryArray]);
      })
      /* eslint-disable */
      .catch((err) => {
        toast({
          title: 'Failed to Process order',
          description: err.response.data.error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
    /* eslint-disable */
  }, []);

  // function get user details
  const getDetails = () => {
    let formValidity = true;
    showErrorMsg('toDate', new Date(values.toDate), setErrorMsg);
    showErrorMsg('fromDate', new Date(values.fromDate), setErrorMsg);
    if (values.toDate === '' || values.fromDate === '' || values.job_category === '')
      formValidity = false;
    if (errorMsg.toDate !== '' || errorMsg.fromDate !== '' || errorMsg.job_category !== '')
      formValidity = false;
    if (formValidity) {
      setLoading(true);
      let to_date = new Date(values.toDate).toISOString();
      let from_date = new Date(values.fromDate).toISOString();
      api
        .post(`/admin/job-seekers-details`, {
          to: to_date,
          from: from_date,
          job_category: values.job_category,
          not_paid: notPaid
        })
        .then((res) => {
          jobSeekers = res.data.jobSeekers;
          generateCsvFile();
        })
        .catch((err) => {
          showErrorToast(toast, err);
        });
    }
  };
  // to show error msg
  const validateInput = (e) => {
    showErrorMsg(e.target.name, new Date(e.target.value), setErrorMsg);
  };
  const generateCsvFile = async () => {
    const csv = await jsonToCSV(jobSeekers);
    setLoading(false);
    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    var csvURL = window.URL.createObjectURL(csvData);

    var testLink = document.createElement('a');
    testLink.href = csvURL;
    testLink.setAttribute('download', 'JobSeekerDetails.csv');
    testLink.click();
  };
  return (
    <div className="job-seeker-download-wrapper">
      <h4 className="job-seeker-download-heading">JobSeeker Details Download</h4>
      <div className="date-inputs">
        <DatePicker
          className="date-input"
          idName="fromDate"
          name="fromDate"
          isRequired={true}
          isInvalid={errorMsg.fromDate !== ''}
          LabelName="From Date"
          errorMsg={errorMsg.fromDate}
          value={values.fromDate}
          mt={4}
          onChange={onChange}
          onBlur={validateInput}
        />
        <DatePicker
          className="date-input second-date-input"
          idName="toDate"
          name="toDate"
          isRequired={true}
          mt={4}
          isInvalid={errorMsg.toDate !== ''}
          LabelName="To Date"
          errorMsg={errorMsg.toDate}
          value={values.toDate}
          onChange={onChange}
          onBlur={validateInput}
        />
      </div>
      <SelectInput
        isRequired={true}
        isInvalid={errorMsg.job_category !== ''}
        errorMsg={errorMsg.job_category}
        dataList={jobCategories}
        mt={4}
        name="job_category"
        value={values.job_category}
        onChange={onChange}
        LabelName="Job Category"
        onBlur={validateInput}
        needPlaceholder={false}
      />
      <SwitchChoice
        mt={4}
        size="md"
        leftChoiceText="Paid Users"
        rightChoiceText="Not Paid Users"
        onChange={value => setNotPaid(!notPaid)}
        value={notPaid}
        name="notPaid"
        isRequired={true}
      />
      <Button colorScheme="blue" onClick={getDetails} mt={4} isLoading={loading}>
        Get Details
      </Button>
    </div>
  );
};

export default JobSeekerDownload;
