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
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";

import { BookingTable } from "../components/Tables";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const navigate = useNavigate();

  const handleNewBooking = () => {
    console.log("inside handle new booking function");
    navigate(`/Bookings/new-Booking`);
  };

  return (
    <>
      <div className="table-settings mb-4 py-4">
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
              onClick={handleNewBooking}
            >
              <FontAwesomeIcon icon={faPlus} /> New Booking
            </Dropdown.Toggle>
          </Col>
        </Row>
      </div>

      <BookingTable />
    </>
  );
};
