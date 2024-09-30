// import React, { useEffect, useState, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheck,
//   faCog,
//   faHome,
//   faDownload,
//   faUpload,
//   faSearch,
//   faHandPointer
// } from "@fortawesome/free-solid-svg-icons";

// import {
//   Col,
//   Row,
//   Form,
//   Button,
//   ButtonGroup,
//   InputGroup,
// } from "@themesberg/react-bootstrap";

// import { TransactionsTable } from "../components/Tables";
// import { downloadExcel, handleFileUpload } from "../Utils/excelUtils";

// // Sample data until API call
// import transactions from "../data/transactions";

// export default () => {
//   const [transactionsData, setTransactionsData] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null); // Define selectedFile state
//   const [lastUploadedFile, setLastUploadedFile] = useState(null); // State to store last uploaded file
//   const fileInputRef = useRef(null); // Create ref for the file input

//   // Load sample transactions data on component mount
//   useEffect(() => {
//     console.log("Sample data: ", transactions);
//     setTransactionsData(transactions);
//   }, []);

//   // Log the transactions data when updated
//   useEffect(() => {
//     if (transactionsData.length > 0) {
//       const exportData = transactionsData.map(item => ({
//         trip_id: item.trip_id,
//         status: item.status,
//         pickup_loc: item.pickup_loc,
//         drop_loc: item.drop_loc,
//         rider_name: item.rider_name,
//       }));
//       console.log("Data being exported to Excel:", exportData); 
//     }
//   }, [transactionsData]);

//   // Handle file input change event
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file); 
//   };

//   // Handle file upload button click
//   const handleUploadClick = () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     // Check if the same file is being uploaded again
//     if (
//       lastUploadedFile &&
//       selectedFile.name === lastUploadedFile.name &&
//       selectedFile.size === lastUploadedFile.size
//     ) {
//       alert("This file has already been uploaded!");
//       return;
//     }

//     // Process the file upload
//     handleFileUpload(selectedFile);

//     // Store the uploaded file as the last uploaded file
//     setLastUploadedFile(selectedFile);
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-md-0">
//           <h4>Transactions</h4>
//         </div>
//         <div className="btn-toolbar mb-2 mb-md-0">
//           <ButtonGroup>
//             <Button
//               variant="outline-primary"
//               size="sm"
//               onClick={() => downloadExcel(transactionsData)}
//             >
//               <FontAwesomeIcon icon={faDownload} className="me-1" /> Download
//               File
//             </Button>

//             <Button
//               variant="outline-primary"
//               size="sm"
//               onClick={() => fileInputRef.current.click()} // Trigger hidden file input click
//             >
//               <FontAwesomeIcon icon={faHandPointer} className="me-1" /> Select File
//             </Button>

//             <Button
//               variant="outline-primary"
//               size="sm"
//               onClick={handleUploadClick} // Trigger the upload process
//             >
//               <FontAwesomeIcon icon={faUpload} className="me-1" /> Upload File
//             </Button>

//             {/* Hidden file input */}
//             <input
//               type="file"
//               ref={fileInputRef} // Link this input to the button click
//               style={{ display: 'none' }} // Hide it
//               accept=".xlsx, .xls"
//               onChange={handleFileChange} // Handle file selection
//             />
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
  faHandPointer
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
  const [selectedFileName, setSelectedFileName] = useState(''); // Store file name
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
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : ''); // Set the file name when a file is selected
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
              <FontAwesomeIcon icon={faHandPointer} className="me-1" /> Select File
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

      {/* Show selected file name */}
      {selectedFileName && (
        <div style={{ marginRight:"20px" ,textAlign:"center",display:'flex',justifyContent:'flex-end'}}>
          <strong style={{color:"#3599DC"}}>Selected File :  </strong> { selectedFileName}
        </div>
      )}

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
