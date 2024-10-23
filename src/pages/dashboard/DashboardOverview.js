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
       
  },[auth])

  console.log("response from useSatet of state ",statistics);
  
  const markers = [
    {
      position: { lat: 28.6139, lng: 77.209 },
      riderName: "Captain America",
      description: "Avenger ",
    },
    {
      position: { lat: 19.076, lng: 72.8777 },
      riderName: "Thor",
      description: "Asgaurd",
    },
    {
      position: { lat: 13.0827, lng: 80.2707 },
      riderName: "IronMan",
      description: "Avenger Tony Stark",
    },
  ];
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        {/* <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup> */}
      </div>

      {/* <Row>
      <Col xs={12} sm={6} xl={4} className="mb-4">
          <RidersWidget
            category="TOTAL RIDERS"
            title = {statistics?.total_riders}
            icon={faMotorcycle}
            iconColor="green"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <RidersWidget
            category="ACTIVE RIDERS"
            title={statistics?.active_riders}
            icon={faMotorcycle}
            iconColor="#FA5252"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <RidersWidget
            category="TOTAL SPENT"
            title={"Rs. "+ statistics?.today_earnings}
            icon={faMoneyCheck}
            iconColor="#61DAFB"
          />
        </Col>

      </Row> */}





<Row>
  <Col xs={12} sm={6} xl={3} className="mb-4">
    <RidersWidget
      category="Total Riders"
      title={statistics?.total_riders}
      icon={faMotorcycle} // Correct for riders
      iconColor="green"
      iconSize="2x" 
      // fontSize="1.5rem"
    />
  </Col>

  <Col xs={12} sm={6} xl={3} className="mb-4">
    <RidersWidget
      category="Active Riders"
      title={statistics?.active_riders}
      icon={faUserCheck} // Updated icon for active riders
      iconColor="#FA5252"
      iconSize="2x"
    />
  </Col>

  <Col xs={12} sm={6} xl={3} className="mb-4">
    <RidersWidget
      category="Today's Earnings"
      title={"Rs. " + statistics?.today_earnings}
      icon={faMoneyBillWave} // Icon for earnings
      iconColor="#61DAFB"
      iconSize="2x"
      // fontSize="1.5rem"
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
</Row>

<Row>
  <Col xs={12} sm={6} xl={4} className="mb-4">
    <RidersWidget
      category="Today's Riders Earnings"
      title={"Rs. " + statistics?.today_rider_earnings}
      icon={faMoneyCheck} // Icon for rider earnings
      iconColor="red"
      iconSize="2x"
      // fontSize="1.5rem"
    />
  </Col>

  <Col xs={12} sm={6} xl={4} className="mb-4">
    <RidersWidget
      category="Trips in Progress"
      title={statistics?.trips_inprogress}
      icon={faRoute} // Icon for trips
      iconColor="#FFD700"
      iconSize="2x"
      // // fontSize="1.5rem"
    />
  </Col>

  <Col xs={12} sm={6} xl={4} className="mb-4">
    <RidersWidget
      category="Today's Trips"
      title={statistics?.today_trips}
      icon={faTachometerAlt} // Icon for total trips
      iconColor="#4CAF50"
      iconSize="2x"
      // fontSize="1.5rem"

    />
  </Col>
</Row>


      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <Map markers={markers} pickup={pickup} dropoff={dropoff} />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          {/* <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          /> */}
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          {/* <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          /> */}
        </Col>
        

        {/* <Col xs={12} sm={6} xl={4} className="mb-4">
          <RidersWidget
            category="ACTIVE RIDERS"
            title="594"
            icon={faMotorcycle}
          />
        </Col> */}
      </Row>

      {/* <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row> */}
    </>
  );
};
