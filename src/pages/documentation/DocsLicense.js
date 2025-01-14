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


import React from 'react';
import { Row, Col, Card, Container } from '@themesberg/react-bootstrap';


export default () => (
  <Container className="px-0">
    <Row>
      <Col xs={12} className="p-3">
        <Card>
          <Card.Body>
            <article>
              <h1 className="h2" id="license">License</h1>
              <p className="fs-5 fw-light">Licensing details for Volt React Dashboard</p>
              <p>Please check our <Card.Link href="https://themesberg.com/licensing">official licensing page</Card.Link> to learn more about our licensing.</p>
            </article>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
