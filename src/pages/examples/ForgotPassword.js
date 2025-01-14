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
import {
  Col,
  Row,
  Form,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
import { useAuth } from "../../context/AuthContext";
import { userChangePassword } from "../../api/adminApis";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { auth } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userChangePassword(
        { oldPassword, newPassword },
        auth.token
      );
      console.log(response, "RESPONSE_USERCHANGEPASSWORD");

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
            <p className="text-center"></p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Change Password</h3>
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
                        onChange={(e) => setOldPassword(e.target.value)}
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
                        onChange={(e) => setNewPassword(e.target.value)}
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

export default ForgotPassword;
