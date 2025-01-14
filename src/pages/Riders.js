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

import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { RiderEarningTable, TransactionsTable } from "../components/Tables";
import { CardWidget } from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { getRiderById } from "../api/adminApis";
import { useAuth } from "../context/AuthContext";

export default () => {
  const navigate = useNavigate();
  const [rider,setRider] =useState({});
  const {auth} = useAuth();

  
  const { id } = useParams();
  console.log("rid here  in rider component: ",id);

  useEffect(() => {

    
    const token = auth?.token;
    console.log("token inside try for rider : ",token);

    const fetchRiderdata = async () => {

      try {

        const response = await getRiderById(id,token);
        const rider = response;
        console.log("riders in table : ", rider);

        // Sort the ridersKyc by kycVerified status
        
        // console.log("sorterd riders : ", allRiders);

       

        setRider(response);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchRiderdata();

  }, [id, auth]);


  

  const handleBackToRiders = () => {
    navigate(`/Riders`);
  };


  const fullName = rider ? `${rider.first_name} ${rider.last_name}` : ''; 
  console.log("fullname : ",fullName);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

<Row>
<Col xs={12} xl={1}>
          {/* <ProfileCardWidget /> */}

          <Button
            onClick={handleBackToRiders}
            variant="light"
            className="shadow-sm mb-4 d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ms-2">Back</span>
          </Button>
        </Col>
</Row>
      <Row>
       

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={18}>
              {/* <ProfileCardWidget name={rider.first_name} /> */}
              {rider ? (
                <ProfileCardWidget 
                profileData={{
                  fullName,
                  rid: rider.rid, 
                  city: rider.city, 
                  vehicleNumber: rider?.vehicle_no ,
                  state: rider?.state ,
                  district: rider?.district ,
                  mobile: rider?.mobile ,
                  photo: rider?.photo ,
                }}
                
                />
              ) : (
                <p>Loading...</p>
              )}
              </Col>
           
          </Row>
        </Col>
        <Col xs={12} xl={8} className="mb-4">
          <RiderEarningTable />
        </Col>
        <Col xs={12} xl={12}>
          <Row>
            <Col>
              <CardWidget Title="Today's Earning" Content="Rs. 1000" />
            </Col>
            <Col>
              <CardWidget Title="Weekly Earning" Content="Rs. 6000" />
            </Col>
            <Col>
              <CardWidget Title="Monthly Earning" Content="Rs. 24000" />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
