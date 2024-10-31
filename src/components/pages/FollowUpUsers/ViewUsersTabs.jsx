import React, { useState } from 'react';
import './style.css'
import MatchingJobs from './MatchingJobs';
import InformedJobs from './InformedJobs';
const ViewUsersTabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='container'>
      {/* Tab headers */}
      <div className="tab-header">
        <button
          className={activeTab === 'tab1' ? 'active' : ''}
          onClick={() => handleTabClick('tab1')}
        >
          Matching Jobs
        </button>
        <button
          className={activeTab === 'tab2' ? 'active' : ''}
          onClick={() => handleTabClick('tab2')}
        >
          Informed Jobs
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div className='matchingJobsContainer'>
            <MatchingJobs />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className='matchingJobsContainer'>
            <InformedJobs />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUsersTabs;
