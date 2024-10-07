import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, userUpdateProfile } from "../../api/adminApis"; // Import necessary functions
import toast from "react-hot-toast";

const UpdateUserProfile = () => {
  const { auth } = useAuth(); // Get auth context, including the token
  const [profileDetails, setProfileDetails] = useState({
    username: '',
    email: '',
    phoneno: '',
    firstname: '',
    lastname: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = auth?.token;
      try {
        const response = await getUserProfile({}, token); // Fetch user profile

        if(response?.status === 200){
            const userProfile =  response?.data;
            setProfileDetails(userProfile); 
        }
    
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast.error('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = auth?.token;
    try {
      const response = await userUpdateProfile(profileDetails, token); 
      console.log(response, "USER_PROFILE_UPDATED");
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Profile update failed');
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Update Profile</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        name="username"
                        onChange={handleChange}
                        value={profileDetails.username}
                        autoFocus
                        required
                        type="text"
                        placeholder="Username"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="firstname" className="mb-4">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="firstname"
                        value={profileDetails.firstname}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="First Name"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="lastname" className="mb-4">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="lastname"
                        value={profileDetails.lastname}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Last Name"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="email"
                        value={profileDetails.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="Email"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="phoneno" className="mb-4">
                    <Form.Label>Phone No</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="phoneno"
                        value={profileDetails.phoneno}
                        onChange={handleChange}
                        required
                        type="tel"
                        placeholder="Phone No"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Update Profile
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

export default UpdateUserProfile;
