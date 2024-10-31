import React, { useState, useEffect } from 'react';

import './style.css';
import api from '../../../helpers/axios';
import EditProfile from './EditProfile.jsx';
import { useToast } from '@chakra-ui/react';
import { showErrorToast } from '../../../helpers/errorToast';
import Loading from '../../utilities/Loading';
import { useRhinoState } from '../../context';
import DeleteAccount from './DeleteAccount';
import ShowValidity from './ShowValidity';

const JobSeekerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState();
  const [user] = useRhinoState('user');

  const toast = useToast();

  /* eslint-disable */
  useEffect(() => {
    if (user.is_user_logged_in) {
      getProfileData();
    }
  }, []);
  /*eslint-enable */

  const getProfileData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/job-seeker');

      setProfileInfo(res.data);
      setLoading(false);
    } catch (err) {
      showErrorToast(toast, err);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="profile">
      <ShowValidity className="validity" validity={profileInfo.valid_till} />
      <EditProfile profileInfo={profileInfo} />
      <DeleteAccount />
    </div>
  );
};

export default JobSeekerProfile;
