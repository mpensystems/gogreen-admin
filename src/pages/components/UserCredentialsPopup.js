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
import { Modal, Button } from "@themesberg/react-bootstrap";

const UserCredentialsPopup = ({ show, onClose, username, password }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Password:</strong> {password}</p>


        <div className="alert alert-warning" role="alert">
          <strong>Note:</strong> This information will not be visible again. Please ensure you note it down securely.
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCredentialsPopup;
