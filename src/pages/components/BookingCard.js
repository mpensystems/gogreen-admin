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



import React from "react";
import {  Row } from "@themesberg/react-bootstrap";

import { Card } from "@themesberg/react-bootstrap";

export default ({ title, booking, type }) => {
  console.log("booking in sub file: ", booking);

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
                      {type == "pickup" ? (
                        <div className="text-gray">
                          {booking?.pickup_address1 && (
                            <span className="me-2">
                              {booking.pickup_address1}
                            </span>
                          )}
                          ,
                          {booking?.pickup_address2 && (
                            <span className="me-2">
                              {booking.pickup_address2}
                            </span>
                          )}
                          ,
                          {booking?.pickup_house && (
                            <span className="me-2">{booking.pickup_house}</span>
                          )}
                          <br />
                          {booking?.pickup_landmark && (
                            <span className="mx-1">
                              {booking.pickup_landmark}
                            </span>
                          )}
                          ,
                          {booking?.pickup_zip && (
                            <span className="mx-1">{booking.pickup_zip}</span>
                          )}
                          {booking?.pickup_district && (
                            <span className="mx-1">
                              {booking.pickup_district}
                            </span>
                          )}
                          ,
                          {booking?.pickup_city && (
                            <span className="mx-1">{booking.pickup_city}</span>
                          )}
                          ,
                          {booking?.pickup_state && (
                            <span className="mx-1">{booking.pickup_state}</span>
                          )}
                          ,
                          {/* {booking?.pickup_mobile && <span className="mx-1">{booking.pickup_mobile}</span>} */}
                        </div>
                      ) : (
                        <div className="text-gray">
                        {booking?.drop_address1 && (
                          <span className="me-2">
                            {booking.drop_address1}
                          </span>
                        )}
                        ,
                        {booking?.drop_address2 && (
                          <span className="me-2">
                            {booking.drop_address2}
                          </span>
                        )}
                        ,
                        {booking?.drop_house && (
                          <span className="me-2">{booking.drop_house}</span>
                        )}
                        <br />
                        {booking?.drop_landmark && (
                          <span className="mx-1">
                            {booking.drop_landmark}
                          </span>
                        )}
                        ,
                        {booking?.drop_zip && (
                          <span className="mx-1">{booking.drop_zip}</span>
                        )}
                        {booking?.drop_district && (
                          <span className="mx-1">
                            {booking.drop_district}
                          </span>
                        )}
                        ,
                        {booking?.drop_city && (
                          <span className="mx-1">{booking.drop_city}</span>
                        )}
                        ,
                        {booking?.drop_state && (
                          <span className="mx-1">{booking.drop_state}</span>
                        )}
                        ,
                        {/* {booking?.pickup_mobile && <span className="mx-1">{booking.pickup_mobile}</span>} */}
                      </div>
                      )}

                      
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
