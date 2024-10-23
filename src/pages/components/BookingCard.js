import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
// import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

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

                      <div className="text-gray "></div>
                      <div className="text-gray "></div>
                      <div className="text-gray "></div>
                      <div className="text-gray "></div>
                      <div className="text-gray "></div>
                      <div className="text-gray "></div>
                      <div className="text-gray "></div>
                      <div className="text-gray "></div>
                      {/* <div className="text-gray ">{booking?.pickup_name}</div> */}
                      {/* <div className="text-gray ">{booking?.pickup_geo}</div> */}
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
