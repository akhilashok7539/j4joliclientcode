import React, { useEffect, useState } from 'react';
import DatePicker from '../../utilities/DatePicker';
import api from '../../../helpers/axios';
import useForm from '../../../hooks/useForm';
import { HStack, useToast } from '@chakra-ui/react';
import SelectInput from '../../utilities/SelectInput';
import Button from '../../utilities/Button';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import { showErrorToast } from '../../../helpers/errorToast.js';
import { jsonToCSV } from 'react-papaparse';

const JobDownload = () => {
  let jobs = [];
  const [values, onChange] = useForm({
    toDate: '',
    fromDate: '',
    job_category: 'All',
    job_status: 'All',
  });
  //state to store list job categories
  const [jobCategories, setJobCategories] = useState([]);

  // State to set error
  const [errorMsg, setErrorMsg] = useState({
    toDate: '',
    fromDate: '',
    job_category: '',
    job_status: '',
  });

  //to display toast

  const toast = useToast();
  //state to set loading button
  const [loading, setLoading] = useState(false);

  const dateRequiredStatuses = ['All', 'Active'];

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
  }, []);
  // to show error msg
  const validateInput = (e) => {
    showErrorMsg(e.target.name, new Date(e.target.value), setErrorMsg);
  };

  const getDetails = () => {
    let formValidity = true;
    const isDatesRequired = dateRequiredStatuses.includes(values.job_status);

    if (isDatesRequired) {
      showErrorMsg('toDate', new Date(values.toDate), setErrorMsg);
      showErrorMsg('fromDate', new Date(values.fromDate), setErrorMsg);
    }

    if (values.job_category === '' || values.job_status === '') formValidity = false;

    if (isDatesRequired) if (values.fromDate === '' || values.toDate === '') formValidity = false;

    if (
      errorMsg.toDate !== '' ||
      errorMsg.fromDate !== '' ||
      errorMsg.job_category !== '' ||
      errorMsg.job_status !== ''
    )
      formValidity = false;

    if (formValidity) {
      setLoading(true);

      let payload = { job_category: values.job_category, job_status: values.job_status };

      if (isDatesRequired) {
        let to_date = new Date(values.toDate).toISOString();
        let from_date = new Date(values.fromDate).toISOString();

        payload.to = to_date;
        payload.from = from_date;
      }

      api
        .post(`/admin/download-jobs`, payload)
        .then((res) => {
          const tmp = res.data.jobs;
          jobs = tmp.map((obj) => ({
            companyAddressName: obj.companyAddressName,
            companyAddressCity: obj.companyAddressCity,
            companyDistrict: obj.district,
            companyAddressState: obj.companyAddressState,
            companyAddressZip: obj.companyAddressZip,
            contactPersonName: obj.contactPersonName,
            contactPersonDesignation: obj.contactPersonDesignation,
            contactPersonMobile: obj.contactPersonMobile,
            contactPersonWhatsapp: obj.contactPersonWhatsapp,
            contactPersonEmail: obj.contactPersonEmail,
            ...obj,
          }));
          generateCsvFile();
        })
        .catch((err) => {
          showErrorToast(toast, err);
          setLoading(false);
        });
    }
  };

  const generateCsvFile = async () => {
    const csv = await jsonToCSV(jobs);
    setLoading(false);
    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    var csvURL = window.URL.createObjectURL(csvData);

    var testLink = document.createElement('a');
    testLink.href = csvURL;
    testLink.setAttribute('download', 'JobDetails.csv');
    testLink.click();
  };

  return (
    <div className="job-download-wrapper">
      <h4>Job Details Download</h4>
      <div className="date-inputs">
        <HStack>
          <SelectInput
            isRequired={true}
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
          <SelectInput
            isRequired={true}
            errorMsg={errorMsg.job_status}
            dataList={['All', 'Active', 'Expired', 'Hidden']}
            mt={4}
            name="job_status"
            value={values.job_status}
            onChange={onChange}
            LabelName="Status"
            onBlur={validateInput}
            needPlaceholder={false}
          />
        </HStack>
        {dateRequiredStatuses.includes(values.job_status) ? (
          <HStack>
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
          </HStack>
        ) : null}
      </div>
      <Button colorScheme="blue" onClick={getDetails} mt={4} isLoading={loading}>
        Get Details
      </Button>
    </div>
  );
};

export default JobDownload;
