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
import { KycCardWidget } from "../components/Widgets";
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

        Aadhar_No:kycData.aadhar_no,
        Mobile:kycData.mobile,
        Dob:kycData.dob,
        Gender:kycData.gender,
        Address :`${kycData?.address_line1} , ${kycData?.address_line2} , ${kycData?.city},${kycData?.zipcode} ,${kycData?.district} , ${kycData?.state} ` 
      };
    }else if (title === "Pan Card Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Pan_no:kycData.pan_no,
        Mobile:kycData.mobile,
        Dob:kycData.dob,
        Address :`${kycData?.address_line1} , ${kycData?.address_line2} , ${kycData?.city},${kycData?.zipcode} ,${kycData?.district} , ${kycData?.state} ` 

      };
    }  
    else if (title === "Bank Details") {
      filteredData = {
        Bank_account: kycData.bank_ac,
        Bank_ifsc: kycData.bank_ifsc,
        Bank_ac_name: kycData.bank_ac_name,
      };
    
    } else if (title === "License Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Drivers_license: kycData.drivers_license,
        Drivers_license_expiry: kycData.drivers_license_expiry,
      };
    }
    else if (title === "RC Details") {
      filteredData = {
        Name: `${kycData.first_name} ${kycData.last_name}`,
        Mobile:kycData.mobile,
        Vehicle_type: kycData.vehicle_type,
      };
    }
  
    console.log("filteredData before setting : ", filteredData);
    
    setModalData(filteredData);
    setTitle(title);
    setShowModal(true);
  };
  
console.log(modalData,"modalData");

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
    return str.slice(-2).padStart(str.length, '*');
  }

  function maskVehicleNumber(vehicleNumber) {
    const str = String(vehicleNumber);
    const visiblePart = str.slice(0, 4); 
    const maskedPart = '*'.repeat(str.length - 4); 
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

    

      <Row>
        <Col className="mx-3">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">Personal Details</h5>
              <div className="d-flex align-items-center ms-xl-3  p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 70%" }}
                >
                  <b>Name : </b> {kycData.first_name} {kycData.last_name}
                  <br />
                  <b>Gender : </b> {kycData.gender} 
                </div>

                {/* Div with 30% width for image icon */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                <div
                  className="d-flex justify-content-center align-items-center "
                  style={{
                    flex: "0 0 30%",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    style={{ fontSize: "24px", color: "#61DAFB" }}
                    onClick={() => handleImageClick(kycData,"Personal Details")}
                  />

                </div>
                </OverlayTrigger>
              </div>

              

            </Card.Body>
          </Card>
        </Col>
       

        <Col className="mx-3">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">License Details</h5>
              <div className="d-flex align-items-center ms-xl-3  p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 70%" }}
                >
                  {/* <b>Name : </b>  {kycData.pan_no } {" "}{kycData.last_name}
      <br/> */}
                  <b>Driver's License : </b> {kycData.drivers_license}
                  <br />
                  <b>License Expiry Date : </b> {kycData.drivers_license_expiry}
                </div>

                {/* Div with 30% width for image icon */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    flex: "0 0 30%",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    style={{ fontSize: "24px", color: "#61DAFB" }}
                    onClick={() => handleImageClick(kycData,"License Details")}
                  />

                </div>
              </OverlayTrigger>
              </div>

              
            </Card.Body>
          </Card>{" "}
        </Col>
      </Row>


      <Row>

      <Col className="mx-3">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">Pan Card Details</h5>
              <div className="d-flex align-items-center ms-xl-3  p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 70%" }}
                >
                  {/* <b>Name : </b>  {kycData.pan_no } {" "}{kycData.last_name}
      <br/> */}
                  <b>Pan Number : </b> {kycData.pan_no}
                  <br />
                  <b>Date of Birth : </b> {kycData.dob}
                </div>

                {/* Div with 30% width for image icon */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    flex: "0 0 30%",
                    cursor: "pointer",
                  }}
                >
                   <FontAwesomeIcon
                    icon={faImage}
                    style={{ fontSize: "24px", color: "#61DAFB" }}
                    onClick={() => handleImageClick(kycData,"Pan Card Details")}
                  />

                </div>
                </OverlayTrigger>
              </div>

            </Card.Body>
          </Card>{" "}
        </Col>
       
        <Col className="mx-3">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">Aadhar Card Details</h5>
              <div className="d-flex align-items-center ms-xl-3  p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 70%" }}
                >
                  {/* <b>Name : </b>  {kycData.pan_no } {" "}{kycData.last_name}
      <br/> */}
                  <b>Aadhar Number : </b> {kycData.aadhar_no}
                  <br />
                  <b>Address : </b> {kycData.city} , {kycData.state}
                </div>

                {/* Div with 30% width for image icon */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    flex: "0 0 30%",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    style={{ fontSize: "24px", color: "#61DAFB" }}
                    onClick={() => handleImageClick(kycData,"Aadhar Card Details")}
                  />

                </div>
                </OverlayTrigger>
              </div>

              
            </Card.Body>
          </Card>{" "}
        </Col>
      </Row>


      <Row>
      <Col className="mx-3">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className="b-1 shadow-sm mb-2">
              <h5 className="mb-2">Bank Details</h5>
              <div className="d-flex align-items-center ms-xl-3  p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 70%" }}
                >
                  {/* <b>Name : </b>  {kycData.pan_no } {" "}{kycData.last_name}
      <br/> */}
                  <b>Bank Account Name : </b> {kycData.bank_ac_name}
                  <br />
                  <b>Bank Account Number  : </b> {maskedAccountNumber} 
                </div>

                {/* Div with 30% width for image icon */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    flex: "0 0 30%",
                    cursor: "pointer",
                  }}
                >
                   <FontAwesomeIcon
                    icon={faImage}
                    style={{ fontSize: "24px", color: "#61DAFB" }}
                    onClick={() => handleImageClick(kycData,"Bank Details")}
                  />

                </div>
                </OverlayTrigger>
              </div>

              
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col className="mx-3">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body className=" shadow-sm mb-2">
              <h5 className="mb-2 ">RC Details</h5>
              <div className="d-flex align-items-center ms-xl-3 p-2 bg-light">
                <div
                  className="fw-normal text-dark m-1 p-2"
                  style={{ flex: "0 0 70%" }}
                >
                  <b>Vehicle Type : </b> {kycData.vehicle_type} 
                  <br />
                  <b>Vehicle Number : </b> *{maskedVehicleNo} 
                
                   </div>

                {/* Div with 30% width for image icon */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View All Details</Tooltip>}
                >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    flex: "0 0 30%",
                    cursor: "pointer",
                  }}
                >
                   <FontAwesomeIcon
                    icon={faImage}
                    style={{ fontSize: "24px", color: "#61DAFB" }}
                    onClick={() => handleImageClick(kycData,"RC Details")}
                  />

                </div>
                </OverlayTrigger>
              </div>

             
            </Card.Body>
          </Card>
        </Col>
        
      </Row>

      <KycPopUp
        show={showModal}
        handleClose={handleCloseModal}
        modalData={modalData}
        title={title}
      />
    </>
  );
};
