// import React, { useState, useEffect } from 'react';
// import { Route, Navigate } from "react-router-dom";
// import { Routes } from "../routes";

// // pages
// import Presentation from "./Presentation";
// import Upgrade from "./Upgrade";
// import DashboardOverview from "./dashboard/DashboardOverview";
// import Transactions from "./Transactions";
// import KYC from './Kyc';
// import Settings from "./Settings";
// import BootstrapTables from "./tables/BootstrapTables";
// import Signin from "./examples/Signin";
// import Signup from "./examples/Signup";
// import ForgotPassword from "./examples/ForgotPassword";
// import ResetPassword from "./examples/ResetPassword";
// import Lock from "./examples/Lock";
// import NotFoundPage from "./examples/NotFound";
// import ServerError from "./examples/ServerError";

// // documentation pages
// import DocsOverview from "./documentation/DocsOverview";
// import DocsDownload from "./documentation/DocsDownload";
// import DocsQuickStart from "./documentation/DocsQuickStart";
// import DocsLicense from "./documentation/DocsLicense";
// import DocsFolderStructure from "./documentation/DocsFolderStructure";
// import DocsBuild from "./documentation/DocsBuild";
// import DocsChangelog from "./documentation/DocsChangelog";

// // components
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Preloader from "../components/Preloader";

// import Accordion from "./components/Accordion";
// import Alerts from "./components/Alerts";
// import Badges from "./components/Badges";
// import Breadcrumbs from "./components/Breadcrumbs";
// import Buttons from "./components/Buttons";
// import Forms from "./components/Forms";
// import Modals from "./components/Modals";
// import Navs from "./components/Navs";
// import Navbars from "./components/Navbars";
// import Pagination from "./components/Pagination";
// import Popovers from "./components/Popovers";
// import Progress from "./components/Progress";
// import Tables from "./components/Tables";
// import Tabs from "./components/Tabs";
// import Tooltips from "./components/Tooltips";
// import Toasts from "./components/Toasts";

// const RouteWithLoader = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
//   );
// };

// const RouteWithSidebar = ({ component: Component, ...rest }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const localStorageIsSettingsVisible = () => {
//     return localStorage.getItem('settingsVisible') === 'false' ? false : true
//   }

//   const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

//   const toggleSettings = () => {
//     setShowSettings(!showSettings);
//     localStorage.setItem('settingsVisible', !showSettings);
//   }

//   return (
//     <Route {...rest} render={props => (
//       <>
//         <Preloader show={loaded ? false : true} />
//         <Sidebar />

//         <main className="content">
//           <Navbar />
//           <Component {...props} />
//           <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
//         </main>
//       </>
//     )}
//     />
//   );
// };

// export default () => (
//   <Routes>
//     <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
//     <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
//     <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
//     <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
//     <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
//     <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
//     <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
//     <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

//     {/* pages */}
//     <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
//     <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
//     <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
//     <RouteWithSidebar exact path={Routes.KYC.path} component={KYC} />
//     <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
//     <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

//     {/* components */}
//     <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
//     <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
//     <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
//     <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
//     <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
//     <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
//     <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
//     <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
//     <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
//     <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
//     <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
//     <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
//     <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
//     <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
//     <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
//     <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

//     {/* documentation */}
//     <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
//     <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
//     <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
//     <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
//     <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
//     <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
//     <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

//     <Navigate to={Routes.NotFound.path} />
//   </Routes>
// );











import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Routes as RoutePaths } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";

import Kyc from './Kyc';
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
import Riders from './Riders';
import BookingTab from './BookingTab';
import RidersTab from './RidersTab';
import KycDetails from './KycDetails';
import NewBookings from './NewBookings';
import TripsTab from './TripsTab';
import Trip from './Trip';
import Booking from './Booking';
import Map from './Map';
import MapDirection from './MapDirection';
import PrivateRoute from './examples/PrivateRoute';
import UserManagment from './UserManagment';
import InviteUser from './examples/InviteUser';
import { geocodeAddress } from '../Utils/GeocodeService';
import MapLocationFinder from './MapLocationFinder';
import { useAuth } from '../context/AuthContext';
import Unauthorized from '../pages/examples/Unauthorized';
import InitialAccess from './examples/InitialAccess';

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
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
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
const pickup = { lat: 28.6139, lng: 77.2090 }; // Example pickup location (Central Delhi)
const dropoff = { lat: 28.6150, lng: 77.2120 }; // Example dropoff location (Nearby area in Delhi)

// const markers = [
//   {
//     position: { lat: 28.6139, lng: 77.2090 },
//     riderName: 'Captain America',
//     description: 'Avenger '
//   },
//   {
//     position: { lat: 19.0760, lng: 72.8777 },
//     riderName: 'Thor',
//     description: 'Asgaurd'
//   },
//   {
//     position: { lat: 13.0827, lng: 80.2707 },
//     riderName: 'IronMan',
//     description: 'Avenger Tony Stark'
//   },
// ];

// const getLatLng = async() =>{
//   const address = "Room 2 bhartiyar chawl near tamilsangam ka road jarimari sakinaka 400072";
//   const   latlng = await geocodeAddress(address);
//   console.log(latlng,"LATLNG");
  
// }

// useEffect(()=>{
//   getLatLng();
//   console.log("CALLED")
// },[])



export  function HomePage() {

  const { auth } = useAuth();
  const [markers , setMarkers]  = useState([])


  // Redirect authenticated users to the dashboard

  if (auth?.token) {
    return <Navigate to="/dashboard" />;
  }

  console.log(auth,"AUTH");
  
  return (
    <Routes>
      {/* <Route path={RoutePaths.Presentation.path} element={<RouteWithLoader element={<Presentation />} />} /> */}
      {/* <Route path={RoutePaths.Presentation.path} element={<MapLocationFinder markers={markers}  setMarkers={setMarkers} pickup={pickup} dropoff={dropoff} />} /> */}

      {/* <Route path="/" element={<Signin/>} /> */}
      {/* <Route path="/" element={auth?.token ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} /> */}



      {/* <Route path={RoutePaths.Kyc.path} element={<RouteWithLoader element={<Kyc/>} />} />
      <Route path={RoutePaths.Riders.path} element={<RouteWithLoader element={<Riders/>} />} /> */}
      <Route path={RoutePaths.Signin.path} element={<RouteWithLoader element={<Signin />} />} />
      <Route path={RoutePaths.Signup.path} element={<RouteWithLoader element={<Signup />} />} />
      <Route path={RoutePaths.unauthorized.path} element={<RouteWithLoader element={<Unauthorized/>} />} />
      <Route path={RoutePaths.InitialAccess.path} element={<RouteWithLoader element={<InitialAccess/>} />} />

      <Route path={RoutePaths.InviteUser.path} element={<RouteWithLoader element={<InviteUser />} />} />
      <Route path={RoutePaths.ForgotPassword.path} element={<RouteWithLoader element={<ForgotPassword />} />} />
      <Route path={RoutePaths.ResetPassword.path} element={<RouteWithLoader element={<ResetPassword />} />} />
      <Route path={RoutePaths.Lock.path} element={<RouteWithLoader element={<Lock />} />} />
      <Route path={RoutePaths.NotFound.path} element={<RouteWithLoader element={<NotFoundPage />} />} />
      <Route path={RoutePaths.ServerError.path} element={<RouteWithLoader element={<ServerError />} />} />



       {/* <Route
        path="/dashboard"
        element={<PrivateRoute requiredRole="admin" element={<RouteWithSidebar element={<DashboardOverview />} />} />}
      />  */}

      {/* pages */}
      <Route path={RoutePaths.DashboardOverview.path} element={<RouteWithSidebar element={<DashboardOverview/>} />} />
      <Route path={RoutePaths.Upgrade.path} element={<RouteWithSidebar element={<Upgrade />} />} />
      <Route path={RoutePaths.Transactions.path} element={<RouteWithSidebar element={<Transactions />} />} />
      <Route path={RoutePaths.Kyc.path} element={<RouteWithSidebar element={<Kyc />} />} />
      <Route path={RoutePaths.KycDetails.path} element={<RouteWithSidebar element={<KycDetails />} />} />
      <Route path={RoutePaths.RiderDetails.path} element={<RouteWithSidebar element={<Riders />} />} />
      <Route path={RoutePaths.NewBooking.path} element={<RouteWithSidebar element={<NewBookings />} />} />
      <Route path={RoutePaths.Bookings.path} element={<RouteWithSidebar element={<BookingTab />} />} />
      <Route path={RoutePaths.Booking.path} element={<RouteWithSidebar element={<Booking />} />} />
      <Route path={RoutePaths.TripsTab.path} element={<RouteWithSidebar element={<TripsTab />} />} />
      <Route path={RoutePaths.Trip.path} element={<RouteWithSidebar element={<Trip />} />} />
      <Route path={RoutePaths.Riders.path} element={<RouteWithSidebar element={<RidersTab />} />} />
      <Route path={RoutePaths.UserManagment.path} element={<RouteWithSidebar element={<UserManagment />} />} />
      <Route path={RoutePaths.Settings.path} element={<RouteWithSidebar element={<Settings />} />} />
      <Route path={RoutePaths.BootstrapTables.path} element={<RouteWithSidebar element={<BootstrapTables />} />} />
      <Route path="/map/map" element={Map} />
    

      {/* components */}
      <Route path={RoutePaths.Accordions.path} element={<RouteWithSidebar element={<Accordion />} />} />
      <Route path={RoutePaths.Alerts.path} element={<RouteWithSidebar element={<Alerts />} />} />
      <Route path={RoutePaths.Badges.path} element={<RouteWithSidebar element={<Badges />} />} />
      <Route path={RoutePaths.Breadcrumbs.path} element={<RouteWithSidebar element={<Breadcrumbs />} />} />
      <Route path={RoutePaths.Buttons.path} element={<RouteWithSidebar element={<Buttons />} />} />
      <Route path={RoutePaths.Forms.path} element={<RouteWithSidebar element={<Forms />} />} />
      <Route path={RoutePaths.Modals.path} element={<RouteWithSidebar element={<Modals />} />} />
      <Route path={RoutePaths.Navs.path} element={<RouteWithSidebar element={<Navs />} />} />
      <Route path={RoutePaths.Navbars.path} element={<RouteWithSidebar element={<Navbars />} />} />
      <Route path={RoutePaths.Pagination.path} element={<RouteWithSidebar element={<Pagination />} />} />
      <Route path={RoutePaths.Popovers.path} element={<RouteWithSidebar element={<Popovers />} />} />
      <Route path={RoutePaths.Progress.path} element={<RouteWithSidebar element={<Progress />} />} />
      <Route path={RoutePaths.Tables.path} element={<RouteWithSidebar element={<Tables />} />} />
      <Route path={RoutePaths.Tabs.path} element={<RouteWithSidebar element={<Tabs />} />} />
      <Route path={RoutePaths.Tooltips.path} element={<RouteWithSidebar element={<Tooltips />} />} />
      <Route path={RoutePaths.Toasts.path} element={<RouteWithSidebar element={<Toasts />} />} />

      {/* documentation */}
      <Route path={RoutePaths.DocsOverview.path} element={<RouteWithSidebar element={<DocsOverview />} />} />
      <Route path={RoutePaths.DocsDownload.path} element={<RouteWithSidebar element={<DocsDownload />} />} />
      <Route path={RoutePaths.DocsQuickStart.path} element={<RouteWithSidebar element={<DocsQuickStart />} />} />
      <Route path={RoutePaths.DocsLicense.path} element={<RouteWithSidebar element={<DocsLicense />} />} />
      <Route path={RoutePaths.DocsFolderStructure.path} element={<RouteWithSidebar element={<DocsFolderStructure />} />} />
      <Route path={RoutePaths.DocsBuild.path} element={<RouteWithSidebar element={<DocsBuild />} />} />
      <Route path={RoutePaths.DocsChangelog.path} element={<RouteWithSidebar element={<DocsChangelog />} />} />
    </Routes>
  );
}
