import React, { useEffect, useState } from 'react';
import './style.css';
import { useToast } from '@chakra-ui/react';
import SMSInitiator from './SMSInitiator';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import SendExpirySMS from './SendExpirySMS'
const SendSMS = () => {
  //state to store list job categories
  const [jobCategories, setJobCategories] = useState([]);

  // Chakra ui toast
  const toast = useToast();

  /* eslint-disable */
  useEffect(() => {
    let isMounted = true;

    const updateJobSeekerCount = async () => {
      try {
        const res = await api.get('/job-category/job-seeker-count');

        let jobCategoryArray = [];

        for (let i = 0; i < res.data.jobSeekerCount.length; i++) {
          jobCategoryArray.push(res.data.jobSeekerCount[i]);
        }

        if (isMounted) setJobCategories([...jobCategoryArray]);
      } catch (err) {
        if (isMounted) showErrorToast(toast, err);
      }
    };
    updateJobSeekerCount();

    return () => {
      isMounted = false;
    };
  }, []);
  /* eslint-enable */
  return (
    <div className="send-sms">
      <h2>Send SMS</h2>
      <div className="sms-button-wrapper">
        <SendExpirySMS />
      </div>
      <div className="sms-button-wrapper">
        {jobCategories.map((item, index) => {
          return <SMSInitiator key={index} CategoryName={item._id} count={item.count} />;
        })}
      </div>
    </div>
  );
};

export default SendSMS;
