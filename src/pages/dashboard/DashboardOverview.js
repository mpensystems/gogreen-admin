
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle,faMoneyCheck, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget, RidersWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import MapDirection from "../MapDirection";
import Map from "../Map";



export default () => {

  const pickup = { lat: 28.6139, lng: 77.2090 }; // Example pickup location (Central Delhi)
const dropoff = { lat: 28.6150, lng: 77.2120 }; // Example dropoff location (Nearby area in Delhi)

const markers = [
  {
    position: { lat: 28.6139, lng: 77.2090 },
    riderName: 'Captain America',
    description: 'Avenger '
  },
  {
    position: { lat: 19.0760, lng: 72.8777 },
    riderName: 'Thor',
    description: 'Asgaurd'
  },
  {
    position: { lat: 13.0827, lng: 80.2707 },
    riderName: 'IronMan',
    description: 'Avenger Tony Stark'
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
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <RidersWidget
            category="TOTAL RIDERS"
            title="3458"
            icon={faMotorcycle}
            iconColor="green"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <RidersWidget
            category="ACTIVE RIDERS"
            title="594"
            icon={faMotorcycle}
            iconColor="#FA5252"

          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <RidersWidget
            category="TOTAL SPENT"
            title="RS. 34,594"
            icon={faMoneyCheck}
            iconColor="#61DAFB"

          />
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
