import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faUser
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
import { userRegister } from "../../api/adminApis";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default () => {
  const { auth, updateAuth } = useAuth(); 

  const [signupDetails, setSignupDetails] = useState({
    username: '',
    role:'',
    password: '',
    email: '',
    phoneno:'',
    first_name:'',
    last_name:'',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = auth?.token;
    console.log(token,"TOKEN");
    
    try {
        const response = await userRegister(signupDetails,token);
        console.log(response,"USER_REGISTER");
        if(response?.status === 200){

          
          toast.success('User Register successful!');
          navigate('/UserManagment');
        }

        

        
    } catch (error) {
        console.error(error);
        toast.error('User registeration fail');
    }
};
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          {/* <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
          <Row className="justify-content-center form-bg-image">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create User account</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        name="username"
                        onChange={handleChange}
                        value={signupDetails.username}
                        autoFocus
                        required
                        type="text"
                        placeholder="username"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="role" className="mb-4">
                    <Form.Label>Role</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        name="role"
                        onChange={handleChange}
                        value={signupDetails.role}
                        autoFocus
                        required
                        type="text"
                        placeholder="role"
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
                        name="first_name"
                        value={signupDetails.firstname}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="first Name"
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
                        name="last_name"
                        value={signupDetails.lastname}
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
                        value={signupDetails.email}
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
                        value={signupDetails.phoneno}
                        onChange={handleChange}
                        required
                        type="tel"
                        placeholder="Phone No"
                      />
                    </InputGroup>
                  </Form.Group>


                  <Form.Group id="password" className="mb-4">
                    <Form.Label> Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="password"
                        value={signupDetails.password}
                        onChange={handleChange}
                        required
                        type="password"
                        placeholder="Password"
                      />
                    </InputGroup>
                  </Form.Group>
                  
                  {/* <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      I agree to the <Card.Link>terms and conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck> */}

                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    type="submit"
                    className="w-100"
                  >
                    Register User
                  </Button>
                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
