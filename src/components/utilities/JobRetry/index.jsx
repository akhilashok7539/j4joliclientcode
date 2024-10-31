
import Button from '../Button';
import './style.css';

const JobRetry = ({ retry }) => {
  return (
    <div className="retry">
      <div className="content">
        <h4>Cannot Get Jobs</h4>
        <p>Please retry after some time.</p>
        <Button onClick={retry}> Retry </Button>
      </div>
    </div>
  );
};

export default JobRetry;
