import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { BookingTable, KycTable, RiderTable } from "../components/Tables";
import { useNavigate } from "react-router-dom";
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default () => {


    const navigate = useNavigate();


    const handleNewBooking = ()=>{
        console.log("inside handle new booking function");
        navigate(`/new-Booking`);
    }
  
  return (

    <>
      {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        
       
      </div> */}

      

      <div className="table-settings mb-4 py-4" >
  <Row className="justify-content-between align-items-center">
    <Col xs={8} md={6} lg={3} xl={4}>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <Form.Control type="text" placeholder="Search" />
      </InputGroup>
    </Col>
    <Col xs={4} md={2} xl={2} className="text-end">
      <Dropdown.Toggle
        as={Button}
        variant="secondary"
        className="text-dark me-2"
        // style={{ width: '100%' }}
        onClick={handleNewBooking}
      >
        <FontAwesomeIcon icon={faPlus}  />{" "}
        New Booking
      </Dropdown.Toggle>
    </Col>
  </Row>
</div>

      <BookingTable/>
    </>
  );
};
