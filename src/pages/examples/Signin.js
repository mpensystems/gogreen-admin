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
//     <main>
//   <section className="d-flex align-items-center  mt-lg-6 ">
//     <Container>
//       <Row className="justify-content-center form-bg-image">
//         <Col xs={12} className="d-flex align-items-center justify-content-center">
//           <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
//             {/* Logo and Heading */}
//             <div className="text-center text-md-center mb-4 mt-md-0">
//               <img src={logo} alt="GoGreen Logo" className="mb-3" style={{ width: '100px', height: 'auto' }} />
//               <h3 className="mb-1">Admin Portal</h3>
//               <p className="text-muted" style={{ fontSize: '1.3rem' }}>Login</p>
//             </div>

//             {/* Login Form */}
//             <Form className="mt-4">
//               <Form.Group id="username" className="mb-4">
//                 <Form.Label>Username</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <FontAwesomeIcon icon={faEnvelope} />
//                   </InputGroup.Text>
//                   <Form.Control
//                     name="username"
//                     value={loginDetails.username}
//                     onChange={handleValueChange}
//                     autoFocus
//                     required
//                     type="text"
//                     placeholder="Username"
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <Form.Group id="password" className="mb-4">
//                 <Form.Label>Password</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <FontAwesomeIcon icon={faUnlockAlt} />
//                   </InputGroup.Text>
//                   <Form.Control
//                     name="password"
//                     value={loginDetails.password}
//                     onChange={handleValueChange}
//                     required
//                     type="password"
//                     placeholder="Password"
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <Button onClick={handleSubmit} variant="primary" type="submit" className="w-100">
//                 Sign in
//               </Button>
//             </Form>

//             {/* Signup Link */}
//             <div className="d-flex justify-content-center align-items-center mt-4">
//               <span className="fw-normal">
//                 Not registered? 
//                 <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
//                   {` Create account `}
//                 </Card.Link>
//               </span>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   </section>
// </main>








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
