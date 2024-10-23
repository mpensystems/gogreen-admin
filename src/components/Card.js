
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';
import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";



export const CardWidget = ({Title,Content,booking}) => {
    return (
      <Card border="light" className="text-center p-0 mb-4">
        <Card.Body className="pb-5">
          <Card.Title>{Title}</Card.Title>
          {/* <Card.Subtitle className="fw-normal mb-4">23 km</Card.Subtitle> */}
          {/* <Card.Text className="text-gray ">New York, USA</Card.Text> */}
  
          
          
          <Button variant="secondary" size="sm" className="p-3">
  {Content == "currentStep" ? (
    <div>{booking?.bidConfig?.current_step}</div>
  ) : 
    Content == "currentBid" ? 
      (
      <div>{booking?.bidConfig?.current_step}</div>
    )
    :
    (
      <div>
        {/* {booking?.( booking.trip_distance/ 1000).toFixed(2) } Kms */}
        {booking?.trip_distance ? (booking.trip_distance / 1000).toFixed(2) : 0} Kms

      </div>
    )
  
  }
</Button>

        </Card.Body>
      </Card>
    );
  };