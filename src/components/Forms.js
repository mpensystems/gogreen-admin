// import React, { useState } from "react";
// import { Col, Row, Card, Form } from "@themesberg/react-bootstrap";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast';


// // Define validation schema
// const schema = yup.object().shape({
//   pickupName: yup.string().required("Pickup Name is required"),
//   pickupMobile: yup
//     .string()
//     .matches(/^[0-9]{10}$/, "Pickup Mobile must be exactly 10 digits")
//     .required("Pickup Mobile is required"),
//   pickupLatitude: yup
//     .number()
//     .min(-90, "Latitude must be between -90 and 90")
//     .max(90, "Latitude must be between -90 and 90")
//     .required("Pickup Latitude is required"),
//   pickupLongitude: yup
//     .number()
//     .min(-180, "Longitude must be between -180 and 180")
//     .max(180, "Longitude must be between -180 and 180")
//     .required("Pickup Longitude is required"),
//   dropName: yup.string().required("Drop Name is required"),
//   dropMobile: yup
//     .string()
//     .matches(/^[0-9]{10}$/, "Drop Mobile must be exactly 10 digits")
//     .required("Drop Mobile is required"),
//   dropLatitude: yup
//     .number()
//     .min(-90, "Latitude must be between -90 and 90")
//     .max(90, "Latitude must be between -90 and 90")
//     .required("Drop Latitude is required"),
//   dropLongitude: yup
//     .number()
//     .min(-180, "Longitude must be between -180 and 180")
//     .max(180, "Longitude must be between -180 and 180")
//     .required("Drop Longitude is required"),
// });

// export const GeneralInfoForm = () => {

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // Initial form data
//   const initialFormData = {
//     pickupName: "",
//     pickupMobile: "",
//     pickupAddress1: "",
//     pickupAddress2: "",
//     pickupHouse: "",
//     pickupLandmark: "",
//     pickupLatitude: "",
//     pickupLongitude: "",
//     pickupCity: "",
//     pickupZip: "",
//     pickupState: "",
//     pickupDistrict: "",
//     dropName: "",
//     dropMobile: "",
//     dropAddress1: "",
//     dropAddress2: "",
//     dropHouse: "",
//     dropLandmark: "",
//     dropLatitude: "",
//     dropLongitude: "",
//     dropCity: "",
//     dropZip: "",
//     dropState: "",
//     dropDistrict: "",
//   };

//   // Handle form submission
//   const onSubmit = (data) => {
//     console.log("Form data to send to API:", data);
//     reset(initialFormData); 
//     toast.success('Booking Created!');

//     navigate(`/Bookings`);

    
//   };

//   return (
//     <Card border="light" className="bg-white shadow-sm mb-4">
//       <Card.Body>
//         <h3 className="mb-4">Add Booking Details</h3>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           {/* Pickup Location Section */}
//           <h5 className="mb-4">PickUp Location</h5>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupName">
//                 <Form.Label>Pickup Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   {...register("pickupName")}
//                 />
//                 <p className="text-danger">{errors.pickupName?.message}</p>
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupMobile">
//                 <Form.Label>Pickup Mobile</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter mobile number"
//                   {...register("pickupMobile")}
//                 />
//                 <p className="text-danger">{errors.pickupMobile?.message}</p>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupAddress1">
//                 <Form.Label>Pickup Address Line 1</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address line 1"
//                   {...register("pickupAddress1")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupAddress2">
//                 <Form.Label>Pickup Address Line 2</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address line 2"
//                   {...register("pickupAddress2")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupHouse">
//                 <Form.Label>Pickup House</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter house number"
//                   {...register("pickupHouse")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupLandmark">
//                 <Form.Label>Pickup Landmark</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter landmark"
//                   {...register("pickupLandmark")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupLatitude">
//                 <Form.Label>Pickup Latitude</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter latitude"
//                   {...register("pickupLatitude")}
//                 />
//                 <p className="text-danger">{errors.pickupLatitude?.message}</p>
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupLongitude">
//                 <Form.Label>Pickup Longitude</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter longitude"
//                   {...register("pickupLongitude")}
//                 />
//                 <p className="text-danger">{errors.pickupLongitude?.message}</p>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupCity">
//                 <Form.Label>Pickup City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city"
//                   {...register("pickupCity")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="pickupZip">
//                 <Form.Label>Pickup Zip</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter zip code"
//                   {...register("pickupZip")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Drop Location Section */}
//           <h5 className="mb-4">Drop Location</h5>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropName">
//                 <Form.Label>Drop Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   {...register("dropName")}
//                 />
//                 <p className="text-danger">{errors.dropName?.message}</p>
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropMobile">
//                 <Form.Label>Drop Mobile</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter mobile number"
//                   {...register("dropMobile")}
//                 />
//                 <p className="text-danger">{errors.dropMobile?.message}</p>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropAddress1">
//                 <Form.Label>Drop Address Line 1</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address line 1"
//                   {...register("dropAddress1")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropAddress2">
//                 <Form.Label>Drop Address Line 2</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address line 2"
//                   {...register("dropAddress2")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropHouse">
//                 <Form.Label>Drop House</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter house number"
//                   {...register("dropHouse")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropLandmark">
//                 <Form.Label>Drop Landmark</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter landmark"
//                   {...register("dropLandmark")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropLatitude">
//                 <Form.Label>Drop Latitude</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter latitude"
//                   {...register("dropLatitude")}
//                 />
//                 <p className="text-danger">{errors.dropLatitude?.message}</p>
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropLongitude">
//                 <Form.Label>Drop Longitude</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter longitude"
//                   {...register("dropLongitude")}
//                 />
//                 <p className="text-danger">{errors.dropLongitude?.message}</p>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropCity">
//                 <Form.Label>Drop City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter city"
//                   {...register("dropCity")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6} className="mb-3">
//               <Form.Group id="dropZip">
//                 <Form.Label>Drop Zip</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter zip code"
//                   {...register("dropZip")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <button type="submit" className="btn btn-primary">
//             Submit Booking
//           </button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };


















import React, { useState } from "react";
import { Col, Row, Card, Form } from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { CITY_STATE_PIN_DATA } from '../data/Zip'; 

// Define validation schema
const schema = yup.object().shape({
  pickupName: yup.string().required("Pickup Name is required"),
  pickupMobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Pickup Mobile must be exactly 10 digits")
    .required("Pickup Mobile is required"),
  pickupAddress1: yup.string().required("Pickup Address Line 1 is required"),
  pickupLatitude: yup
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .required("Pickup Latitude is required"),
  pickupLongitude: yup
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .required("Pickup Longitude is required"),
  dropName: yup.string().required("Drop Name is required"),
  dropMobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Drop Mobile must be exactly 10 digits")
    .required("Drop Mobile is required"),
  dropAddress1: yup.string().required("Drop Address Line 1 is required"),
  dropLatitude: yup
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .required("Drop Latitude is required"),
  dropLongitude: yup
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .required("Drop Longitude is required"),
});

export const GeneralInfoForm = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form data to send to API:", data);
    reset(); 
    toast.success('Booking Created!');
    navigate(`/Bookings`);
  };

  // Handle ZIP code change
  const handleZipChange = (event, isPickup) => {
    const enteredZip = event.target.value;
    const locationData = CITY_STATE_PIN_DATA.find(
      (item) => item.PINCODE === parseInt(enteredZip)
    );

    if (locationData) {
      if (isPickup) {
        setValue("pickupCity", locationData.CITY);
        setValue("pickupState", locationData.STATE);
      } else {
        setValue("dropCity", locationData.CITY);
        setValue("dropState", locationData.STATE);
      }
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h3 className="mb-4">Add Booking Details</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Pickup Location Section */}
          <h5 className="mb-4">PickUp Location</h5>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupName">
                <Form.Label>Pickup Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...register("pickupName")}
                />
                <p className="text-danger">{errors.pickupName?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupMobile">
                <Form.Label>Pickup Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  {...register("pickupMobile")}
                />
                <p className="text-danger">{errors.pickupMobile?.message}</p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupAddress1">
                <Form.Label>Pickup Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address line 1"
                  {...register("pickupAddress1")}
                />
                <p className="text-danger">{errors.pickupAddress1?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupAddress2">
                <Form.Label>Pickup Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address line 2"
                  {...register("pickupAddress2")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupHouse">
                <Form.Label>Pickup House</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter house number"
                  {...register("pickupHouse")}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupLandmark">
                <Form.Label>Pickup Landmark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter landmark"
                  {...register("pickupLandmark")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupLatitude">
                <Form.Label>Pickup Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter latitude"
                  {...register("pickupLatitude")}
                />
                <p className="text-danger">{errors.pickupLatitude?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupLongitude">
                <Form.Label>Pickup Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter longitude"
                  {...register("pickupLongitude")}
                />
                <p className="text-danger">{errors.pickupLongitude?.message}</p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupCity">
                <Form.Label>Pickup City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  {...register("pickupCity")}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupZip">
                <Form.Label>Pickup Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zip code"
                  {...register("pickupZip")}
                  onChange={(e) => handleZipChange(e, true)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupState">
                <Form.Label>Pickup State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  {...register("pickupState")}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Drop Location Section */}
          <h5 className="mb-4">Drop Location</h5>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="dropName">
                <Form.Label>Drop Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...register("dropName")}
                />
                <p className="text-danger">{errors.dropName?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="dropMobile">
                <Form.Label>Drop Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  {...register("dropMobile")}
                />
                <p className="text-danger">{errors.dropMobile?.message}</p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="dropAddress1">
                <Form.Label>Drop Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address line 1"
                  {...register("dropAddress1")}
                />
                <p className="text-danger">{errors.dropAddress1?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="dropAddress2">
                <Form.Label>Drop Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address line 2"
                  {...register("dropAddress2")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="dropHouse">
                <Form.Label>Drop House</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter house number"
                  {...register("dropHouse")}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="dropLandmark">
                <Form.Label>Drop Landmark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter landmark"
                  {...register("dropLandmark")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="dropLatitude">
                <Form.Label>Drop Latitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter latitude"
                  {...register("dropLatitude")}
                />
                <p className="text-danger">{errors.dropLatitude?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="dropLongitude">
                <Form.Label>Drop Longitude</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter longitude"
                  {...register("dropLongitude")}
                />
                <p className="text-danger">{errors.dropLongitude?.message}</p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="dropCity">
                <Form.Label>Drop City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  {...register("dropCity")}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="dropZip">
                <Form.Label>Drop Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zip code"
                  {...register("dropZip")}
                  onChange={(e) => handleZipChange(e, false)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="dropState">
                <Form.Label>Drop State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  {...register("dropState")}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
