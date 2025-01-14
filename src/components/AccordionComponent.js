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
import { Card, Accordion } from '@themesberg/react-bootstrap';

export default (props) => {
  const { defaultKey, data = [], className = "" } = props;

  const AccordionItem = (item) => {
    const { eventKey, title, description } = item;

    return (
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
          <span className="h6 mb-0 fw-bold">
            {title}
          </span>
        </Accordion.Button>
        <Accordion.Body>
          <Card.Body className="py-2 px-0">
            <Card.Text className="mb-0">
              {description}
            </Card.Text>
          </Card.Body>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <Accordion className={className} defaultActiveKey={defaultKey}>
      {data.map(d => <AccordionItem key={`accordion-${d.id}`} {...d} />)}
    </Accordion>
  );
};