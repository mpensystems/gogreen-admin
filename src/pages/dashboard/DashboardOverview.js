// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMotorcycle,
//   faMoneyCheck,
//   faUserCheck,
//   faMoneyBillWave,
//   faShoppingCart,
//   faRoute,
//   faTachometerAlt,
//   faCloudUploadAlt,
//   faPlus,
//   faRocket,
//   faTasks,
//   faUserShield,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   Col,
//   Row,
//   Button,
//   Dropdown,
//   ButtonGroup,
// } from "@themesberg/react-bootstrap";
// import { faSync } from '@fortawesome/free-solid-svg-icons';

// import {
//   CounterWidget,
//   CircleChartWidget,
//   BarChartWidget,
//   TeamMembersWidget,
//   ProgressTrackWidget,
//   RankingWidget,
//   SalesValueWidget,
//   SalesValueWidgetPhone,
//   AcquisitionWidget,
//   RidersWidget,
// } from "../../components/Widgets";
// import { PageVisitsTable } from "../../components/Tables";
// import { trafficShares, totalOrders } from "../../data/charts";
// import MapDirection from "../MapDirection";
// import Map from "../Map";
// import { useAuth } from "../../context/AuthContext";
// import { getHomeStatistics } from "../../api/adminApis";

// export default () => {

//   const [statistics, setStatistics] = useState();
//   const [ refresh,setRefresh] = useState(false);

//   const pickup = { lat: 28.6139, lng: 77.209 };
//   const dropoff = { lat: 28.615, lng: 77.212 };

//   const {auth}  = useAuth();
//   const token = auth.token ;


//   useEffect (()=>{
    
//           const fetchStatistics = async () => {
//             try {
//               // console.log("inside try ");
//               const response = await getHomeStatistics(token);
//               console.log("Home Statistics in dashboard overview: ", response);
//               // setRiderList(riders);
//               setStatistics(response);
//             } catch (error) {
//               console.log("Error while fetching the data", error);
//             }
//           };
      
//           fetchStatistics();
       
//   },[auth,refresh])

//   console.log("response from useSatet of state ",statistics);

  
//   const refreshMap = ()=>{
//     console.log("refresh the map also");
//     setRefresh(true);
    
//   }
//   console.log('refresh here : ', refresh);
  
 
//   return (


// <>
// <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4">
//   <Button onClick={() => refreshMap()}>
//   Resync <FontAwesomeIcon icon={faSync} className="mx-2"/>
//   </Button>
// </div>

// <Row>
//   <h4>Operational Highlights</h4>
//   <Col xs={12} sm={6} xl={3} className="mb-4">
//     <RidersWidget
//       category="Today's Trips"
//       title={statistics?.today_trips}
//       icon={faTachometerAlt}
//       iconColor="#FA5252"
//       iconSize="2x"
//     />
//   </Col>
//   <Col xs={12} sm={6} xl={3} className="mb-4">
//     <RidersWidget
//       category="Trips in Progress"
//       title={statistics?.trips_inprogress}
//       icon={faRoute}
//       iconColor="#FFD700"
//       iconSize="2x"
//     />
//   </Col>
//   <Col xs={12} sm={6} xl={3} className="mb-4">
//     <RidersWidget
//       category="Today's Bookings"
//       title={statistics?.today_bookings}
//       icon={faShoppingCart}
//       iconColor="#FF9800"
//       iconSize="2x"
//     />
//   </Col>
//   <Col xs={12} sm={6} xl={3} className="mb-4">
//     <RidersWidget
//       category="Earnings from Today's Trips"
//       title={`Rs. ${statistics?.today_earnings}`}
//       icon={faMoneyBillWave}
//       iconColor="#4CAF50"
//       iconSize="2x"
//     />
//   </Col>
// </Row>

// <Row>
//   <h4>Rider Engagement & Earnings</h4>
//   <Col xs={12} sm={6} xl={4} className="mb-4">
//     <RidersWidget
//       category="Total Riders"
//       title={statistics?.total_riders}
//       icon={faMotorcycle}
//       iconColor="green"
//       iconSize="2x"
//     />
//   </Col>
//   <Col xs={12} sm={6} xl={4} className="mb-4">
//     <RidersWidget
//       category="Active Riders"
//       title={statistics?.active_riders}
//       icon={faUserCheck}
//       iconColor="#61DAFB"
//       iconSize="2x"
//     />
//   </Col>
//   <Col xs={12} sm={6} xl={4} className="mb-4">
//     <RidersWidget
//       category="Today's Riders Earnings"
//       title={`Rs. ${statistics?.today_rider_earnings}`}
//       icon={faMoneyCheck}
//       iconColor="red"
//       iconSize="2x"
//     />
//   </Col>
// </Row>

// <Row className="justify-content-md-center">
//   <Col xs={12} className="mb-4">
//     <Map pickup={pickup} dropoff={dropoff} refresh={refresh} setRefresh={setRefresh} />
//   </Col>
// </Row>
// </>
//   );
// };
















import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faUser, faCalendar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Spinner, Card } from "@themesberg/react-bootstrap";
import { RidersWidget } from "../../components/Widgets";
import Map from "../Map";
import { useAuth } from "../../context/AuthContext";
import { getHomeStatistics } from "../../api/adminApis";

export default () => {
  const [statistics, setStatistics] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { auth } = useAuth();
  const token = auth.token;

  const pickup = { lat: 28.6139, lng: 77.209 };
  const dropoff = { lat: 28.615, lng: 77.212 };

  // Fetch statistics data
  const fetchStatistics = async () => {
    setRefreshing(true); // Show loader during data fetch
    try {
      const response = await getHomeStatistics(token);
      setStatistics(response);
    } catch (error) {
      console.error("Error while fetching the data", error);
    } finally {
      setRefreshing(false); // Hide loader once data is fetched
    }
  };

  // Trigger fetching when the component mounts or refresh is triggered
  useEffect(() => {
    fetchStatistics();
  }, [token]);

  // Handle the refresh button click
  const handleRefresh = () => {
    fetchStatistics();
  };

  return (
    <>
      {/* Refresh Button */}
      <div className="d-flex justify-content-end align-items-center py-4">
        <Button
          variant="outline-primary"
          onClick={handleRefresh}
          className="rounded-circle p-2"
          style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {refreshing ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : (
            <FontAwesomeIcon icon={faSync} size="lg" />
          )}
        </Button>
      </div>

      {/* Operational Highlights Section */}
      {statistics ? (
        <>
          <Row>
            <h4>Operational Highlights</h4>
            <Col xs={12} sm={6} xl={3} className="mb-4">
              <RidersWidget
                category="Today's Trips"
                title={statistics?.today_trips}
                icon={<FontAwesomeIcon icon={faCalendar} size="2x" />}
                iconColor="#FA5252"
                refreshing={refreshing}
              />
            </Col>
            <Col xs={12} sm={6} xl={3} className="mb-4">
              <RidersWidget
                category="Trips in Progress"
                title={statistics?.trips_inprogress}
                icon={<FontAwesomeIcon icon={faSync} size="2x" />}
                iconColor="#FFD700"
                refreshing={refreshing}
              />
            </Col>
            <Col xs={12} sm={6} xl={3} className="mb-4">
              <RidersWidget
                category="Today's Bookings"
                title={statistics?.today_bookings}
                icon={<FontAwesomeIcon icon={faCalendar} size="2x" />}
                iconColor="#FF9800"
                refreshing={refreshing}
              />
            </Col>
            <Col xs={12} sm={6} xl={3} className="mb-4">
              <RidersWidget
                category="Earnings from Today's Trips"
                title={`Rs. ${statistics?.today_earnings}`}
                icon={<FontAwesomeIcon icon={faDollarSign} size="2x" />}
                iconColor="#4CAF50"
                refreshing={refreshing}
              />
            </Col>
          </Row>

          {/* Rider Engagement & Earnings Section */}
          <Row>
            <h4>Rider Engagement & Earnings</h4>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <RidersWidget
                category="Total Riders"
                title={statistics?.total_riders}
                icon={<FontAwesomeIcon icon={faUser} size="2x" />}
                iconColor="green"
                refreshing={refreshing}
              />
            </Col>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <RidersWidget
                category="Active Riders"
                title={statistics?.active_riders}
                icon={<FontAwesomeIcon icon={faUser} size="2x" />}
                iconColor="#61DAFB"
                refreshing={refreshing}
              />
            </Col>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <RidersWidget
                category="Today's Riders Earnings"
                title={`Rs. ${statistics?.today_rider_earnings}`}
                icon={<FontAwesomeIcon icon={faDollarSign} size="2x" />}
                iconColor="red"
                refreshing={refreshing}
              />
            </Col>
          </Row>

          {/* Map Section */}
          <Row className="justify-content-md-center">
            <Col xs={12} className="mb-4">
              <Map
                pickup={pickup}
                dropoff={dropoff}
                refreshing={refreshing} // Pass the refreshing state for Map to show loader
              />
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading data...</p>
        </div>
      )}
    </>
  );
};
