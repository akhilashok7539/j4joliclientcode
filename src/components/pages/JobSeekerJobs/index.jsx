import React, { useEffect, useState } from 'react';

import Payment from '../Payment';
import Jobs from './Jobs';
import api from '../../../helpers/axios';
import { useToast } from '@chakra-ui/react';
import { useRhinoState } from '../../context';
import Loading from '../../utilities/Loading';
import { showErrorToast } from '../../../helpers/errorToast';
import SelectInput from '../../utilities/SelectInput';
import { useHistory } from 'react-router';
import TextInput from '../../utilities/TextInput';
import { getDistrictsForFilter } from '../../../districts';

const JobSeekerJobs = ({ url }) => {
  const [user] = useRhinoState('user');
  const [validity, setValidity] = useState();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useRhinoState('filters');

  const history = useHistory();

  // district list for select input
  const districtList = getDistrictsForFilter()

  const toast = useToast();
  /* eslint-disable */
  useEffect(() => {
    if (user.is_user_logged_in) {
      getValidity();
    }
  }, []);
  /* eslint-enable */

  const getValidity = async () => {
    setLoading(true);
    try {
      const res = await api.get('/job-seeker');
      let valid_till = new Date(res.data.valid_till).getTime();
      let currentDate = new Date().getTime();
      if (currentDate > valid_till) {
        setValidity(false);
      } else {
        setValidity(true);
      }
      setLoading(false);
    } catch (err) {
      showErrorToast(toast, err);
    }
  };

  const filterChange = (event) => {
    setFilters((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
    history.push(`${url}/1`);
  };

  if (loading) {
    return <Loading />;
  } else {
    if (validity) {
      return (
        <div className="job-container">
          <div className="alerts">
          </div>
          <div className="filter">
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

          <Jobs district={filters.district} job_no={filters.job_no} url={url} />
        </div>
      );
    } else {
      return <Payment getValidity={getValidity} />;
    }
  }
};

export default JobSeekerJobs;
