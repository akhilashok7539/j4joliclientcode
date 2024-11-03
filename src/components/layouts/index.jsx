import React, { useState, useEffect } from 'react';

import Header from '../layouts/header';
import DashboardNav from '../layouts/DashboardNav';
import Footer from '../layouts/footer';
import api from '../../helpers/axios';
import { useRhinoState } from '../context';
import { showErrorToast } from '../../helpers/errorToast';
import { useToast } from '@chakra-ui/react';
import Loading from '../utilities/Loading';
import DashboardHeader from './DashboardNav/Header';
import {
  FiInbox,
  FiUser,
  FiLock,
  FiFilePlus,
  FiFolderPlus,
  FiCheckCircle,
  FiBarChart2,
  FiDownloadCloud,
  FiMessageSquare,
  FiSearch,
  FiUsers,
  FiPhoneCall,
  FiList,
  FiMapPin,
} from 'react-icons/fi';

const Layout = ({ children }) => {
  const [user, setUser] = useRhinoState('user');

  const [loading, setLoading] = useState(true);

  const toast = useToast();

  /* eslint-disable */
  useEffect(() => {
    setLoading(true);
    api
      .get('/is-user-logged-in')
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        showErrorToast(toast, err);
      });
  }, []);
  /* eslint-enable */

  const employer = [
    {
      icon: <FiFilePlus />,
      name: 'Add Job',
      url: '/employer/dashboard/add-job',
    },
    {
      icon: <FiBarChart2 />,
      name: 'In Review',
      url: '/employer/dashboard/reviewed-jobs/1',
    },
    {
      icon: <FiCheckCircle />,
      name: 'Approved Job',
      url: '/employer/dashboard/approved-jobs/1',
    },
    {
      icon: <FiLock />,
      name: 'Change Password',
      url: '/employer/dashboard/change-password',
    },
  ];

  if (user?.user_type === 'employer' && user?.isConsultancy === true) {
    employer.push({
      icon: <FiList />,
      name: 'All Jobs',
      url: '/employer/dashboard/all-jobs/1',
    });
  }

  const admin = [
    {
      icon: <FiFilePlus />,
      name: 'Add Job',
      url: '/admin/dashboard/add-job',
    },
    {
      icon: <FiUser />,
      name: 'Users',
      url: '/admin/dashboard/follow-up',
    },
    {
      icon: <FiPhoneCall />,
      name: 'Tele-Callers',
      url: '/admin/dashboard/tele-caller',
    },
    {
      icon: <FiMapPin />,
      name: 'Districts',
      url: '/admin/dashboard/districts',
    },
    {
      icon: <FiMapPin />,
      name: 'Preffered Locations',
      url: '/admin/dashboard/locations',
    },
   
    {
      icon: <FiBarChart2 />,
      name: 'Review Jobs',
      url: '/admin/dashboard/reviewed-jobs/1',
    },
    {
      icon: <FiCheckCircle />,
      name: 'Approved Jobs',
      url: '/admin/dashboard/approved-jobs/1',
    },
    {
      icon: <FiDownloadCloud />,
      name: 'Download',
      url: '/admin/dashboard/download',
    },
    {
      icon: <FiMessageSquare />,
      name: 'Send SMS',
      url: '/admin/dashboard/sms',
    },
    {
      icon: <FiFolderPlus />,
      name: 'Job Category',
      url: '/admin/dashboard/view-job-category',
    },
    {
      icon: <FiFolderPlus />,
      name: 'Job Sub Category',
      url: '/admin/dashboard/view-job-Subcategory',
    },
    {
      icon: <FiSearch />,
      name: 'Jobseeker Search',
      url: '/admin/dashboard/jobseeker-search',
    },
    {
      icon: <FiUsers />,
      name: 'Manage Consultancies',
      url: '/admin/dashboard/consultancy',
    },
  ];

  const jobSeeker = [
    {
      icon: <FiInbox />,
      name: 'Job Updates',
      url: '/job-seeker/dashboard/job-updates/1',
    },
    {
      icon: <FiUser />,
      name: 'Profile',
      url: '/job-seeker/dashboard/profile',
    },
    {
      icon: <FiLock />,
      name: 'Change Password',
      url: '/job-seeker/dashboard/change-password',
    },
  ];
  let navList = [];
  if (user.user_type === 'employer') {
    navList = employer;
  } else if (user.user_type === 'admin') {
    navList = admin;
  } else if (user.user_type === 'job-seeker') {
    navList = jobSeeker;
  }

  if (loading === true) {
    return <Loading />;
  }
  return (
    <>
      {!user.is_user_logged_in ? (
        <div className="static-app">
          <Header />
          <div className="static-sections">{children}</div>
          <Footer />
        </div>
      ) : (
        <div className="dashboard">
          <DashboardNav user={`${user.user_type}`} navList={navList} />
          <div className="dashboard-sections">
            <DashboardHeader navList={navList} />
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default Layout;
