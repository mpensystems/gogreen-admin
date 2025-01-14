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


import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Dropdown } from "@themesberg/react-bootstrap";
import { useNavigate } from "react-router-dom";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { CardWidgetForTrip } from "../components/Card";
import MapDirection from "./MapDirection";

export default () => {
  const pickup = { lat: 28.6139, lng: 77.209 };
  const dropoff = { lat: 28.615, lng: 77.212 };

  // const markers = [
  //   {
  //     position: { lat: 28.6139, lng: 77.209 },
  //     riderName: "Captain America",
  //     description: "Avenger ",
  //   },
  //   {
  //     position: { lat: 19.076, lng: 72.8777 },
  //     riderName: "Thor",
  //     description: "Asgaurd",
  //   },
  //   {
  //     position: { lat: 13.0827, lng: 80.2707 },
  //     riderName: "IronMan",
  //     description: "Avenger Tony Stark",
  //   },
  // ];

  const navigate = useNavigate();

  const handleBackTrip = () => {
    navigate(`/Trips`);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

      <Row>
        <Col xs={12} xl={1}>
          <Button
            onClick={handleBackTrip}
            variant="light"
            className="shadow-sm mb-4 d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ms-2">Back</span>
          </Button>
        </Col>

        <Col xs={12} xl={12}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <MapDirection pickup={pickup} dropoff={dropoff} />
          </Card>
        </Col>

        <Col xs={12} xl={12}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4"></Card>
            </Col>
            <Col>
              <CardWidgetForTrip Title="Trip Distance" Content="23 km" />
            </Col>
            <Col>
              <CardWidgetForTrip Title="PickUp location" Content="Mumbai" />
            </Col>
            <Col>
              <CardWidgetForTrip Title="Drop location" Content="Pune" />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
