import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/Login';
import RecoveryPassword from 'pages/RecoveryPassword';
// import People from 'pages/peopleHub/index';
// import HomeV2 from 'pages/HomeV2/index';
import ProtectedRoute from 'routes/protectedRoute';
// import Connections from 'pages/Connections';
import { CompanyComponent } from 'pages/App/components';
import { CreateWorkProvider } from 'context/createVacancy';
import { ConnectionsContextProvider } from 'context/connectionsContext';
// import MatchingHub from 'pages/MatchingHub';
// import Scheduler from 'pages/MatchingHub/Scheduler';
// import Analytics from 'pages/Analytics';
// import BusinessAnalytics from 'pages/Analytics/Business';
// import AdvancedAnalytics from 'pages/Analytics/Advanced';
// import AdminHome from 'pages/Admin/Home/AdminHome';
// import AlgorithmPage from '../pages/Analytics/Algorithm';

const HomeV2Lazy = React.lazy(() => import('pages/HomeV2/index'));
const PeopleLazy = React.lazy(() => import('pages/peopleHub/index'));
const AnalyticsLazy = React.lazy(() => import('pages/Analytics'));
const MatchingHubLazy = React.lazy(() => import('pages/MatchingHub'));
const AdminHomeLazy = React.lazy(() => import('pages/Admin/Home/AdminHome'));
const SchedulerLazy = React.lazy(() => import('pages/MatchingHub/Scheduler'));
const BusinessAnalyticsLazy = React.lazy(() => import('pages/Analytics/Business'));
const AdvancedAnalyticsLazy = React.lazy(() => import('pages/Analytics/Advanced'));
const AlgorithmPageLazy = React.lazy(() => import('../pages/Analytics/Algorithm'));
const HelpDeskPageLazy = React.lazy(() => import('../pages/MatchingHub/HelpDesk'));
const DatalyticsLazy = React.lazy(() => import('pages/Analytics/Datalytics'));
const ColaboratorsLazy = React.lazy(() => import('pages/Analytics/Colaborators'));
const ExperiencesLazy = React.lazy(() => import('pages/Analytics/Experiences'));

const RoutesApp = () => (
  <Routes>
    <Route exact path="/forgot-password" element={<RecoveryPassword />} />
    <Route exact path="/login" element={<Login />} />
    <Route
      exact
      path="/"
      element={
        <ProtectedRoute>
          <HomeV2Lazy />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/people"
      element={
        <ProtectedRoute>
          <PeopleLazy />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/analytics"
      element={
        <ProtectedRoute>
          <AnalyticsLazy />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/analytics/v2"
      element={
        <ProtectedRoute>
          <DatalyticsLazy />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/analytics/colaborators"
      element={
        <ProtectedRoute>
          <ColaboratorsLazy />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/analytics/experiences"
      element={
        <ProtectedRoute>
          <ExperiencesLazy />
        </ProtectedRoute>
      }
    />
    <Route exact path="/analytics/business-ops" element={<BusinessAnalyticsLazy />} />
    <Route exact path="/analytics/advanced" element={<AdvancedAnalyticsLazy />} />
    <Route exact path="/analytics/algorithm" element={<AlgorithmPageLazy />} />
    <Route
      exact
      path="/companies"
      element={
        <ProtectedRoute>
          <CreateWorkProvider>
            <CompanyComponent />
          </CreateWorkProvider>
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/matchinghub"
      element={
        <ProtectedRoute>
          <ConnectionsContextProvider>
            <MatchingHubLazy />
          </ConnectionsContextProvider>
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/matchinghub/scheduler"
      element={
        <ProtectedRoute>
          <SchedulerLazy />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/matchinghub/help-desk"
      element={
        <ProtectedRoute>
          <HelpDeskPageLazy />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/admin"
      element={
        <ProtectedRoute>
          <ConnectionsContextProvider>
            <AdminHomeLazy />
          </ConnectionsContextProvider>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default RoutesApp;
