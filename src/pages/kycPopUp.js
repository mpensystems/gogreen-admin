






import React, { useState, useEffect } from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";

const KycPopUp = ({ show, handleClose, modalData = {}, title }) => {
  const { frontImageUrl, backImageUrl, info } = modalData;
  console.log("modal data : ", modalData);

  // Temporary fallback image URLs
  const tempFrontImageUrl =
    "https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8";
  const tempBackImageUrl =
    "https://plus.unsplash.com/premium_photo-1664457233796-d863a0ce5641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8";

  // Effect hook to track changes in the title prop
  useEffect(() => {
    console.log("Title prop changed: ", title);
  }, [title]);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column flex-lg-row">
        {/* Left side: Images */}
        <div
          className="d-flex flex-column align-items-center"
          style={{
            flex: "1",
            marginBottom: "20px",
            maxWidth: "400px", // Limit the width of the image section
          }}
        >
          {/* Display front image */}
          <div style={{ marginBottom: "10px", width: "100%", maxHeight: "300px" }}>
            <img
              src={tempFrontImageUrl}
              alt="Front"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                border: "2px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Display back image if it exists */}
          {tempBackImageUrl && (
            <div style={{ width: "100%", maxHeight: "300px" }}>
              <img
                src={tempBackImageUrl}
                alt="Back"
                style={{
                  width: "100%",
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
            overflowY: "auto", // Allow scrolling if content is too long
            // maxHeight: "300px", // Limit the height to prevent overflowing
          }}
        >
          <div>
            {/* Display key-value pairs for the modal data */}
            {Object.keys(modalData).length > 0 ? (
              Object.entries(modalData).map(([key, value]) => (
                <div key={key} style={{ marginBottom: "10px" }}>
                  <strong>{key}:</strong> {value}
                </div>
              ))
            ) : (
              <div>No data available</div>
            )}
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
