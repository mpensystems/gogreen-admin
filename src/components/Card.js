
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';
import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchAggregation } from "../api/adminApis";
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';


export const CardWidget = ({Title,Content,booking}) => {
  const [data, setData] = useState({});
  const {rid} = useParams();
  
  const aggregation ="all";
  const{auth}= useAuth();
  const token = auth?.token;

  useEffect(()=>{
    const fetchAggregationData = async () => {
      
      try {
        const response = await fetchAggregation(token, rid, aggregation); 
        setData(response); 
        // setIsLoading(false); 
      } catch (error) {
        console.log("Error while fetching the data", error);
        // setIsLoading(false);
      }
    };

    fetchAggregationData();
  },[token , rid])



    return (
      <Card border="light" className="text-center p-0 mb-4">
        <Card.Body className="pb-5">
          <Card.Title>{Title}</Card.Title>
          {/* <Card.Subtitle className="fw-normal mb-4">23 km</Card.Subtitle> */}
          {/* <Card.Text className="text-gray ">New York, USA</Card.Text> */}
  
          
          
          <Button variant="secondary" size="sm" className="p-3">
  {Title == "Today's Earning" ? (
    <div><span style={{ marginRight: '8px' }}><FontAwesomeIcon icon={faRupeeSign} /></span>{data?.today?.earnings}</div>
  ) : 
    Title == "Weekly Earning" ? 
      (
      <div ><span style={{ marginRight: '8px' }}><FontAwesomeIcon icon={faRupeeSign} /></span> {data?.this_week?.earnings}</div>
      
    )
    :
    (
      <div>
{booking ? (booking.trip_distance / 1000).toFixed(2) : ''} Kms
<span style={{ marginRight: '8px' }}><FontAwesomeIcon icon={faRupeeSign} /></span> {data?.this_month?.earnings} 
        

      </div>
    )
  
  }
</Button>

        </Card.Body>
      </Card>
    );
  };

export const CardWidgetForKyc = ({Title,Content,booking}) => {
    return (
      <Card border="light" className="text-center p-0 mb-4">
        <Card.Body className="pb-5">
          <Card.Title>{Title}</Card.Title>
          {/* <Card.Subtitle className="fw-normal mb-4">23 km</Card.Subtitle> */}
          {/* <Card.Text className="text-gray ">New York, USA</Card.Text> */}
  
          
          
          <Button variant="secondary" size="sm" className="p-3">
 
  {Content}
</Button>

        </Card.Body>
      </Card>
    );
  };

export const CardWidgetForBooking = ({Title,Content,unit}) => {
    return (
      <Card border="light" className="text-center p-0 mb-4">
        <Card.Body className="pb-5">
          <Card.Title>{Title}</Card.Title>
          {/* <Card.Subtitle className="fw-normal mb-4">23 km</Card.Subtitle> */}
          {/* <Card.Text className="text-gray ">New York, USA</Card.Text> */}
  
          
          
          <Button variant="secondary" size="sm" className="p-3">
 
  {Content}  {unit === "Rupees" ? (
            <FontAwesomeIcon icon={faRupeeSign} />
          ) : (
            unit
          )}
</Button>

        </Card.Body>
      </Card>
    );
  };



  export const CardWidgetForTrip = ({Title,Content,unit}) => {
    return (
      <Card border="light" className="text-center p-0 mb-4">
        <Card.Body className="pb-5">
          <Card.Title>{Title}</Card.Title>
          {/* <Card.Subtitle className="fw-normal mb-4">23 km</Card.Subtitle> */}
          {/* <Card.Text className="text-gray ">New York, USA</Card.Text> */}
  
          
          
          <Button variant="secondary" size="sm" className="p-3">
 
  {Content}  
</Button>

        </Card.Body>
      </Card>
    );
  };