import React, { useState, useEffect } from 'react';

import './style.css';
import api from '../../../helpers/axios';
import Pagination from '../../utilities/Pagination';
import { useToast } from '@chakra-ui/react';
import JobCard from './JobCard';
import Loading from '../../utilities/Loading';
import JobRetry from '../../utilities/JobRetry';
import { showErrorToast } from '../../../helpers/errorToast';
import { useParams } from 'react-router';

const Jobs = ({ district, url, job_no }) => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    first: null,
    prev: null,
    next: null,
    last: null,
  });

  const { page } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const toast = useToast();

  /* eslint-disable */
  useEffect(() => {
    getJobs();
  }, [page, district, job_no]);
  /* eslint-enable */

  const getJobs = async () => {
    setLoading(true);
    const pageNumber = isNaN(page) ? '1' : page;
    const param = {
      page: pageNumber,
      ...(district !== 'All' && { district }),
      ...(job_no !== '' && { job_no }),
    };
    try {
      const res = await api.get('/job-seeker/jobs', { params: param });
      setJobs(res.data.jobs);
      setPaginationState(res.data.pagination);
      setLoading(false);
      setError(false);
    } catch (err) {
      showErrorToast(toast, err);
    }
  };

  const setPaginationState = ({ first, previous, next, last }) => {
    if (next) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        next: next.page,
      }));
    } else {
      setPagination((prevPagination) => ({
        ...prevPagination,
        next: null,
      }));
    }
    if (previous) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        prev: previous.page,
      }));
    } else {
      setPagination((prevPagination) => ({
        ...prevPagination,
        prev: null,
      }));
    }
    if (first) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        first: first.page,
      }));
    } else {
      setPagination((prevPagination) => ({
        ...prevPagination,
        first: null,
      }));
    }
    if (last) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        last: last.page,
      }));
    } else {
      setPagination((prevPagination) => ({
        ...prevPagination,
        last: null,
      }));
    }
  };

  if (error) {
    return <JobRetry retry={getJobs} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return (
      <div className="no-jobs-available">
        <h4>Sorry...No Job available.</h4>
      </div>
    );
  }

  return (
    <div className="jobs">
      <div className="card-container">
        {React.Children.toArray(jobs.map((job) => <JobCard job={job} url={url} />))}
      </div>
      <Pagination pagination={pagination} currentPage={page} url={url} />
    </div>
  );
};
export default Jobs;
