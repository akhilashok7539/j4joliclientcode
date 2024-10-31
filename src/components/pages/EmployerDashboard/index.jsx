import React  from 'react';
import './style.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../../utilities/Route/ProtectedRoute';
import JobsForConsultancies from '../JobsForConsultancies';
import ConsultancyJobDetails from '../JobsForConsultancies/ConsultancyJobDetails';

const JobDetails = React.lazy(() => import('../JobDetails'));
const EmployerJobs = React.lazy(() => import('../EmployerJobs'));
const EmployerAddJob = React.lazy(() => import('../EmployerAddJob'));
const ChangePassword = React.lazy(() => import('../ChangePassword'));
const EmployerEditJob = React.lazy(() => import('../EmployerEditJob'));

const EmployerDashboard = () => {
  return (
    <>
      <Switch>
        <Route exact path="/employer/dashboard">
          <Redirect to="/employer/dashboard/add-job" />
        </Route>
        <ProtectedRoute
          exact
          path="/employer/dashboard/add-job"
          redirect="/employer/login"
          userType="employer"
        >
          <EmployerAddJob />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/change-password"
          redirect="/employer/login"
          userType="employer"
        >
          <ChangePassword user="employer" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/reviewed-jobs/:page"
          redirect="/employer/login"
          userType="employer"
        >
          <EmployerJobs approved={false} url="/employer/dashboard/reviewed-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/reviewed-jobs/details/:id"
          redirect="/employer/login"
          userType="employer"
        >
          <JobDetails url="/employer/dashboard/reviewed-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/reviewed-jobs/edit/:id"
          redirect="/employer/login"
          userType="employer"
        >
          <EmployerEditJob />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/approved-jobs/:page"
          redirect="/employer/login"
          userType="employer"
        >
          <EmployerJobs approved={true} url="/employer/dashboard/approved-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/approved-jobs/details/:id"
          redirect="/employer/login"
          userType="employer"
        >
          <JobDetails url="/employer/dashboard/approved-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/approved-jobs/edit/:id"
          redirect="/employer/login"
          userType="employer"
        >
          <EmployerEditJob />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/all-jobs/:page"
          redirect="/employer/login"
          userType="employer"
        >
          <JobsForConsultancies approved={true} url="/employer/dashboard/all-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/employer/dashboard/all-jobs/details/:id"
          redirect="/employer/login"
          userType="employer"
        >
          <ConsultancyJobDetails url="/employer/dashboard/all-jobs" />
        </ProtectedRoute>
        <Redirect from="*" to="/employer/dashboard/add-job" />
      </Switch>
    </>
  );
};

export default EmployerDashboard;
