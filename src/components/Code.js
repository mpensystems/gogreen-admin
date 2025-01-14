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
import { Card, Button, Tooltip, OverlayTrigger } from '@themesberg/react-bootstrap';
import Highlight, { Prism } from 'prism-react-renderer';

import themeStyle from "../assets/syntax-themes/ghcolors.json";

export default (props) => {
  const { code = "", language = "jsx" } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CodeStyling = ({ className, style, tokens, getLineProps, getTokenProps }) => (
    <Card className="position-relative pe-8 mb-2">
      <Card.Body>
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </pre>

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
  );

  return (
    <Highlight Prism={Prism} code={code} language={language} theme={themeStyle}>
      {CodeStyling}
    </Highlight>
  );
};

