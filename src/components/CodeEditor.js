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



import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Col, Row, Card, Button, Tooltip, OverlayTrigger } from '@themesberg/react-bootstrap';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import Code from "./Code";

import themeStyle from "../assets/syntax-themes/ghcolors.json";

export default (props) => {
  const { language = "jsx", scope = {}, imports = null, maxHeight = 'none' } = props;
  const [code, setCode] = useState(props.code);
  const [copied, setCopied] = useState(false);
  const noInline = code.includes('render(');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LiveProvider noInline={noInline} code={code} language={language} theme={themeStyle} scope={scope}>
      <Row>
        <Col xs={12} className="mb-4">
          <Card>
            <Card.Body style={{ maxHeight: maxHeight }}>
              <LivePreview />
            </Card.Body>
          </Card>
        </Col>
        {imports ? (
          <Col xs={12} className="mb-4">
            <Code code={imports} />
          </Col>
        ) : null}
        <Col xs={12} className="mb-4">
          <LiveError className="alert alert-danger" />

          <span className="fs-7 mb-2 d-block text-gray-600">
            <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={<Tooltip>You can edit the code below and the changes will be seen in the example above.</Tooltip>}>
              <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
            </OverlayTrigger>
            Live React Code Editor
          </span>

          <Card>
            <Card.Body className="position-relative">

              <LiveEditor onChange={handleCodeChange} className="live-editor" />

              {copied ? <span className="text-success copy-code-text">Copied</span> : null}

              <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={<Tooltip>Copy to clipboard</Tooltip>}
              >
                <CopyToClipboard text={code} onCopy={handleCopy}>
                  <Button size="sm" variant="primary" className="copy-code-button">Copy</Button>
                </CopyToClipboard>
              </OverlayTrigger>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </LiveProvider>
  );
};

