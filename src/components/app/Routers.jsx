import React, { Suspense, useEffect } from 'react';

import Route from '../utilities/Route';
import Loading from '../utilities/Loading';
import { useSetRhinoState } from '../context';
import ProtectedRoute from '../utilities/Route/ProtectedRoute';
import { Redirect, Route as ReactRoute, Switch } from 'react-router-dom';
import ScrollToTop from '../utilities/ScrollToTop';

const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const NoJobs = React.lazy(() => import('../pages/NoJobs'));
const Payment = React.lazy(() => import('../pages/Payment'));
const About = React.lazy(() => import('../pages/Home/About'));
const Policies = React.lazy(() => import('../pages/Policies'));
const ContactUs = React.lazy(() => import('../pages/ContactUs'));
const AdminLogin = React.lazy(() => import('../pages/AdminLogin'));
const EmployerHome = React.lazy(() => import('../pages/EmployerHome'));
const JobSeekerHome = React.lazy(() => import('../pages/JobSeekerHome'));
const AdminDashboard = React.lazy(() => import('../pages/AdminDashboard'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword'));
const EmployerDashboard = React.lazy(() => import('../pages/EmployerDashboard'));
const SubCategory = React.lazy(() => import('../pages/JobSeekerHome/SubCategory'));
const JobSeekerDashboard = React.lazy(() => import('../pages/JobSeekerDashboard'));
const ExploreJobs = React.lazy(() => import('../pages/JobSeekerHome/ExploreJobs'));
const EmployerRegistration = React.lazy(() => import('../pages/EmployerRegistration'));
const JobSeekerRegistration = React.lazy(() => import('../pages/JobSeekerRegistration'));
const ExploreJobsCategory = React.lazy(() => import('../pages/ExploreJobsCategory'));
const Routers = () => {
  const setInstallable = useSetRhinoState('installable');

  /* eslint-disable */
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Update UI notify the user they can install the PWA
      // Stash the event so it can be triggered later.
      setInstallable({
        installable: true,
        deferredPrompt: e,
      });
    });
    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  /* eslint-enable */

  return (
    <>
      <ScrollToTop>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/employer">
              <EmployerHome />
            </Route>
            <Route exact path="/employer/register">
              <EmployerRegistration />
            </Route>
            <Route exact path="/job-seeker">
              <JobSeekerHome />
            </Route>
            <ReactRoute Route exact path="/job-seeker/register/">
              <Redirect to="/job-seeker" />
            </ReactRoute>
            <Route exact path="/job-seeker/register/:CategoryName">
              <JobSeekerRegistration />
            </Route>
            <Route exact path="/employer/login">
              <Login userType="employer" />
            </Route>
            <Route exact path="/job-seeker/login">
              <Login userType="job-seeker" />
            </Route>
            <Route exact path="/job-seeker/payment">
              <Payment />
            </Route>
            <Route exact path="/employer/forgot-password">
              <ForgotPassword user="employer" />
            </Route>
            <Route exact path="/job-seeker/forgot-password">
              <ForgotPassword user="job-seeker" />
            </Route>
            <Route exact path="/job-seeker/no-jobs">
              <NoJobs />
            </Route>
            <ProtectedRoute
              path="/employer/dashboard"
              userType="employer"
              redirect="/employer/login"
            >
              <EmployerDashboard />
            </ProtectedRoute>
            <Route exact path="/admin">
              <AdminLogin />
            </Route>
            <Route exact path="/policies">
              <Policies />
            </Route>
            <ProtectedRoute path="/admin/dashboard" userType="admin" redirect="/admin">
              <AdminDashboard />
            </ProtectedRoute>
            <ProtectedRoute
              path="/job-seeker/dashboard"
              userType="job-seeker"
              redirect="/job-seeker/login"
            >
              <JobSeekerDashboard />
            </ProtectedRoute>
            <Route path="/job-seeker/sub-category">
              <SubCategory />
            </Route>
            <ReactRoute path="/about">
              <About />
            </ReactRoute>
            <ReactRoute path="/contact">
              <ContactUs />
            </ReactRoute>
            <Route exact path="/discover-jobs">
              <ExploreJobs />
            </Route>
            <Route exact path="/discover-jobs/dashboard/:CategoryName/:page">
              <ExploreJobsCategory url="/discover-jobs/dashboard" />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </>
  );
};

export default Routers;
