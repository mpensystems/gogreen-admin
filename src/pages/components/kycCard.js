import React from "react";

import {  Row, Button } from "@themesberg/react-bootstrap";

import { Card } from "@themesberg/react-bootstrap";

export default ({ title, kycData, type }) => {
  console.log("kycData in sub file: ", kycData);

  return (
    <>
      <Row>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">{title}</h5>
            <div className="d-xl-flex align-items-center">
              <div className="file-field">
                <div className="d-flex justify-content-xl-center ms-xl-3">
                  <div className="d-flex">
                    <div className="d-md-block text-start">
                      <h6 className="fw-normal text-dark mb-1"></h6>
                      
                      

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
