import Jobs from './Jobs';
import { useRhinoState } from '../../context';
import SelectInput from '../../utilities/SelectInput';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getDistrictsForFilter } from '../../../districts';

const ExploreJobsCategory = ({ url }) => {
  const [filters, setFilters] = useRhinoState('filters');

  const { CategoryName } = useParams();

  const history = useHistory();

  // district list for select input
  const districtList = getDistrictsForFilter()

  /* eslint-disable */

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
            dataList={districtList}
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
