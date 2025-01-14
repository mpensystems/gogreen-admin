// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { GeneralInfoForm } from "../components/Forms";
import { Card, Accordion } from "@themesberg/react-bootstrap";
import { CardWidgetForBooking } from "../components/Card";
import BookingCard from "./components/BookingCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBookingByID } from "../api/adminApis";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import MapDirection from "./MapDirection";
import RouteDetails from "./MapDirection";

export default () => {
  const { auth } = useAuth();
  const [booking, setBooking] = useState("");
  const { bid } = useParams();
  console.log("bid here : ", bid);

  useEffect(() => {
    const token = auth?.token;
    console.log("token inside try of booking : ", token);

    const fetchBookingdata = async () => {
      try {
        const response = await getBookingByID(token, bid);
        const bookingDetails = response;
        console.log("bookingDetails : ", bookingDetails);
        setBooking(bookingDetails);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchBookingdata();
  }, []);

  const navigate = useNavigate();
  const handleBackToBookings = () => {
    navigate("/Bookings");
  };

  const pickup = booking?.pickup_geo;
  const dropoff = booking?.drop_geo;

  console.log(booking.drop_geo);
  console.log(booking.pickup_geo);

  return (
    <>
      <Col xs={12} xl={1}>
        <Button
          onClick={() => handleBackToBookings()}
          variant="light"
          className="shadow-sm mb-4 d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="ms-2">Back</span>
        </Button>
      </Col>
      <Row>
        <Col>
          <CardWidgetForBooking
            Title="Current Step"
            Content={booking?.bidConfig?.current_step}
            booking={<FontAwesomeIcon icon={faRupeeSign} />}
          ></CardWidgetForBooking>
        </Col>
        <Col>
          <CardWidgetForBooking
            Title="Current Bid Amount"
            Content={booking?.bidConfig?.current_bid}
            unit={"Rupees"}
            booking={booking}
          ></CardWidgetForBooking>
        </Col>
        <Col>
          <CardWidgetForBooking
            Title="Trip Distance"
            Content={booking?.trip_distance / 1000}
            unit={"km"}
          ></CardWidgetForBooking>
        </Col>
      </Row>
      <Row>
        <Col border="light" className="bg-white shadow-sm mx-3 mb-4">
          <h4 className="my-4 mx-2">Route for Booking</h4>
          <MapDirection
            pickup={pickup}
            dropoff={dropoff}
            className="my-4 mb-4 pb-4"
          />
        </Col>
      </Row>

      <Row>
        <Col className="mx-3">
          <BookingCard
            title="Pickup Location"
            booking={booking}
            type="pickup"
          />
        </Col>
        <Col className="mx-3">
          <BookingCard title="Drop Location" booking={booking} />
        </Col>
      </Row>
      <Row>
        <Col className="col-md-6 col-lg-6 mb-4">
          <Card border="light" className="bg-white shadow-sm ">
            <Card.Body className="">
              <div className="d-flex justify-content- align-items-center">
                <Card.Title style={{ marginRight: "20px" }}>
                  PickUp Name :{" "}
                </Card.Title>
                <Card.Subtitle className="fw-normal mb-0">
                  {booking?.pickup_name}
                </Card.Subtitle>
              </div>
              <div className="d-flex justify-content- align-items-center">
                <Card.Title style={{ marginRight: "20px" }}>
                  PickUp Mobile :{" "}
                </Card.Title>
                <Card.Subtitle className="fw-normal mb-0">
                  {booking?.pickup_mobile}
                </Card.Subtitle>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col className="col-md-6 col-lg-6">
          <Card border="light" className="bg-white shadow-sm ">
            <Card.Body className="">
              <div className="d-flex justify-content- align-items-center">
                <Card.Title style={{ marginRight: "20px" }}>
                  Drop Name :{" "}
                </Card.Title>
                <Card.Subtitle className="fw-normal mb-0">
                  {booking?.drop_name}
                </Card.Subtitle>
              </div>
              <div className="d-flex justify-content- align-items-center">
                <Card.Title style={{ marginRight: "20px" }}>
                  Drop Mobile :{" "}
                </Card.Title>
                <Card.Subtitle className="fw-normal mb-0">
                  {booking?.drop_name}
                </Card.Subtitle>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
