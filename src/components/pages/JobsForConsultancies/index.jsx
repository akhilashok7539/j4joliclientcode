import React, { useState, useEffect } from 'react';

import './style.css';
import api from '../../../helpers/axios';
import { useToast } from '@chakra-ui/react';
import SelectInput from '../../utilities/SelectInput';
import { showErrorToast } from '../../../helpers/errorToast';
import Jobs from './Jobs';
import { useHistory } from 'react-router';
import TextInput from '../../utilities/TextInput';

const JobsForConsultancies = ({ approved, url }) => {
  const [filters, setFilters] = useState({
    district: 'All',
    job_category: '',
  });

  const [jobCategories, setJobCategories] = useState([]);

  const history = useHistory();

  // district list for select input
  const districtList = [
    'All',
    'Alappuzha',
    'Ernakulam',
    'Idukki',
    'Kannur',
    'Kasaragod',
    'Kollam',
    'Kottayam',
    'Kozhikode',
    'Malappuram',
    'Palakkad',
    'Pathanamthitta',
    'Thrissur',
    'Thiruvananthapuram',
    'Wayanad',
  ];

  const toast = useToast();

  const filterChange = (event) => {
    setFilters((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
    history.push(`${url}/1`);
  };

  /* eslint-disable */

  useEffect(() => {
    api
      .get('/job-category/get-allowed-categories-for-consultancy')
      .then((res) => {
        setJobCategories(res.data.job_categories);
        setFilters({ job_category: res.data.job_categories[0], district: 'All' });
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  }, []);
  /* eslint-enable */

  return (
    <div className="consultancy-jobs">
      <div className="filters">
        <div className="select-container">
          <SelectInput
            isRequired={true}
            dataList={jobCategories}
            mt={4}
            name="job_category"
            value={filters.job_category}
            onChange={filterChange}
            LabelName="Job Category"
            needPlaceholder={false}
          />
        </div>
        <div className="select-container">
          <SelectInput
            isRequired={true}
            dataList={districtList}
            mt={4}
            name="district"
            value={filters.district}
            onChange={filterChange}
            LabelName="District"
            needPlaceholder={false}
          />
        </div>
        <div className="select-container">
          <TextInput
            LabelName="Job Number"
            placeholder="Search with Job Number"
            name="job_no"
            mt={4}
            value={filters.job_no}
            onChange={filterChange}
            isRequired={true}
          ></TextInput>
        </div>
      </div>
      <Jobs
        approved={approved}
        url={url}
        district={filters.district}
        job_category={filters.job_category}
        job_no={filters.job_no}
        status={filters.status}
      />
    </div>
  );
};

export default JobsForConsultancies;
