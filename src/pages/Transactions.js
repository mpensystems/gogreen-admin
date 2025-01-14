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


import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faDownload,
  faUpload,
  faSearch,
  faHandPointer,
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
import toast from "react-hot-toast";

export default () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("Sample data: ", transactions);
    setTransactionsData(transactions);
  }, []);

  useEffect(() => {
    if (transactionsData.length > 0) {
      const exportData = transactionsData.map((item) => ({
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
    setSelectedFileName(file ? file.name : ""); // Set the file name when a file is selected
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile); // Process the file and console log its content

      // Clear the file input and reset the state after upload
      setSelectedFile(null);
      setSelectedFileName("");
      fileInputRef.current.value = null; // Reset the input element to clear the previous file
    } else {
      toast.error("Please select a file first!");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Rider Aggregate Balance </h4>
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
              <FontAwesomeIcon icon={faHandPointer} className="me-1" /> Select
              File
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleUploadClick} // Trigger the upload process
            >
              <FontAwesomeIcon icon={faUpload} className="me-1" /> Upload File
            </Button>

            <input
              type="file"
              ref={fileInputRef} // Link this input to the button click
              style={{ display: "none" }}
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </ButtonGroup>
        </div>
      </div>

      {/* Show selected file name directly below the three buttons */}
      {selectedFileName && (
        <div
          style={{
            marginRight: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <strong style={{ color: "#0288D0" }}>Selected File : </strong>{" "}
          {selectedFileName}
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
