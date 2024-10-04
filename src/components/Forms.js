import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form } from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { CITY_STATE_PIN_DATA } from '../data/Zip'; 
import Modal from "./Modal";

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
  const [pickupLoc ,setPickupLoc] = useState({
    pickupAddress1:'',
    pickupAddress2:'',
    pickupHouse:'',
    pickupLandmark:'',
    pickupCity:'',
    pickupState:'',
    pickupZip:'',

  });
  const [dropLoc ,setDropLoc] = useState({
    dropAddress1:'',
    dropAddress2:'',
    dropHouse:'',
    dropLandmark:'',
    dropCity:'',
    dropState:'',
    dropZip:'',
  });

  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropCoordinates, setDropCoordinates] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Handle form submission
  const onSubmit = (data) => {
    // Group pickup and drop location data
    const pickupLocation = {
      name: data.pickupName,
      mobile: data.pickupMobile,
      address1: data.pickupAddress1,
      address2: data.pickupAddress2,
      house: data.pickupHouse,
      landmark: data.pickupLandmark,
      latitude: data.pickupLatitude,
      longitude: data.pickupLongitude,
      city: data.pickupCity,
      state: data.pickupState,
      zip: data.pickupZip,
    };

    const dropLocation = {
      name: data.dropName,
      mobile: data.dropMobile,
      address1: data.dropAddress1,
      address2: data.dropAddress2,
      house: data.dropHouse,
      landmark: data.dropLandmark,
      latitude: data.dropLatitude,
      longitude: data.dropLongitude,
      city: data.dropCity,
      state: data.dropState,
      zip: data.dropZip,
    };

    setDropLoc(dropLocation);
    setPickupLoc(pickupLocation);


    const formData = {
      pickupLocation,
      dropLocation,
      ...data, 
    };

    console.log("Form data to send to API:", formData);
    console.log("Form data to send to API:", pickupLoc);
    console.log("Form data to send to API:", formData);
 
    // Reset form and navigate
    reset();
    toast.success('Booking Created!');
    navigate(`/Bookings`);
  };



useEffect(()=>{
  console.log("pickupLoc : ",pickupLoc);
  console.log("dropLoc : ",dropLoc);

},[pickupLoc,dropLoc])

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

        setPickupLoc((prevLoc) => ({
          ...prevLoc, // Spread the previous state
          pickupState: locationData.STATE, // Update the specific field based on input name
        }));
        setPickupLoc((prevLoc) => ({
          ...prevLoc, // Spread the previous state
          pickupCity: locationData.CITY, // Update the specific field based on input name
        }));

      } else {
        setValue("dropCity", locationData.CITY);
        setValue("dropState", locationData.STATE);
        setDropLoc((prevLoc) => ({
          ...prevLoc, // Spread the previous state
          dropState: locationData.STATE, // Update the specific field based on input name
        }));
        setDropLoc((prevLoc) => ({
          ...prevLoc, // Spread the previous state
          dropCity: locationData.CITY, // Update the specific field based on input name
        }));
      }
    }
  };





  const handlePickupChange = (e) => {
    const { name, value } = e.target; 
    console.log("name, value : ",name, value);

    setPickupLoc((prevLoc) => ({
      ...prevLoc, // Spread the previous state
      [name]: value, // Update the specific field based on input name
    }));
  };
  const handleDropChange = (e) => {
    const { name, value } = e.target; 
    console.log("name, value : ",name, value);

    setDropLoc((prevLoc) => ({
      ...prevLoc, // Spread the previous state
      [name]: value, // Update the specific field based on input name
    }));
  };

  const handleCoordinatesUpdate = (pickupCoords, dropCoords) => {
    setPickupCoordinates(pickupCoords);
    setDropCoordinates(dropCoords);
    console.log("Updated Pickup Coordinates:", pickupCoords);
    console.log("Updated Drop Coordinates:", dropCoords);
  };

  const [markers , setMarkers]  = useState([])
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h3 className="mb-4">Add Booking Details</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Pickup Location Section */}
          <hr/>

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
                  name="pickupAddress1"
                  placeholder="Enter address line 1"
                  {...register("pickupAddress1")}
                 onChange={handlePickupChange}
                />
                <p className="text-danger">{errors.pickupAddress1?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupAddress2">
                <Form.Label>Pickup Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  name="pickupAddress2"
                  placeholder="Enter address line 2"
                  {...register("pickupAddress2")}
                  onChange={handlePickupChange}
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
                  name="pickupHouse"
                  placeholder="Enter house number"
                  {...register("pickupHouse")}
                  onChange={handlePickupChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupLandmark">
                <Form.Label>Pickup Landmark</Form.Label>
                <Form.Control
                  type="text"
                  name="pickupLandmark"
                  placeholder="Enter landmark"
                  {...register("pickupLandmark")}
                  onChange={handlePickupChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <Row>
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
          </Row> */}

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupCity">
                <Form.Label>Pickup City</Form.Label>
                <Form.Control
                  type="text"
                  name="pickupCity"
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
                  name="pickupZip"
                  placeholder="Enter zip code"
                  {...register("pickupZip")}
                 
                  onChange={(e) => {
                    handleZipChange(e, true);
                    handlePickupChange(e);
                  }}                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pickupState">
                <Form.Label>Pickup State</Form.Label>
                <Form.Control
                  type="text"
                  name="pickupState"
                  placeholder="Enter state"
                  {...register("pickupState")}
                  
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <hr/>

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
                  name="dropAddress1"
                  placeholder="Enter address line 1"
                  {...register("dropAddress1")}
                  onChange={handleDropChange}
                />
                <p className="text-danger">{errors.dropAddress1?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="dropAddress2">
                <Form.Label>Drop Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  name="dropAddress2"
                  placeholder="Enter address line 2"
                  {...register("dropAddress2")}
                  onChange={handleDropChange}

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
                  name="dropHouse"
                  placeholder="Enter house number"
                  {...register("dropHouse")}
                  onChange={handleDropChange}

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
                  name="dropLandmark"
                  onChange={handleDropChange}

                />
              </Form.Group>
            </Col>
          </Row>

          {/* <Row>
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
          </Row> */}

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
                  
                  onChange={(e) => {
                    handleZipChange(e, false);
                    handleDropChange(e);
                  }}
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

          <hr/>
          <h5 className="mb-4">Select exact Pick Up and drop location in map</h5>

          <Row>
            <Col md={12} className="mb-3"  >
              <button type="none" className="btn btn-primary" onClick={openModal}  >Select Location</button>
            </Col>


{/* Reusable Modal */}
<Modal isOpen={isModalOpen} onClose={closeModal} pickupLoc={pickupLoc} dropLoc={dropLoc} markers={markers} setMarkers={setMarkers} onCoordinatesUpdate={handleCoordinatesUpdate}>
  <h2>Select Location</h2>
</Modal>
          </Row>
          <hr/>

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
