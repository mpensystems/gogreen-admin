import React, { useState,useEffect } from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";

const KycPopUp = ({ show, handleClose, data ,title }) => {


  const { frontImageUrl, backImageUrl, info } = data; 
  
  
  
//   console.log(title,"data in modal");
  
useEffect(() => {
    console.log("Title prop changed: ", title);
  }, []);

  console.log(title);
  
  
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column flex-lg-row">
        {/* Left side: Images */}
        <div
          className="d-flex flex-column align-items-center"
          style={{ flex: "1", marginBottom: "20px" }}
        >
          {/* Display front image */}
          <div>
            <img
              src={frontImageUrl}
              alt="Front"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                border: "2px solid #ddd",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          </div>

          {/* Display back image if it exists */}
          {backImageUrl && (
            <div>
              <img
                src={backImageUrl}
                alt="Back"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>

        {/* Right side: Information */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            flex: "1",
            padding: "20px",
            textAlign: "left",
          }}
        >
          <div>
            <h5>Information</h5>
            <p>{info}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KycPopUp;
