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


import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/adminApis";
import toast from "react-hot-toast";
import logo from '../../../src/assets/logo.png';

export default () => {

 
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const [ error,setError] = useState('');

  const {updateAuth} = useAuth();
  const navigate = useNavigate()

  const  handleValueChange = (e)=>{
    console.log(e.target.value);
    

    const {name,value} = e.target;

    setLoginDetails((prevdetails)=>({
      ...prevdetails,
      [name]:value
    }));

  }


  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await login(loginDetails);
          const { st, role , validUntil } = response.data; 

          console.log("RESPONSE_LOGIN : ",response.data);
          if(response?.status === 200){

            updateAuth(st, role , validUntil);
  
            toast.success('Login successful!');
            navigate('/dashboard');

          }
  
         
          
      } catch (error) {
          console.error(error);
          setError('Invalid username or password. Please try again.');

          // toast.error('Login failed. Please check your credentials.');
          navigate('/signin');
      }
  };
  

  return (


<main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<Container>
  <Row className="justify-content-center">
    <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center">
      <div className="bg-white shadow-soft border rounded p-4 w-100" style={{ maxWidth: '400px' }}>
        {/* Logo and Heading */}
        <div className="text-center mb-4">
          <img src={logo} alt="GoGreen Logo" style={{ width: '80px', height: 'auto' }} />
          <h3 className="mt-3">Admin Portal</h3>
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>Login</p>
        </div>

        {/* Login Form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="username" className="mb-4">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputGroup.Text>
              <Form.Control
                name="username"
                value={loginDetails.username}
                onChange={handleValueChange}
                autoFocus
                required
                type="text"
                placeholder="Username"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group id="password" className="mb-4">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </InputGroup.Text>
              <Form.Control
                name="password"
                value={loginDetails.password}
                onChange={handleValueChange}
                required
                type="password"
                placeholder="Password"
              />
            </InputGroup>
          </Form.Group>

          {error && <p className="text-danger text-center">{error}</p>}

          <Button variant="primary" type="submit" className="w-100">
            Sign in
          </Button>
        </Form>

        {/* Forgot Password & Contact Info */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <span className="fw-normal">
            <a href="/forgot-password" className="fw-bold">
              Forgot Password?
            </a>
          </span>
        </div>

        {/* Contact Info */}
        <div className="mt-3 text-center">
          <p className="text-muted">
            Don’t have an account? Contact{' '}
            <a href="mailto:support@gogreen.com">support@gogreen.com</a> to set up your account.
          </p>
          <p className="text-muted">
            For login issues, contact{' '}
            <a href="mailto:support@gogreen.com">support@gogreen.com</a>.
          </p>
        </div>
      </div>
    </Col>
  </Row>
</Container>
</main>




  );
};
