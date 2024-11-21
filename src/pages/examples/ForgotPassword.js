import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext
import { userChangePassword } from "../../api/adminApis"; // Import your API function
import toast from "react-hot-toast"; // Import toast for notifications

const ForgotPassword =  () => {
  const { auth } = useAuth(); 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userChangePassword(
        { oldPassword, newPassword },
        auth.token 
      );
      console.log(response,"RESPONSE_USERCHANGEPASSWORD");
      

      toast.success("Password changed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              {/* <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link> */}
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Change Password</h3>
                {/* <p className="mb-4">Create New Password</p> */}
                <Form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Form.Label htmlFor="oldpassword">Old Password</Form.Label>
                    <InputGroup id="oldpassword">
                      <Form.Control
                        required
                        autoFocus
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)} // Update state on change
                      />
                    </InputGroup>
                  </div>
                  <div className="mb-4">
                    <Form.Label htmlFor="newpassword">New Password</Form.Label>
                    <InputGroup id="newpassword">
                      <Form.Control
                        required
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Update state on change
                      />
                    </InputGroup>
                  </div>
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


export default ForgotPassword