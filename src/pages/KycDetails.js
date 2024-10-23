// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
// import { KycCardWidget } from "../components/Widgets";
// import { CardWidget } from "../components/Card";
// import { faArrowLeft, faClipboard } from "@fortawesome/free-solid-svg-icons";

// export default () => {
//   const handleBackToKycs = () => {
//     console.log("handle kyc is ");
//   };
//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
//         <Col xl={4} className="d-flex justify-content-start">
//           <Button
//             onClick={() => handleBackToKycs()}
//             variant="light"
//             className="shadow-sm mb-4 d-flex align-items-center "
//           >
//             <FontAwesomeIcon icon={faArrowLeft} />
//             <span className="ms-2">Back</span>
//           </Button>
//         </Col>
//         <Col xl={4} className="d-flex justify-content-end">
//           {/* <Button
//             onClick={() => handleBackToKycs()}
//             variant="light"
//             className="shadow-sm mb-4 d-flex align-items-center "
//           >
//             <FontAwesomeIcon icon={faCheck} />{" "}
//             <span className="ms-2">Change Kyc Status</span>
//           </Button> */}

//           <Dropdown>
//             <Dropdown.Toggle as={Button} variant="primary">
//               <FontAwesomeIcon icon={faClipboard} className="me-2" /> Change Kyc
//               Status
//               <span className="icon icon-small ms-1"></span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
//               <Dropdown.Item className="flex justify-content-center align-item-center" style={{ color: "green",display:'flex' }}>Approve</Dropdown.Item>
//               <Dropdown.Item className="flex justify-content-center align-item-center" style={{ color: "red" ,display:'flex'}}>Denied</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Col>
//       </div>

//       <Row>
//         <Col xs={12} xl={3}>
//           <CardWidget Title="Vehicle Type" Content="EV" />
//         </Col>
//         <Col xs={12} xl={3}>
//           <CardWidget Title="Bank Account No." Content="5" />
//         </Col>
//         <Col xs={12} xl={3}>
//           <CardWidget Title="IFSC Code" Content="MJG2234234234" />
//         </Col>
//         <Col xs={12} xl={3}>
//           <CardWidget Title="Vehicle No." Content="512121" />
//         </Col>
//       </Row>

//       <Row>
//         <Col xs={12} xl={4}>
//           <KycCardWidget Document="Photo Id" />
//         </Col>
//         <Col xs={12} xl={4}>
//           <KycCardWidget Document="Drivers License" />
//         </Col>
//         <Col xs={12} xl={4}>
//           <KycCardWidget Document="RC Copy" />
//         </Col>
//       </Row>

//       <Row>
//         <Col xs={12} xl={4}>
//           <KycCardWidget Document="Pan Card" />
//         </Col>
//         <Col xs={12} xl={4}>
//           <KycCardWidget Document="Utility Bill" />
//         </Col>
//         <Col xs={12} xl={4}>
//           <KycCardWidget Document="Cancelled Cheque" />
//         </Col>
//       </Row>
//     </>
//   );
// };












import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown, Form } from "@themesberg/react-bootstrap";
import { KycCardWidget } from "../components/Widgets";
import { CardWidget } from "../components/Card";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getKycApproved, rejectKyc } from "../api/adminApis";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default () => {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const navigate = useNavigate();
  const {auth} = useAuth();
  const token = auth?.token;

  console.log("token in kyc details for approve api : ",token);
  
  const {rid} = useParams();
  console.log("rid here in kyc params: ",rid);

  const handleBackToKycs = () => {
    navigate("/Kyc");
    console.log("handle kyc is ");
  };

  const handleSelect = (eventKey) => {
    if (eventKey === "deny") {
      setShowRejectReason(true); // Show reason input when Denied is selected
    } else {
      setShowRejectReason(false); // Hide reason input when another option is selected
    }
  };

  const handleRejectSubmit = async() => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
    } else {
      console.log("Rejected with reason:", rejectReason);
      console.log("rid in params for kyc : ",rid);

      const reject = await rejectKyc(token,rid,rejectReason);
     toast("Kyc Rejected Successfully! ");
     setShowRejectReason(false); 
    }
  };


  const handleApprove = async() =>{
   console.log("rid in params for kyc : ",rid);
   const approve = await getKycApproved(token,rid);
  toast.success("Kyc Approved Successfully! ");
  console.log(approve);
  

  };

  const handleRejectKyc = async() =>{
   console.log("rid in params for kyc : ",rid);
   const approve = await rejectKyc(token,rid);
  toast.success("Kyc Approved Successfully! ");
  console.log(approve);
  

  };

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
              <Dropdown.Item eventKey="approve" className="flex justify-content-center align-item-center" style={{ color: "green", display: "flex" }} onClick={handleApprove}>
                Approve
              </Dropdown.Item>
              <Dropdown.Item eventKey="deny" className="flex justify-content-center align-item-center" style={{ color: "red", display: "flex" }}>
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
        <Col xs={12} xl={3}>
          <CardWidget Title="Vehicle Type" Content="EV" />
        </Col>
        <Col xs={12} xl={3}>
          <CardWidget Title="Bank Account No." Content="5" />
        </Col>
        <Col xs={12} xl={3}>
          <CardWidget Title="IFSC Code" Content="MJG2234234234" />
        </Col>
        <Col xs={12} xl={3}>
          <CardWidget Title="Vehicle No." Content="512121" />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={4}>
          <KycCardWidget Document="Photo Id" />
        </Col>
        <Col xs={12} xl={4}>
          <KycCardWidget Document="Drivers License" />
        </Col>
        <Col xs={12} xl={4}>
          <KycCardWidget Document="RC Copy" />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={4}>
          <KycCardWidget Document="Pan Card" />
        </Col>
        <Col xs={12} xl={4}>
          <KycCardWidget Document="Utility Bill" />
        </Col>
        <Col xs={12} xl={4}>
          <KycCardWidget Document="Cancelled Cheque" />
        </Col>
      </Row>
    </>
  );
};
