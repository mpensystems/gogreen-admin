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
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedInUser, updateCurrentUser } from "../api/adminApis";
import { useAuth } from "../context/AuthContext";

// Schema validation using Yup
const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export default () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assume 'id' is passed as a route parameter
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const { auth } = useAuth();
  const { aid } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const token = auth?.token;

  console.log("token in user update form : ", token);
  // console.log("aid in user update form : ",aid);

  // Fetch data from API using the ID
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getLoggedInUser(token);
        const data = response;
        console.log("user data id : ", data);
        setInitialData(data);
        // Pre-fill the form with fetched data
        reset({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [aid, reset]);

  // Handle form submission
  const onSubmit = async (formData) => {
    console.log("Inside form submit:", formData);

    try {
      const response = await updateCurrentUser(token, formData);
      console.log(response);
      toast.success("Profile updated Successfully !");
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("An error occurred while updating the data.");
    }
  };

  const handleBackUsersMngm = () => {
    navigate(`/dashboard`);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

      <Row>
        <Col xs={12} xl={1}>
          <Button
            onClick={handleBackUsersMngm}
            variant="light"
            className="shadow-sm mb-4 d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ms-2">Back</span>
          </Button>
        </Col>
        <Col xs={12} xl={12}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h3 className="mb-4">Edit User Details </h3>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <hr />

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter first name"
                          {...register("first_name")}
                        />
                        <p className="text-danger">
                          {errors.first_name?.message}
                        </p>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                          {...register("last_name")}
                        />
                        <p className="text-danger">
                          {errors.last_name?.message}
                        </p>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          {...register("email")}
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter phone number"
                          {...register("phone")}
                        />
                        <p className="text-danger">{errors.phone?.message}</p>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn btn-primary" type="submit">
                    Update
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
          <Toaster />
        </Col>
      </Row>
    </>
  );
};
