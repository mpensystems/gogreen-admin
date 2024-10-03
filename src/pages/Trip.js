import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Dropdown } from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
// import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';
import { useNavigate } from "react-router-dom";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { CardWidget } from "../components/Card";
import MapDirection from "./MapDirection";

// import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

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

  const navigate = useNavigate();

  const handleBackTrip = ()=>{
    navigate(`/trips`);

  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

      <Row>
        
        <Col xs={12} xl={1}>
          {/* <ProfileCardWidget /> */}

          <Button onClick={handleBackTrip} variant="light" className="shadow-sm mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faArrowLeft} /> 
            <span className="ms-2">Back</span>
          </Button>
        </Col>

        <Col xs={12} xl={12}>
          {/* <ProfileCardWidget /> */}

          <Card border="light" className="bg-white shadow-sm mb-4">
          <MapDirection markers={markers} pickup={pickup} dropoff={dropoff} />          </Card>
        </Col>

        <Col xs={12} xl={12}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4"></Card>
            </Col>
            <Col>
              <CardWidget Title="Trip Distance" Content="23 km" />
            </Col>
            <Col>
              <CardWidget Title="PickUp location" Content="Mumbai" />
            </Col>
            <Col>
              <CardWidget Title="Drop location" Content="Pune" />
            </Col>
          </Row>
        </Col>

       
      </Row>
    </>
  );
};
