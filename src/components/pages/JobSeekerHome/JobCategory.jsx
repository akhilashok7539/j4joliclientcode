// import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router-dom';

const JobCategory = ({ CategoryName, count, callBack, exploreJobs = false }) => {
  const history = useHistory();

  const actionOnClick = () => {
    if (exploreJobs) {
      history.push('/discover-jobs/dashboard/' + CategoryName + '/1');
      return;
    }
    if (count > 0) {
      callBack(CategoryName);
    } else {
      history.push('/job-seeker/no-jobs');
    }
  };
  return (
    <div className="job-category-container">
      {/* <Link to={count > 0 ?`job-seeker/register/${CategoryName}`:`job-seeker/no-jobs`} className="job-category-btn">
        {CategoryName}
      </Link> */}
      <Button size="lg" className="job-category-btn" onClick={actionOnClick}>
        {CategoryName}
      </Button>
    </div>
  );
};

export default JobCategory;
