// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Routes as RoutePaths } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";

import Kyc from "./Kyc";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import Riders from "./Riders";
import BookingTab from "./BookingTab";
import RidersTab from "./RidersTab";
import KycDetails from "./KycDetails";
import NewBookings from "./NewBookings";
import TripsTab from "./TripsTab";
import Trip from "./Trip";
// import Booking from './bookings/:bid/get';
import Booking from "./Booking";
import Map from "./Map";
import MapDirection from "./MapDirection";
import PrivateRoute from "./examples/PrivateRoute";
import UserManagment from "./UserManagment";
import InviteUser from "./examples/InviteUser";
import { geocodeAddress } from "../Utils/GeocodeService";
import MapLocationFinder from "./MapLocationFinder";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "../pages/examples/Unauthorized";
import InitialAccess from "./examples/InitialAccess";
import UpdateUserProfile from "./UpdateUserProfile";
import UpdateProfile from "./UpdateProfile";

// import Kyc from '../pages/Kyc';

const RouteWithLoader = ({ element }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader show={!loaded} />
      {loaded && element}
    </>
  );
};

const RouteWithSidebar = ({ element }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={!loaded} />
      {loaded && (
        <>
          <Sidebar />
          <main className="content">
            <Navbar />
            {element}
            {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
          </main>
        </>
      )}
    </>
  );
};

export function HomePage() {
  const { auth } = useAuth();
  const [markers, setMarkers] = useState([]);

  console.log(auth, "AUTH");

  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/"
        element={
          auth?.token ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />
        }
      />

      <Route
        path={RoutePaths.Signin.path}
        element={<RouteWithLoader element={<Signin />} />}
      />
      <Route
        path={RoutePaths.Signup.path}
        element={<RouteWithLoader element={<Signup />} />}
      />
      <Route
        path={RoutePaths.unauthorized.path}
        element={<RouteWithLoader element={<Unauthorized />} />}
      />
      <Route
        path={RoutePaths.InitialAccess.path}
        element={<RouteWithLoader element={<InitialAccess />} />}
      />

      <Route
        path={RoutePaths.InviteUser.path}
        element={<RouteWithLoader element={<InviteUser />} />}
      />
      <Route
        path={RoutePaths.ForgotPassword.path}
        element={<RouteWithLoader element={<ForgotPassword />} />}
      />
      <Route
        path={RoutePaths.ResetPassword.path}
        element={<RouteWithLoader element={<ResetPassword />} />}
      />
      <Route
        path={RoutePaths.Lock.path}
        element={<RouteWithLoader element={<Lock />} />}
      />
      <Route
        path={RoutePaths.NotFound.path}
        element={<RouteWithLoader element={<NotFoundPage />} />}
      />
      <Route
        path={RoutePaths.ServerError.path}
        element={<RouteWithLoader element={<ServerError />} />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            requiredRoles={["superadmin", "admin", "user"]}
            element={<RouteWithSidebar element={<DashboardOverview />} />}
          />
        }
      />

      <Route
        path={RoutePaths.Upgrade.path}
        element={<RouteWithSidebar element={<Upgrade />} />}
      />
      <Route
        path={RoutePaths.Transactions.path}
        element={<RouteWithSidebar element={<Transactions />} />}
      />
      <Route
        path={RoutePaths.Kyc.path}
        element={<RouteWithSidebar element={<Kyc />} />}
      />
      <Route
        path={RoutePaths.KycDetails.path}
        element={<RouteWithSidebar element={<KycDetails />} />}
      />
      <Route
        path={RoutePaths.RiderDetails.path}
        element={<RouteWithSidebar element={<Riders />} />}
      />
      <Route
        path={RoutePaths.NewBooking.path}
        element={<RouteWithSidebar element={<NewBookings />} />}
      />
      <Route
        path={RoutePaths.Bookings.path}
        element={<RouteWithSidebar element={<BookingTab />} />}
      />
      <Route
        path={RoutePaths.Booking.path}
        element={<RouteWithSidebar element={<Booking />} />}
      />
      <Route
        path={RoutePaths.TripsTab.path}
        element={<RouteWithSidebar element={<TripsTab />} />}
      />
      <Route
        path={RoutePaths.Trip.path}
        element={<RouteWithSidebar element={<Trip />} />}
      />
      <Route
        path={RoutePaths.Riders.path}
        element={<RouteWithSidebar element={<RidersTab />} />}
      />
      <Route
        path={RoutePaths.UserManagment.path}
        element={<RouteWithSidebar element={<UserManagment />} />}
      />
      <Route
        path={RoutePaths.UpdateUserProfile.path}
        element={<RouteWithSidebar element={<UpdateUserProfile />} />}
      />
      <Route
        path={RoutePaths.Settings.path}
        element={<RouteWithSidebar element={<Settings />} />}
      />
      <Route
        path={RoutePaths.BootstrapTables.path}
        element={<RouteWithSidebar element={<BootstrapTables />} />}
      />
      <Route
        path={RoutePaths.UpdateProfile.path}
        element={<RouteWithSidebar element={<UpdateProfile />} />}
      />
      <Route path="/map/map" element={Map} />

      {/* components */}
      <Route
        path={RoutePaths.Accordions.path}
        element={<RouteWithSidebar element={<Accordion />} />}
      />
      <Route
        path={RoutePaths.Alerts.path}
        element={<RouteWithSidebar element={<Alerts />} />}
      />
      <Route
        path={RoutePaths.Badges.path}
        element={<RouteWithSidebar element={<Badges />} />}
      />
      <Route
        path={RoutePaths.Breadcrumbs.path}
        element={<RouteWithSidebar element={<Breadcrumbs />} />}
      />
      <Route
        path={RoutePaths.Buttons.path}
        element={<RouteWithSidebar element={<Buttons />} />}
      />
      <Route
        path={RoutePaths.Forms.path}
        element={<RouteWithSidebar element={<Forms />} />}
      />
      <Route
        path={RoutePaths.Modals.path}
        element={<RouteWithSidebar element={<Modals />} />}
      />
      <Route
        path={RoutePaths.Navs.path}
        element={<RouteWithSidebar element={<Navs />} />}
      />
      <Route
        path={RoutePaths.Navbars.path}
        element={<RouteWithSidebar element={<Navbars />} />}
      />
      <Route
        path={RoutePaths.Pagination.path}
        element={<RouteWithSidebar element={<Pagination />} />}
      />
      <Route
        path={RoutePaths.Popovers.path}
        element={<RouteWithSidebar element={<Popovers />} />}
      />
      <Route
        path={RoutePaths.Progress.path}
        element={<RouteWithSidebar element={<Progress />} />}
      />
      <Route
        path={RoutePaths.Tables.path}
        element={<RouteWithSidebar element={<Tables />} />}
      />
      <Route
        path={RoutePaths.Tabs.path}
        element={<RouteWithSidebar element={<Tabs />} />}
      />
      <Route
        path={RoutePaths.Tooltips.path}
        element={<RouteWithSidebar element={<Tooltips />} />}
      />
      <Route
        path={RoutePaths.Toasts.path}
        element={<RouteWithSidebar element={<Toasts />} />}
      />

      {/* documentation */}
      <Route
        path={RoutePaths.DocsOverview.path}
        element={<RouteWithSidebar element={<DocsOverview />} />}
      />
      <Route
        path={RoutePaths.DocsDownload.path}
        element={<RouteWithSidebar element={<DocsDownload />} />}
      />
      <Route
        path={RoutePaths.DocsQuickStart.path}
        element={<RouteWithSidebar element={<DocsQuickStart />} />}
      />
      <Route
        path={RoutePaths.DocsLicense.path}
        element={<RouteWithSidebar element={<DocsLicense />} />}
      />
      <Route
        path={RoutePaths.DocsFolderStructure.path}
        element={<RouteWithSidebar element={<DocsFolderStructure />} />}
      />
      <Route
        path={RoutePaths.DocsBuild.path}
        element={<RouteWithSidebar element={<DocsBuild />} />}
      />
      <Route
        path={RoutePaths.DocsChangelog.path}
        element={<RouteWithSidebar element={<DocsChangelog />} />}
      />
    </Routes>
  );
}
