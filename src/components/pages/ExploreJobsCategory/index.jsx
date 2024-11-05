import React, { useEffect, useState } from 'react';

import Jobs from './Jobs';
import { useRhinoState } from '../../context';
import SelectInput from '../../utilities/SelectInput';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getDistrictsForFilter } from '../../../districts';
import api from '../../../helpers/axios';

const ExploreJobsCategory = ({ url }) => {
  const [filters, setFilters] = useRhinoState('filters');
  const [district,setDistrictList] = useState([]);

  const { CategoryName } = useParams();

  const history = useHistory();

  // district list for select input
  // const districtList = getDistrictsForFilter()
  const districtList = ['All']

  /* eslint-disable */

  useEffect(() => {
    getDistrictsList()
  },[])
  useEffect(() => {
    
  },[district])

  const getDistrictsList = () => {
    api.get('/district').then((res) => {
      // const list = []
      // districtList.push('All')
      res.data.forEach((item) => {
        districtList.push(item.name)
      })
      setDistrictList(districtList)
      // console.log(list)
      // districtList(list)
    }).catch((err) => {
      // showErrorToast(toast, err);
    });
  }
  const filterChange = (event) => {
    setFilters((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
    history.push(`${url}/${CategoryName}/1`);
  };

  return (
    <div className="job-container">
      <div className="alerts"></div>
      <div className="filter">
        <div className="select-container">
          <SelectInput
            isRequired={true}
            dataList={district}
            mt={4}
            name="district"
            value={filters.district}
            onChange={filterChange}
            LabelName="District"
            needPlaceholder={false}
          />
        </div>
      </div>

      <Jobs district={filters.district} job_no={filters.job_no} url={url} />
    </div>
  );
};

export default ExploreJobsCategory;
