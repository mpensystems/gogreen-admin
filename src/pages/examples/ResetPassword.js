import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { userChangePassword } from "../../api/adminApis";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.token;

  const [details, setDetails] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const validatePasswords = () => {
    if (details.oldPassword === details.newPassword) {
      toast.error('New password cannot be the same as the old password.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    try {

      console.log("token: ",token);
      console.log("details: ",details);
      
      const response = await userChangePassword(details, token);

      console.log("chrck log : ",response.json());
      

      if (response?.status == 200) {
        toast.success('Password changed successfully!');
       
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error changing password: ", error.response?.data || error.message);
      console.error("check error code: ", error.message);
      if(error.message == 'Error: ER708'){
        toast.error('Password is too weak. Consider using a mix of uppercase, lowercase, numbers, and symbols');

      }else if(error.message == 'Error: ER407'){
        toast.error(' Password mismatch. Old password does not match the one on record.');
      }else{
        toast.error('Failed to change password. Please check your credentials.');

      }
    }
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset Password</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="oldPassword" className="mb-4">
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        name="oldPassword"
                        onChange={handleChange}
                        placeholder="Current Password"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="newPassword" className="mb-4">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        name="newPassword"
                        type="password"
                        onChange={handleChange}
                        placeholder="New Password"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Reset Password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
