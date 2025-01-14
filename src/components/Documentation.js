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
import { Row, Col } from '@themesberg/react-bootstrap';

import CodeEditor from "./CodeEditor";

export default (props) => {
  const { title, description, example = null, imports = null, scope = {}, maxHeight = null } = props;

  return (
    <>
      <div className="pt-2">
        <Row>
          <Col xs={12}>
            <h2 className="fs-5">{title}</h2>
            {description}
          </Col>
        </Row>
      </div>

      <div className="pb-5">
        <Row className="mt-4">
          <Col xs={12}>
            <CodeEditor code={example} scope={scope} imports={imports} maxHeight={maxHeight} />
          </Col>
        </Row>
      </div>
    </>
  );
};
