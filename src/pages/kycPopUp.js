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


import React, { useEffect } from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";
import ImageComponent from "../components/ImageComponent";

const KycPopUp = ({ token, rid, show, handleClose, modalData = {}, title }) => {
  const { frontImageUrl, backImageUrl } = modalData;

  const tempFrontImageUrl =
    "https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?w=500&auto=format&fit=crop&q=60";
  const tempBackImageUrl =
    "https://plus.unsplash.com/premium_photo-1664457233796-d863a0ce5641?w=500&auto=format&fit=crop&q=60";

  useEffect(() => {
    console.log("Title prop changed: ", title);
  }, [title]);

  const labelMapping = {
    Name: "Name",
    Mobile: "Mobile Number",
    Gender: "Gender",
    Dob: "Date of Birth",
    Aadhar_No: "Aadhar Number",
    Address: "Address",
    Pan_no: "PAN Number",
    Bank_account: "Bank Account Number",
    Bank_ifsc: "Bank IFSC Code",
    Bank_ac_name: "Account Holder Name",
    Drivers_license: "Driver's License No",
    Drivers_license_expiry: "License Expiry Date",
    Vehicle_type: "Vehicle Type",
  };

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
            maxWidth: "100%",
            width: "100%",
          }}
        >
          <div
            style={{ marginBottom: "20px", width: "100%", maxHeight: "300px" }}
          >
            <h6>
              {title === "Pan Card Details"
                ? " "
                : title === "Bank Details"
                ? "Cancelled Cheque"
                : "Front Side"}
            </h6>
            {frontImageUrl ? (
              <ImageComponent token={token} rid={rid} fileid={frontImageUrl} />
            ) : (
              <img
                src={tempFrontImageUrl}
                alt="Fallback Front Image"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
          {backImageUrl && (
            <div style={{ width: "100%", maxHeight: "300px" }}>
              <h6 className=" my-3">Back Side</h6>
              <ImageComponent token={token} rid={rid} fileid={backImageUrl} />
            </div>
          )}
        </div>

        {/* Right side: Information */}
        <div
          className="d-flex justify-content-center align-items-start flex-column"
          style={{
            flex: "1",
            padding: "20px",
            textAlign: "left",
            overflowY: "auto",
            maxWidth: "100%",
            width: "100%",
          }}
        >
          {Object.keys(modalData).length > 0 ? (
            Object.entries(modalData)
              .filter(
                ([key]) =>
                  !["frontImageUrl", "backImageUrl", "title"].includes(key)
              )
              .map(([key, value]) => (
                <div
                  key={key}
                  style={{ display: "flex", marginBottom: "10px" }}
                >
                  <div style={{ fontWeight: "bold", width: "150px" }}>
                    {labelMapping[key]}:
                  </div>
                  <div style={{ flex: 1 }}>{value}</div>
                </div>
              ))
          ) : (
            <div>No data available</div>
          )}
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
