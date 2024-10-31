import React, { useState } from 'react';
import DatePicker from '../../utilities/DatePicker';
import useForm from '../../../hooks/useForm';
import { useToast } from '@chakra-ui/react';
import { showErrorMsg } from '../../../helpers/showErrorMsg';
import api from '../../../helpers/axios';
import { jsonToCSV } from 'react-papaparse';
import { showErrorToast } from '../../../helpers/errorToast.js';
import Button from '../../utilities/Button';

const EmployerDownload = () => {
  let employerDetails = [];
  const [values, onChange] = useForm({
    toDate: '',
    fromDate: '',
  });
  // State to set error
  const [errorMsg, setErrorMsg] = useState({ toDate: '', fromDate: '' });

  //to display toast

  const toast = useToast();
  //state to set loading button
  const [loading, setLoading] = useState(false);
  // function get user details
  const getDetails = () => {
    let formValidity = true;
    showErrorMsg('toDate', new Date(values.toDate), setErrorMsg);
    showErrorMsg('fromDate', new Date(values.fromDate), setErrorMsg);
    if (values.toDate === '' || values.fromDate === '') formValidity = false;
    if (errorMsg.toDate !== '' || errorMsg.fromDate !== '') formValidity = false;

    if (formValidity) {
      setLoading(true);
      let to_date = new Date(values.toDate).toISOString();
      let from_date = new Date(values.fromDate).toISOString();
      api
        .post(`/admin/employers-details`, {
          to: to_date,
          from: from_date,
        })
        .then((res) => {
          employerDetails = res.data.employers;
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
  //function to  convert json data csv
  const generateCsvFile = async () => {
    const csv = await jsonToCSV(employerDetails);
    setLoading(false);
    var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    var csvURL = window.URL.createObjectURL(csvData);

    var testLink = document.createElement('a');
    testLink.href = csvURL;
    testLink.setAttribute('download', 'employerDetails.csv');
    testLink.click();
  };
  return (
    <div className="employer-download-wrapper">
      <h4 className="employer-download-heading"> Employer Details Download </h4>
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
          mt={4}
          isRequired={true}
          isInvalid={errorMsg.toDate !== ''}
          LabelName="To Date"
          errorMsg={errorMsg.toDate}
          value={values.toDate}
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

export default EmployerDownload;
