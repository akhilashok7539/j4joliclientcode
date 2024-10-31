import { useHistory } from 'react-router-dom';

const ExploreJobButton = ({ closeNav }) => {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/discover-jobs');
    closeNav();
  };

  return (
    <>
      <button className="explore-job-btn" onClick={handleLoginClick}>
        View Jobs
      </button>
    </>
  );
};

export default ExploreJobButton;
