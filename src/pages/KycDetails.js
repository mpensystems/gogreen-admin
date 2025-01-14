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



import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faArrowLeft,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Form,
  Card,
  OverlayTrigger,
  Tooltip,
} from "@themesberg/react-bootstrap";
import { KycCardWidget, ProfileCardWidget } from "../components/Widgets";
import { CardWidget, CardWidgetForKyc } from "../components/Card";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getKycApproved,
  getKycDetailsOfRider,
  rejectKyc,
} from "../api/adminApis";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import BookingCard from "./components/BookingCard";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import KycPopUp from "./kycPopUp";
import ImageComponent from "../components/ImageComponent";

export default () => {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [kycData, setKycData] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();

  const token = auth?.token;

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [title, setTitle] = useState({});

  const handleImageClick = (kycData, title) => {
    let filteredData = {};

    // Select data based on the title
    if (title === "Personal Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Mobile: kycData.mobile,
        Gender: kycData.gender,
        Dob: kycData.dob,
      };
    } else if (title === "Aadhar Card Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Aadhar_No: kycData.aadhar_no,
        Mobile: kycData.mobile,
        Dob: kycData.dob,
        Gender: kycData.gender,
        Address: `${kycData?.address_line1}, ${kycData?.address_line2}, ${kycData?.city}, ${kycData?.zipcode}, ${kycData?.district}, ${kycData?.state}`,
      };

      // Include images for Aadhar card if required
      setModalData({
        ...filteredData,
        title: "Aadhar Card Details",
        frontImageUrl: kycData?.photo_id_front,
        backImageUrl: kycData?.photo_id_back,
      });
    } else if (title === "Pan Card Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Pan_no: kycData.pan_no,
        Mobile: kycData.mobile,
        Dob: kycData.dob,
        Address: `${kycData?.address_line1}, ${kycData?.address_line2}, ${kycData?.city}, ${kycData?.zipcode}, ${kycData?.district}, ${kycData?.state}`,
      };

      // Include images for Pan card if required
      setModalData({
        ...filteredData,
        title: "Pan Card Details",
        frontImageUrl: kycData?.pan_copy,
      });
    } else if (title === "Bank Details") {
      filteredData = {
        Bank_account: kycData.bank_ac,
        Bank_ifsc: kycData.bank_ifsc,
        Bank_ac_name: kycData.bank_ac_name,
      };

      // Include cancelled cheque image if required
      setModalData({
        ...filteredData,
        title: "Bank Details",
        frontImageUrl: kycData?.cancelled_cheque,
      });
    } else if (title === "License Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Drivers_license: kycData.drivers_license,
        Drivers_license_expiry: kycData.drivers_license_expiry,
      };

      // Include front and back images for License details
      setModalData({
        ...filteredData,
        title: "License Details",
        frontImageUrl: kycData.drivers_license_front,
        backImageUrl: kycData.drivers_license_back,
      });
    } else if (title === "RC Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Mobile: kycData.mobile,
        Vehicle_type: kycData.vehicle_type,
      };

      setModalData({
        ...filteredData,
        title: "RC Details",
        frontImageUrl: kycData?.rc_copy_front,
        backImageUrl: kycData?.rc_copy_back,
      });
    }

    // Log filtered data for debugging
    console.log("filteredData before setting: ", filteredData);

    // Update modal visibility and title
    setTitle(title);
    setShowModal(true);
  };

  console.log(modalData, "modalData");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log("token in kyc details for approve api : ", token);

  const { rid } = useParams();
  console.log("rid here in kyc params: ", rid);

  const handleBackToKycs = () => {
    navigate("/Kyc");
    console.log("handle kyc is ");
  };

  const handleSelect = (eventKey) => {
    if (eventKey === "deny") {
      setShowRejectReason(true);
    } else {
      setShowRejectReason(false);
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
    } else {
      console.log("Rejected with reason:", rejectReason);
      console.log("rid in params for kyc : ", rid);

      const reject = await rejectKyc(token, rid, rejectReason);
      toast("Kyc Rejected Successfully! ");
      setShowRejectReason(false);
    }
  };

  const handleApprove = async () => {
    console.log("rid in params for kyc : ", rid);
    const approve = await getKycApproved(token, rid);
    toast.success("Kyc Approved Successfully! ");
    console.log(approve);
  };

  useEffect(() => {
    const fetchRiderKyc = async () => {
      try {
        const response = await getKycDetailsOfRider(token, rid);
        const kycOfRider = response;
        console.log("riders : ", kycOfRider);

        setKycData(kycOfRider);
        // setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching the data", error);
        // setIsLoading(false);
      }
    };

    fetchRiderKyc();

    console.log("kyc rediers : ", kycData);
  }, []);

  function maskAccountNumber(accountNumber) {
    const str = String(accountNumber);
    return str.slice(-2).padStart(str.length, "*");
  }

  function maskVehicleNumber(vehicleNumber) {
    const str = String(vehicleNumber);
    if (str.length <= 4) {
      return str;
    }

    const visiblePart = str.slice(0, 4);
    const maskedPart = "*".repeat(str.length - 4);

    return visiblePart + maskedPart;
  }

  const maskedAccountNumber = maskAccountNumber(kycData?.bank_ac);
  const maskedVehicleNo = maskVehicleNumber(kycData?.vehicle_no);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
        <Col xl={4} className="d-flex justify-content-start">
          <Button
            onClick={() => handleBackToKycs()}
            variant="light"
            className="shadow-sm mb-4 d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ms-2">Back</span>
          </Button>
        </Col>
        <Col xl={4} className="d-flex justify-content-end">
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle as={Button} variant="primary">
              <FontAwesomeIcon icon={faClipboard} className="me-2" /> Change Kyc
              Status
              <span className="icon icon-small ms-1"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
              <Dropdown.Item
                eventKey="approve"
                className="flex justify-content-center align-item-center"
                style={{ color: "green", display: "flex" }}
                onClick={handleApprove}
              >
                Approve
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="deny"
                className="flex justify-content-center align-item-center"
                style={{ color: "red", display: "flex" }}
              >
                Denied
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </div>

      {/* Reject reason input */}
      {showRejectReason && (
        <Row className="mt-3">
          <Col xl={12}>
            <Form.Group controlId="rejectReason">
              <Form.Label>Reason for Rejection</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Please provide the reason for rejection"
              />
            </Form.Group>
            <Button
              onClick={handleRejectSubmit}
              variant="danger"
              className="mt-2 mb-2"
            >
              Submit Rejection
            </Button>
          </Col>
        </Row>
      )}

      <Row className="mb-0">
        <Col xs={12} xl={4}>
          <KycCardWidget profileData={kycData} rid={rid} />
        </Col>

        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-2 my-1">
            <Card.Body className=" shadow-sm mb-2">
              <h5 className="">License Details</h5>
              <div className="d-flex align-items-center ms-xl-3 p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 50%" }}
                >
                  <b>Driver's License:</b> {kycData.drivers_license}
                  <br />
                  <b>License Expiry Date:</b> {kycData.drivers_license_expiry}
                  <br />
                </div>

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      flex: "0 0 40%",
                      cursor: "pointer",
                      width: "100%",
                      height: "130px", // Set the desired height here

                      marginLeft: "20px",
                    }}
                    onClick={() => handleImageClick(kycData, "License Details")}
                  >
                    <ImageComponent
                      token={token}
                      rid={rid}
                      fileid={kycData.drivers_license_front}
                      blur={true}
                    />
                  </div>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>

          <Card border="light" className="bg-white shadow-sm mb-2 my-1">
            <Card.Body className=" shadow-sm mb-2">
              <h5 className="">RC Details</h5>
              <div className="d-flex align-items-center ms-xl-3 p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 50%" }}
                >
                  <b>Vehicle Type : </b> {kycData.vehicle_type}
                  <br />
                  <b>Vehicle Number : </b> *{maskedVehicleNo}
                  <br />
                </div>

                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      flex: "0 0 40%",
                      cursor: "pointer",
                      width: "100%",
                      height: "130px", // Set the desired height here

                      marginLeft: "20px",
                    }}
                    onClick={() => handleImageClick(kycData, "RC Details")}
                  >
                    <ImageComponent
                      token={token}
                      rid={rid}
                      fileid={kycData.rc_copy_front}
                      blur={true}
                    />
                  </div>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <br />

      <Row>
        {/* Pan Card */}
        <Col xs={12} xl={6}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">Pan Card Details</h5>
              <div className="d-flex align-items-center ms-xl-3 p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 50%" }}
                >
                  <b>Pan Number : </b> {kycData.pan_no}
                  <br />
                  <b>Date of Birth : </b> {kycData.dob}
                </div>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      flex: "0 0 40%",
                      cursor: "pointer",
                      width: "100%",
                      height: "130px",
                      marginLeft: "20px",
                      overflow: "hidden", // Prevent overflow
                      borderRadius: "3px", // Optional, for rounded corners
                    }}
                    onClick={() =>
                      handleImageClick(kycData, "Pan Card Details")
                    }
                  >
                    <ImageComponent
                      token={token}
                      rid={rid}
                      fileid={kycData?.pan_copy}
                      blur={true}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }} // Ensure the image stays within the container
                    />
                  </div>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Aadhar Card */}
        <Col xs={12} xl={6}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">Aadhar Card Details</h5>
              <div className="d-flex align-items-center ms-xl-3 p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 50%" }}
                >
                  <b>Aadhar Number : </b> {kycData.aadhar_no}
                  <br />
                  <b>Address : </b> {kycData.city}, {kycData.state}
                </div>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      flex: "0 0 40%",
                      cursor: "pointer",
                      width: "100%",
                      height: "130px",
                      marginLeft: "20px",
                      overflow: "hidden", // Prevent overflow
                      borderRadius: "3px", // Optional, for rounded corners
                    }}
                    onClick={() =>
                      handleImageClick(kycData, "Aadhar Card Details")
                    }
                  >
                    <ImageComponent
                      token={token}
                      rid={rid}
                      fileid={kycData?.photo_id_front}
                      blur={true}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }} // Ensure the image stays within the container
                    />
                  </div>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Bank Details */}
        <Col xs={12} xl={6}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">Bank Details</h5>
              <div className="d-flex align-items-center ms-xl-3 p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 50%" }}
                >
                  <b>Bank Account Name : </b> {kycData.bank_ac_name}
                  <br />
                  <b>Bank Account Number : </b> {maskedAccountNumber}
                </div>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      flex: "0 0 40%",
                      cursor: "pointer",
                      width: "100%",
                      height: "130px",
                      marginLeft: "20px",
                      overflow: "hidden", // Prevent overflow
                      // borderRadius: "8px" // Optional, for rounded corners
                    }}
                    onClick={() => handleImageClick(kycData, "Bank Details")}
                  >
                    <ImageComponent
                      token={token}
                      rid={rid}
                      fileid={kycData?.cancelled_cheque}
                      blur={true}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </OverlayTrigger>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <KycPopUp
        token={token}
        rid={rid}
        show={showModal}
        handleClose={handleCloseModal}
        modalData={modalData}
        title={title}
      />
    </>
  );
};
