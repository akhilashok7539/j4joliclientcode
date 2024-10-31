import React  from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../../utilities/Route/ProtectedRoute';

const JobSeekerJobs = React.lazy(() => import('../JobSeekerJobs'));
const ChangePassword = React.lazy(() => import('../ChangePassword'));
const JobSeekerViewJob = React.lazy(() => import('../JobSeekerViewJob'));
const JobSeekerProfile = React.lazy(() => import('../JobSeekerProfile'));

const JobSeekerDashboard = () => {
  return (
    <>
      <Switch>
        <Route exact path="/job-seeker/dashboard">
          <Redirect to="/job-seeker/dashboard/job-updates" />
        </Route>
        <ProtectedRoute
          exact
          path="/job-seeker/dashboard/job-updates/:page"
          redirect="/job-seeker/login"
          userType="job-seeker"
        >
          <JobSeekerJobs url="/job-seeker/dashboard/job-updates" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/job-seeker/dashboard/job-updates/details/:id"
          redirect="/job-seeker/login"
          userType="job-seeker"
        >
          <JobSeekerViewJob />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/job-seeker/dashboard/change-password"
          redirect="/job-seeker/login"
          userType="job-seeker"
        >
          <ChangePassword user="job-seeker" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/job-seeker/dashboard/profile"
          redirect="/job-seeker/login"
          userType="job-seeker"
        >
          <JobSeekerProfile />
        </ProtectedRoute>
        <Redirect from="*" to="/job-seeker/dashboard/job-updates/1" />
      </Switch>
    </>
  );
};

export default JobSeekerDashboard;
