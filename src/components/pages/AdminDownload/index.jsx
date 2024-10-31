import EmployerDownload from './EmployerDownload';
import JobSeekerDownload from './JobSeekerDownload';
import JobDownload from './JobDownload';
import RenewedJobSeekerDownload from './RenewedJobSeekerDownload';
import './style.css';

const AdminDownload = () => {
  return (
    <div className="admin-download-wrapper">
      <EmployerDownload />
      <JobSeekerDownload />
      <RenewedJobSeekerDownload />
      <JobDownload />
    </div>
  );
};

export default AdminDownload;
