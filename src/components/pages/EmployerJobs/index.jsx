import React, { useState, useEffect } from 'react';

import './style.css';
import api from '../../../helpers/axios';
import Pagination from '../../utilities/Pagination';
import { useToast } from '@chakra-ui/react';
import JobCard from '../../utilities/JobCard';
import Loading from '../../utilities/Loading';
import NoJob from '../../utilities/NoJob';
import JobRetry from '../../utilities/JobRetry';
import { useRhinoState } from '../../context';
import { showErrorToast } from '../../../helpers/errorToast';
import { useParams } from 'react-router';

const EmployerJobs = ({ approved, url }) => {
  const [user] = useRhinoState('user');
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
    if (user.is_user_logged_in) {
      getJobs();
    }
  }, [page, approved]);
  /* eslint-enable */
  const getJobs = () => {
    setLoading(true);

    const pageNumber = isNaN(page) ? '1' : page;
    const param = {
      page: pageNumber,
      approved: approved,
    };

    api
      .get('/employer/jobs', { params: param })
      .then((res) => {
        setJobs(res.data.jobs);
        setPaginationState(res.data.pagination);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        showErrorToast(toast, err);
      });
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
    return <NoJob />;
  }

  return (
    <div className="employer-jobs">
      <div className="card-container">
        {React.Children.toArray(
          jobs.map((job) => <JobCard job={job} url={url} getJobs={getJobs} />)
        )}
      </div>
      <Pagination pagination={pagination} currentPage={page} url={url} />
    </div>
  );
};

export default EmployerJobs;
