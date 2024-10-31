import React, { useState } from 'react';
import DatePicker from '../../utilities/DatePicker';
import useForm from '../../../hooks/useForm';
import { useToast } from '@chakra-ui/react';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import api from '../../../helpers/axios';
import { jsonToCSV } from 'react-papaparse';
import { showErrorToast } from '../../../helpers/errorToast.js';
import Button from '../../utilities/Button';

const RenewedJobSeekerDownload = () => {
  let jobSeekers = [];

  const [values, onChange] = useForm({
    paidDate: '',
  });

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState({ paidDate: '' });

  const getDetails = () => {
    let formValidity = true;
    showErrorMsg('paidDate', new Date(values.paidDate), setErrorMsg);
    if (values.paidDate === '') formValidity = false;
    if (formValidity) {
      setLoading(true);
      let paid_date = new Date(values.paidDate).toISOString();
      api
        .post(`/admin/renewed-job-seekers-details`, {
          paid_date,
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

  const generateCsvFile = async () => {
    const csv = await jsonToCSV(jobSeekers);
    setLoading(false);
    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    var csvURL = window.URL.createObjectURL(csvData);

    var testLink = document.createElement('a');
    testLink.href = csvURL;
    testLink.setAttribute('download', 'RenewedJobSeekerDetails - ' + values.paidDate + '.csv');
    testLink.click();
  };

  const validateInput = (e) => {
    showErrorMsg(e.target.name, new Date(e.target.value), setErrorMsg);
  };

  return (
    <div className="job-seeker-download-wrapper">
      <h4 className="job-seeker-download-heading">Renewed JobSeekers Details Download</h4>
      <div className="date-inputs">
        <DatePicker
          className="date-input"
          idName="paidDate"
          name="paidDate"
          isRequired={true}
          isInvalid={errorMsg.paidDate !== ''}
          LabelName="Paid Date"
          errorMsg={errorMsg.paidDate}
          value={values.paidDate}
          mt={4}
          onChange={onChange}
          onBlur={validateInput}
        />
      </div>
      <Button colorScheme="blue" onClick={getDetails} mt={4} isLoading={loading}>
        Get Details
      </Button>
    </div>
  );
};
export default RenewedJobSeekerDownload;
