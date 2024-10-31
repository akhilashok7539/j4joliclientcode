import React, { useState, useEffect } from 'react';

import './style.css';
import api from '../../../helpers/axios';
import { useToast } from '@chakra-ui/react';
import { useRhinoState } from '../../context';
import SelectInput from '../../utilities/SelectInput';
import { showErrorToast } from '../../../helpers/errorToast';
import Jobs from './Jobs';
import { useHistory } from 'react-router';
import TextInput from '../../utilities/TextInput';
import { Badge } from '@chakra-ui/react';
import { getDistrictsForFilter } from '../../../districts';

const AdminJobs = ({ approved, url }) => {
  const [filters, setFilters] = useRhinoState('filters');

  const [jobCategories, setJobCategories] = useState([]);

  const [jobCount, setJobCount] = useState('');

  const history = useHistory();

  // district list for select input
  const districtList = getDistrictsForFilter()

  const statusList = ['All', 'Active', 'Expired', 'Hidden'];

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
      .get('/job-category?include_hidden=true')
      .then((res) => {
        let jobCategoryArray = ['All'];
        for (let i = 0; i < res.data.job_categories.length; i++) {
          jobCategoryArray.push(res.data.job_categories[i].name);
        }

        setJobCategories([...jobCategoryArray]);
      })
      .catch((err) => {
        showErrorToast(toast, err);
      });
  }, []);
  /* eslint-enable */

  const handleJobCountCallback = (data) => {
    setJobCount(data);
  };
  return (
    <div className="admin-jobs">
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
          <SelectInput
            isRequired={true}
            dataList={statusList}
            mt={4}
            name="status"
            value={filters.status}
            onChange={filterChange}
            LabelName="Status"
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
        <div className='select-container'>
          <TextInput
            LabelName="Job Title"
            placeholder="Search with Job Title"
            name="job_title"
            mt={4}
            value={filters.job_title}
            onChange={filterChange}
            isRequired={true}
          ></TextInput>
        </div>
        <div className='select-container'>
          <TextInput
            LabelName="Job Location"
            placeholder="Search with Job Location"
            name="job_location"
            mt={4}
            value={filters.job_location}
            onChange={filterChange}
            isRequired={true}
          ></TextInput>
        </div>
        <div className="job-count">
          <Badge colorScheme="purple" fontSize="1rem" variant="solid" borderRadius={6}>
            {jobCount}
          </Badge>
        </div>
      </div>
      <Jobs
        approved={approved}
        url={url}
        district={filters.district}
        job_category={filters.job_category}
        job_no={filters.job_no}
        status={filters.status}
        job_location={filters.job_location}
        job_title={filters.job_title}
        parentCallback={handleJobCountCallback}
      />
    </div>
  );
};

export default AdminJobs;
