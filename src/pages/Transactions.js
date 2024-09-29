// import React ,{useEffect,useRef,useState}from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheck,
//   faCog,
//   faHome,
//   faDownload,
//   faUpload,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";

// import {
//   Col,
//   Row,
//   Form,
//   Button,
//   ButtonGroup,
//   Breadcrumb,
//   InputGroup,
//   Dropdown,
// } from "@themesberg/react-bootstrap";

// import { TransactionsTable } from "../components/Tables";
// import { downloadExcel } from "../Utils/excelUtils";

// // sample data till api call
// import transactions from "../data/transactions";
// import { handleFileUpload } from "../Utils/excelUtils";

// export default () => {
//   const [transactionsData, setTransactionsData] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null); 
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     console.log("sample data: ", transactions);
//     setTransactionsData(transactions);
//   }, []); 


//   // Use useEffect to load the data on component mount
//   useEffect(() => {
//     if (transactionsData.length > 0) {
//       const exportData = transactionsData.map(item => ({
//         trip_id: item.trip_id,
//         status: item.status,
//         pickup_loc: item.pickup_loc,
//         drop_loc: item.drop_loc,
//         rider_name: item.rider_name
//       }));

//       console.log("Data being exported to Excel:", exportData); 
//     }
//   }, [transactionsData]); 

//   const handleUploadClick = () => {
//     if (selectedFile) {
//       handleFileUpload(selectedFile); // Call the file processing function to console log
//     } else {
//       alert("Please select a file first!");
//     }
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-md-0">
//           {/* <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>Volt</Breadcrumb.Item>
//             <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
//           </Breadcrumb> */}
//           <h4>Transactions</h4>
//           {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
//         </div>
//         <div className="btn-toolbar mb-2 mb-md-0">
//           <ButtonGroup>
//             <Button variant="outline-primary" size="sm"               onClick={() => downloadExcel(transactionsData)}
//             >
//               <FontAwesomeIcon icon={faDownload} className="me-1" /> Download
//               File
//             </Button>
//             <input 
//               type="file" 
//               accept=".xlsx, .xls" 
//               onChange={(event) => handleFileUpload(event, setTransactionsData)} 
//               style={{ marginLeft: '10px' }} // Add margin for spacing
//             />
//             {/* <Button variant="outline-primary" size="sm">
//               <FontAwesomeIcon icon={faUpload} className="me-1" /> Upload Excel
//             </Button> */}




// <Button 
//               variant="outline-primary" 
//               size="sm" 
//               onClick={() => fileInputRef.current.click()} // Trigger file input on button click
//             >
//               <FontAwesomeIcon icon={faUpload} className="me-1" /> Select File
//             </Button>
//             <Button 
//               variant="outline-primary" 
//               size="sm" 
//               onClick={handleUploadClick} // Trigger the upload process
//             >
//               <FontAwesomeIcon icon={faUpload} className="me-1" /> Upload File
//             </Button>
//           </ButtonGroup>
//         </div>
//       </div>

//       <div className="table-settings mb-4">
//         <Row className="justify-content-between align-items-center">
//           <Col xs={8} md={6} lg={3} xl={4}>
//             <InputGroup>
//               <InputGroup.Text>
//                 <FontAwesomeIcon icon={faSearch} />
//               </InputGroup.Text>
//               <Form.Control type="text" placeholder="Search" />
//             </InputGroup>
//           </Col>
//           {/* <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
//             <Dropdown as={ButtonGroup}>
//               <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
//                 <span className="icon icon-sm icon-gray">
//                   <FontAwesomeIcon icon={faCog} />
//                 </span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
//                 <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
//                 <Dropdown.Item className="d-flex fw-bold">
//                   10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
//                 </Dropdown.Item>
//                 <Dropdown.Item className="fw-bold">20</Dropdown.Item>
//                 <Dropdown.Item className="fw-bold">30</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col> */}
//         </Row>
//       </div>

//       <TransactionsTable />
//     </>
//   );
// };













import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faDownload,
  faUpload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  InputGroup,
} from "@themesberg/react-bootstrap";

import { TransactionsTable } from "../components/Tables";
import { downloadExcel, handleFileUpload } from "../Utils/excelUtils";

// Sample data until API call
import transactions from "../data/transactions";

export default () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Define selectedFile state
  const fileInputRef = useRef(null); // Create ref for the file input

  // Load sample transactions data on component mount
  useEffect(() => {
    console.log("Sample data: ", transactions);
    setTransactionsData(transactions);
  }, []);

  // Log the transactions data when updated
  useEffect(() => {
    if (transactionsData.length > 0) {
      const exportData = transactionsData.map(item => ({
        trip_id: item.trip_id,
        status: item.status,
        pickup_loc: item.pickup_loc,
        drop_loc: item.drop_loc,
        rider_name: item.rider_name,
      }));
      console.log("Data being exported to Excel:", exportData); 
    }
  }, [transactionsData]);

  // Handle file input change event
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // Update selected file state
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile); // Process the file and console log its content
    } else {
      alert("Please select a file first!");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Transactions</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => downloadExcel(transactionsData)}
            >
              <FontAwesomeIcon icon={faDownload} className="me-1" /> Download
              File
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => fileInputRef.current.click()} // Trigger hidden file input click
            >
              <FontAwesomeIcon icon={faUpload} className="me-1" /> Select File
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleUploadClick} // Trigger the upload process
            >
              <FontAwesomeIcon icon={faUpload} className="me-1" /> Upload File
            </Button>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef} // Link this input to the button click
              style={{ display: 'none' }} // Hide it
              accept=".xlsx, .xls"
              onChange={handleFileChange} // Handle file selection
            />
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <TransactionsTable />
    </>
  );
};

