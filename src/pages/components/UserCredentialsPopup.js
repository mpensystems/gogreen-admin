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
