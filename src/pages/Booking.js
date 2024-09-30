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
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { CardWidget } from "../components/Card";
import BookingCard from "./components/BookingCard";
import { useNavigate } from "react-router-dom";

export default () => {

    const navigate= useNavigate()
    const handleBackToBookings = ()=>{
     navigate('/bookings');
    }
  return (
    <>
      <Col xs={12} xl={1}>
          {/* <ProfileCardWidget /> */}

          <Button onClick={()=>handleBackToBookings()} variant="light" className="shadow-sm mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faArrowLeft} /> 
            <span className="ms-2">Back</span>
          </Button>
        </Col>
      <Row>
        <Col className="mx-3">
          <BookingCard title="Pickup Location"/>
        </Col>
        <Col  className="mx-3">
          <BookingCard  title="Drop Location"/>
        </Col>
       

        
      </Row>
      <Row>
            
            <Col>
              <CardWidget Title="Current Step" Content="5" />
            </Col>
            <Col>
              {/* <CardWidget Title="Current Bid Amount" Content={`Rs ${45}`} /> */}
              <CardWidget Title="Current Bid Amount" Content={`Rs 45`} />
            </Col>
            <Col>
              <CardWidget Title="Trip Distance" Content="23 km" />
            </Col>
          </Row>
    </>
  );
};
