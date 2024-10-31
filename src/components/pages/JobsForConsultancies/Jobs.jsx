import React, { useState, useEffect } from 'react';

import JobCard from '../../utilities/JobCard';
import api from '../../../helpers/axios';
import { useToast } from '@chakra-ui/react';
import Pagination from '../../utilities/Pagination';
import { showErrorToast } from '../../../helpers/errorToast';
import { useParams } from 'react-router';

const Jobs = ({ approved, url, district, job_category, job_no, status }) => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    first: null,
    prev: null,
    next: null,
    last: null,
  });

  const { page } = useParams();

  const toast = useToast();

  /* eslint-disable */
  useEffect(() => {
    getJobs();
  }, [page, approved, district, job_category, job_no, status]);
  /* eslint-enable */

  const getJobs = () => {
    const pageNumber = isNaN(page) ? '1' : page;
    const param = {
      page: pageNumber,
      approved: approved,
      ...(district !== 'All' && { district }),
      ...(job_category !== 'All' && { job_category }),
      ...(job_no !== '' && { job_no }),
      ...(status !== 'All' && { status }),
    };
    api
      .get('/employer/get-jobs-for-consultancy', { params: param })
      .then((res) => {
        setJobs([]);
        setJobs(res.data.jobs);
        setPaginationState(res.data.pagination);
      })
      .catch((err) => {
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

  return (
    <>
      <div className="card-container">
        {React.Children.toArray(
          jobs.map((job) => <JobCard job={job} url={url} getJobs={getJobs} isAdmin={false} />)
        )}
      </div>
      <Pagination currentPage={page} pagination={pagination} url={url} />
    </>
  );
};

export default Jobs;
