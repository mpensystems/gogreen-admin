
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
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Image, Button, Container } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import ErrorImage from "../../assets/img/illustrations/404.svg";


export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={5} className="order-2 order-lg-1 text-center text-lg-left">
              <h1 className="text-primary mt-5">
              <span className="fw-bolder">Account Not Found</span>  
              <br/>
          </h1>
          <strong>Please register as superadmin to access admin panel</strong>

             <br/>
             <br/>
              <Button as={Link} variant="primary" className="animate-hover" to={Routes.DashboardOverview.path}>
                <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                Sign Up for admin
              </Button>
            </Col>
            <Col xs={12} lg={7} className="order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
              <Image src={ErrorImage} className="img-fluid w-75" />
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
