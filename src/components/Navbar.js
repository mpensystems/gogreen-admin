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
import { faBell, faCog, faEnvelopeOpen, faKey, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { getLoggedInUser } from "../api/adminApis";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default (props) => {
 const [user,setUser] = useState();
 const {auth} = useAuth();
 const navigate = useNavigate();
 const {logout} = useAuth();
useEffect(() => {
  const token = auth?.token;
 
  console.log("token inside try of booking : ",token);

  const fetchUserdata = async () => {
    try {
      const response = await getLoggedInUser(token);

      const user = response;
      console.log("user detail : ", user);
      
      setUser(user);
    } catch (error) {
      console.log("Error while fetching the data", error);
    }
  };

  fetchUserdata();
}, []);


console.log("user : ", user);

const updateUserProfile = () =>{
  console.log("inside edit rider ");
  navigate(`/user/update-profile`);  
}

const logoutUser =() =>{
  console.log("inside log out : ");

  const response = logout();
  console.log("logged out Succesfully : ",response);
  navigate("/signin");
  toast.success("User Logged out !");
}
const manageUser =() =>{
  console.log("inside /UserManagment ");

  navigate("/UserManagment");
}
const changePassword =() =>{
  console.log("inside /UserManagment ");

  navigate("/reset-password");
}

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
           
          </div>
          <Nav className="align-items-center">
           

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center ">
                  {/* <Image src={Profile3} className="user-avatar md-avatar rounded-circle" /> */}
                  <FontAwesomeIcon icon={faUser} className="user-avatar  rounded-circle bg-dark"/>
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block ">
                    <span className="mb-0 font-small fw-bold text-center align-items-center">{user?.first_name}</span>
                    <br/>
                    <span className="mb-0 font-small fw-bold">{user?.role}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2" >
              <Dropdown.Item className="fw-bold" onClick={updateUserProfile}>
  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> Update Profile
</Dropdown.Item>

<Dropdown.Item className="fw-bold" onClick={changePassword}>
        <FontAwesomeIcon icon={faKey} className="me-2" /> Change Password
      </Dropdown.Item>

                {/* <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
                </Dropdown.Item> */}
                {user?.role === "superadmin" && (
      <Dropdown.Item className="fw-bold" onClick={manageUser}>
        <FontAwesomeIcon icon={faUserShield} className="me-2" /> User Management
      </Dropdown.Item>
    )}

                <Dropdown.Divider />

                <Dropdown.Item className="fw-bold" onClick={logoutUser}>
                  <FontAwesomeIcon  icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
