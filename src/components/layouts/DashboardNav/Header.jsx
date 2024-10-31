import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { useRhinoState } from '../../context';
import Menu from './Menu';

// let deferredPrompt;

const DashboardHeader = ({ navList }) => {
  const { pathname } = useLocation();

  const [title, setTitle] = useState('');

  const [installable, setInstallable] = useRhinoState('installable');

  const handleInstallClick = (e) => {
    // Show the install prompt
    installable.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    installable.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
    // Hide the app provided install promotion
    setInstallable({ installable: false, deferredPrompt: null });
  };

  /* eslint-disable */
  useEffect(() => {
    const currentPageInfo = navList.find((list) => list.url === pathname);
    if (currentPageInfo) {
      setTitle(currentPageInfo.name);
    } else {
      setTitle('');
    }
  }, [pathname]);
  /* eslint-enable */
  return (
    <div className="dashboard-header">
      <h5 className="page-title">{title}</h5>
      <Menu installable={installable.installable} handleInstallClick={handleInstallClick} />
    </div>
  );
};

export default DashboardHeader;
