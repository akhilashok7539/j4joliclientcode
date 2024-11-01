import React from 'react';
import './style.css';
import ProtectedRoute from '../../utilities/Route/ProtectedRoute';

import { Route, Switch, Redirect } from 'react-router-dom';
import SuperAdminLogin from '../../utilities/SuperAdminLogin';
import StaffAdminLogin from '../../utilities/StaffAdminLogin';
// import AddTelecallers from '../TeleCallers/AddTelecallers';

const SendSMS = React.lazy(() => import('../SendSMS'));
const AdminJobs = React.lazy(() => import('../AdminJobs'));
const JobDetails = React.lazy(() => import('../JobDetails'));
const AdminAddJob = React.lazy(() => import('../AdminAddJob'));
const AdminEditJob = React.lazy(() => import('../AdminEditJob'));
const AdminDownload = React.lazy(() => import('../AdminDownload'));
const AddJobCategory = React.lazy(() => import('../AddJobCategory'));
const JobseekerSearch = React.lazy(() => import('../JobseekerSearch'));
const AdminConsultancies = React.lazy(() => import('../AdminConsultancies'));
const FollowUpUser = React.lazy(() => import('../FollowUpUsers'))
const TeleCallers = React.lazy(() => import('../TeleCallers'))
const ViewUsersTabs = React.lazy(() => import('../FollowUpUsers/ViewUsersTabs'))
const AddTelecallers = React.lazy(() => import('../TeleCallers/AddTelecallers'))
const AddUsers = React.lazy(() => import('../FollowUpUsers/AddUser'))
const ViewJobCategory = React.lazy(() => import('../ViewJobCategory/ViewJobCategory'))
const District = React.lazy(() => import('../District'))
const AddorUpdateDistrict = React.lazy(() => import('../District/AddorUpdateDistrict'))
const ViewJobSubCategory = React.lazy(() => import('../JobSubCategory/ViewJobSubCategory'))
const AddJobSubCategory = React.lazy(() => import('../JobSubCategory/JobSubCategory'))
const UpdateJobSubCategory = React.lazy(() => import('../ViewJobCategory/UpdateJobCategory'))


const ViewPrefferedLocations = React.lazy(() => import('../PreferedLocation/PreferedLocation'))
const AddPrefferedLocations = React.lazy(() => import('../PreferedLocation/AddPrefferedLocation'))
const UpdateUser = React.lazy(() => import('../FollowUpUsers/UpdateUser'))

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Switch>
        <Route exact path="/admin/dashboard">
          <Redirect to="/admin/dashboard/approved-jobs/1" />
        </Route>
        <ProtectedRoute path="/admin/dashboard/add-job" redirect="/admin" userType="admin">
          <StaffAdminLogin />
          <AdminAddJob />
        </ProtectedRoute>

        <ProtectedRoute path="/admin/dashboard/follow-up" redirect="/admin" userType="admin">
          {/* <StaffAdminLogin /> */}
          <FollowUpUser />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/dashboard/tele-caller" redirect="/admin" userType="admin">
          {/* <StaffAdminLogin /> */}
          <TeleCallers />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/dashboard/view-users" redirect="/admin" userType="admin">

          <ViewUsersTabs />
        </ProtectedRoute>

        <ProtectedRoute path="/admin/dashboard/add-telecallers" redirect="/admin" userType="admin">

          <AddTelecallers />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/dashboard/edit-telecallers" redirect="/admin" userType="admin">

          <AddTelecallers isEdit="true" />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/dashboard/add-user" redirect="/admin" userType="admin">

          <AddUsers />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/dashboard/update-user" redirect="/admin" userType="admin">
          <UpdateUser />
        </ProtectedRoute>


        <ProtectedRoute path="/admin/dashboard/districts" redirect="/admin" userType="admin">

          <District />
        </ProtectedRoute>

        <ProtectedRoute path="/admin/dashboard/add-district" redirect="/admin" userType="admin">

          <AddorUpdateDistrict />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/dashboard/edit-district" redirect="/admin" userType="admin">

          <AddorUpdateDistrict isEdit="true" />
        </ProtectedRoute>


        <ProtectedRoute path="/admin/dashboard/view-job-Subcategory" redirect="/admin" userType="admin">

          <ViewJobSubCategory />
        </ProtectedRoute>

        <ProtectedRoute
          exact
          path="/admin/dashboard/reviewed-jobs/:page"
          redirect="/admin"
          userType="admin"
        >
          <StaffAdminLogin />
          <AdminJobs approved={false} url="/admin/dashboard/reviewed-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/dashboard/reviewed-jobs/details/:id"
          redirect="/admin"
          userType="admin"
        >
          <StaffAdminLogin />
          <JobDetails approved={false} url="/admin/dashboard/reviewed-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/dashboard/reviewed-jobs/edit/:id"
          redirect="/admin"
          userType="admin"
        >
          <StaffAdminLogin />
          <AdminEditJob approved={false} />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/dashboard/approved-jobs/:page"
          redirect="/admin"
          userType="admin"
        >
          <AdminJobs approved={true} url="/admin/dashboard/approved-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/dashboard/approved-jobs/details/:id"
          redirect="/admin"
          userType="admin"
        >
          <JobDetails approved={true} url="/admin/dashboard/approved-jobs" />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/dashboard/approved-jobs/edit/:id"
          redirect="/admin"
          userType="admin"
        >
          {/* <StaffAdminLogin /> */}
          <AdminEditJob approved={true} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/admin/dashboard/download" redirect="/admin" userType="admin">
          <SuperAdminLogin />
          <AdminDownload />
        </ProtectedRoute>
        <ProtectedRoute exact path="/admin/dashboard/view-job-category" redirect="/admin" userType="admin">
          {/* <SuperAdminLogin /> */}
          <ViewJobCategory />
        </ProtectedRoute>
        <ProtectedRoute exact path="/admin/dashboard/add-job-sub-category" redirect="/admin" userType="admin">
          {/* <SuperAdminLogin /> */}
          <AddJobSubCategory />
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/dashboard/locations" redirect="/admin" userType="admin">
          {/* <SuperAdminLogin /> */}
          <ViewPrefferedLocations />
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/dashboard/add-locations" redirect="/admin" userType="admin">
          {/* <SuperAdminLogin /> */}
          <AddPrefferedLocations />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/dashboard/add-job-category"
          redirect="/admin"
          userType="admin"
        >
          {/* <SuperAdminLogin /> */}
          <AddJobCategory />
        </ProtectedRoute>

        <ProtectedRoute
          exact
          path="/admin/dashboard/update-job-category"
          redirect="/admin"
          userType="admin"
        >
          {/* <SuperAdminLogin /> */}
          <UpdateJobSubCategory />
        </ProtectedRoute>

        <ProtectedRoute exact path="/admin/dashboard/sms" redirect="/admin" userType="admin">
          <SuperAdminLogin />
          <SendSMS />
        </ProtectedRoute>




        <ProtectedRoute
          exact
          path="/admin/dashboard/jobseeker-search"
          redirect="/admin"
          userType="admin"
        >
          <JobseekerSearch />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path="/admin/dashboard/consultancy"
          redirect="/admin"
          userType="admin"
        >
          <StaffAdminLogin />
          <AdminConsultancies />
        </ProtectedRoute>
        <Redirect from="*" to="/admin/dashboard/approved-jobs/1" />
      </Switch>
    </div>
  );
};

export default AdminDashboard;
