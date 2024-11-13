import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMotorcycle,
  faMoneyCheck,
  faUserCheck,
  faMoneyBillWave,
  faShoppingCart,
  faRoute,
  faTachometerAlt,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { faSync } from '@fortawesome/free-solid-svg-icons';

import {
  CounterWidget,
  CircleChartWidget,
  BarChartWidget,
  TeamMembersWidget,
  ProgressTrackWidget,
  RankingWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  AcquisitionWidget,
  RidersWidget,
} from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import MapDirection from "../MapDirection";
import Map from "../Map";
import { useAuth } from "../../context/AuthContext";
import { getHomeStatistics } from "../../api/adminApis";

export default () => {

  const [statistics, setStatistics] = useState();
  const [ refresh,setRefresh] = useState(false);

  const pickup = { lat: 28.6139, lng: 77.209 };
  const dropoff = { lat: 28.615, lng: 77.212 };

  const {auth}  = useAuth();
  const token = auth.token ;


  useEffect (()=>{
    
          const fetchStatistics = async () => {
            try {
              // console.log("inside try ");
              const response = await getHomeStatistics(token);
              console.log("Home Statistics in dashboard overview: ", response);
              // setRiderList(riders);
              setStatistics(response);
            } catch (error) {
              console.log("Error while fetching the data", error);
            }
          };
      
          fetchStatistics();
       
  },[auth,refresh])

  console.log("response from useSatet of state ",statistics);

  
  const refreshMap = ()=>{
    console.log("refresh the map also");
    setRefresh(true);
    
  }
  console.log('refresh here : ', refresh);
  
 
  return (
    <>
      <div className="d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4">
      {/* <div className='d-flex justify-content-end mb-2'> */}
        <Button  onClick={()=>refreshMap()}>
          Refresh  {" "} <FontAwesomeIcon icon={faSync} />
        </Button>
      {/* </div> */}
      </div>

   





<Row>
<h4>General Sales</h4>
<Col xs={12} sm={6} xl={3} className="mb-4">
    <RidersWidget
      category="Today's Trips"
      title={statistics?.today_trips}
      icon={faTachometerAlt} // Icon for total trips
      iconColor="#FA5252"
      iconSize="2x"
      // fontSize="1.5rem"

    />
  </Col>
  
  <Col xs={12} sm={6} xl={3} className="mb-4">
    <RidersWidget
      category="Trips in Progress"
      title={statistics?.trips_inprogress}
      icon={faRoute} // Icon for trips
      iconColor="#FFD700"
      iconSize="2x"
      // // fontSize="1.5rem"
    />
  </Col>

  <Col xs={12} sm={6} xl={3} className="mb-4">
    <RidersWidget
      category="Today's Bookings"
      title={statistics?.today_bookings}
      icon={faShoppingCart} 
      iconColor="#FF9800"
      iconSize="2x"
      // fontSize="1.5rem"
    />
  </Col>

  <Col xs={12} sm={6} xl={3} className="mb-4">
    <RidersWidget
      category="Today's Earnings"
      title={"Rs. " + statistics?.today_earnings}
      icon={faMoneyBillWave} // Icon for earnings
      iconColor="#4CAF50"
      iconSize="2x"
      // fontSize="1.5rem"
    />
  </Col>

 
</Row>

<Row>
  <h4>Rider Section</h4>

  <Col xs={12} sm={6} xl={4} className="mb-4">
    <RidersWidget
      category="Total Riders"
      title={statistics?.total_riders}
      icon={faMotorcycle} // Correct for riders
      iconColor="green"
      iconSize="2x" 
      // fontSize="1.5rem"
    />
  </Col>

  <Col xs={12} sm={6} xl={4} className="mb-4">
    <RidersWidget
      category="Active Riders"
      title={statistics?.active_riders}
      icon={faUserCheck} // Updated icon for active riders
      iconColor="#61DAFB"
      iconSize="2x"
    />
  </Col>

  <Col xs={12} sm={6} xl={4} className="mb-4">
    <RidersWidget
      category="Today's Riders Earnings"
      title={"Rs. " + statistics?.today_rider_earnings}
      icon={faMoneyCheck} 
      iconColor="red"
      iconSize="2x"
      // fontSize="1.5rem"
    />
  </Col>
</Row>


      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <Map  pickup={pickup} dropoff={dropoff} refresh={refresh} setRefresh={setRefresh}/>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
         
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
        
        </Col>
        

        
      </Row>

    
    </>
  );
};





















