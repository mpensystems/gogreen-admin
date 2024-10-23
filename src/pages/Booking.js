import React ,{useEffect,useState}from "react";
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
import { Card, Accordion } from '@themesberg/react-bootstrap';

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { CardWidget } from "../components/Card";
import BookingCard from "./components/BookingCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBookingByID } from "../api/adminApis";

export default () => {

  const { auth } = useAuth();
  const [booking , setBooking ] = useState(""); 
  const { bid } = useParams();
  console.log("bid here : ",bid);
  
  useEffect(() => {
    const token = auth?.token;
    console.log("token inside try of booking : ",token);

    const fetchBookingdata = async () => {
      try {
        const response = await getBookingByID(token,bid);
        const bookingDetails = response;
        console.log("bookingDetails : ", bookingDetails);
        setBooking(bookingDetails);

      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchBookingdata();
  }, []);



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
          <BookingCard title="Pickup Location" booking={booking} type="pickup"/>
        </Col>
        <Col  className="mx-3">
          <BookingCard  title="Drop Location" booking={booking}/>
        </Col>
       

        
      </Row>
      <Row>
      <Col className="col-md-6 col-lg-6 mb-4">
    <Card border="light" className="bg-white shadow-sm ">
      <Card.Body className="">
        
        <div className="d-flex justify-content- align-items-center">
          <Card.Title style={{marginRight:"20px"}}>PickUp Name : </Card.Title>
          <Card.Subtitle className="fw-normal mb-0">{booking?.pickup_name}</Card.Subtitle>
        </div>
        <div className="d-flex justify-content- align-items-center">
          <Card.Title style={{marginRight:"20px"}}>PickUp Mobile : </Card.Title>
          <Card.Subtitle className="fw-normal mb-0">{booking?.pickup_mobile}</Card.Subtitle>
        </div>
      </Card.Body>
    </Card>
  </Col>

  <Col className="col-md-6 col-lg-6">
    <Card border="light" className="bg-white shadow-sm ">
      <Card.Body className="">
        
        <div className="d-flex justify-content- align-items-center">
          <Card.Title style={{marginRight:"20px"}}>Drop Name : </Card.Title>
          <Card.Subtitle className="fw-normal mb-0">{booking?.drop_name}</Card.Subtitle>
        </div>
        <div className="d-flex justify-content- align-items-center">
          <Card.Title style={{marginRight:"20px"}}>Drop Mobile : </Card.Title>
          <Card.Subtitle className="fw-normal mb-0">{booking?.drop_name}</Card.Subtitle>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>

      <Row>
            
            <Col>
              <CardWidget Title="Current Step" Content="currentStep" booking={booking} />
            </Col>
            <Col>
              {/* <CardWidget Title="Current Bid Amount" Content={`Rs ${45}`} /> */}
              <CardWidget Title="Current Bid Amount" Content="currentBid" booking={booking} />
            </Col>
            <Col>
              <CardWidget Title="Trip Distance" Content="distance" booking={booking}/>
            </Col>
          </Row>
    </>
  );
};
