import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CITY_STATE_PIN_DATA } from "../data/Zip";
import Modal from "./Modal";
import { createNewBooking } from "../api/adminApis";
import { useAuth } from "../context/AuthContext";
import MapLocationFinder from "../pages/MapLocationFinder";
// import DropMapLocation from "../pages/dropMapLocation";

const schema = yup.object().shape({
  pickup_name: yup.string().required("Pickup Name is required"),
  pickup_mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Pickup Mobile must be exactly 10 digits")
    .required("Pickup Mobile is required"),
  pickup_address1: yup.string().required("Pickup Address Line 1 is required"),

  drop_name: yup.string().required("Drop Name is required"),
  drop_mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Drop Mobile must be exactly 10 digits")
    .required("Drop Mobile is required"),
  drop_address1: yup.string().required("Drop Address Line 1 is required"),
  min_bid: yup.number().required("Minimum bid amount is required"),
  max_bid: yup.number().required("Maximum bid amount is required"),
  dist_increment: yup.number().required("dist increment value is required"),
  start_dist: yup.number().required("start distance value is required"),
  steps: yup.number().required("Steps value is required"),
  step_period: yup.number().required("Step Period is required"),
});

export const GeneralInfoForm = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [pickupLoc, setPickupLoc] = useState({
    pickup_address1: "",
    pickup_address2: "",
    pickup_house: "",
    pickup_landmark: "",
    pickup_city: "",
    pickup_state: "",
    pickup_zip: "",
  });
  const [dropLoc, setDropLoc] = useState({
    pickup_address1: "",
    pickup_address2: "",
    drop_house: "",
    drop_landmark: "",
    drop_city: "",
    drop_state: "",
    drop_zip: "",
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
  const onSubmit = async(data) => {
    console.log("inside form submit");

    const pickup_geo = {
      lat: pickupCoordinates.lat,
      lng: pickupCoordinates.lng,
    };
    const drop_geo = {
      lat: dropCoordinates.lat,
      lng: dropCoordinates.lng,
    };

    const {
      min_bid,
      max_bid,
      steps,
      step_period,
      dist_increment,
      start_dist,
      
      ...rest
    } = data;

    const bidConfig = {
      min_bid,
      max_bid,
      steps,
      step_period,
      dist_increment,
      start_dist,
    };

    const formData = {
      pickup_geo,
      drop_geo,
      bidConfig,
      ...rest,
    };

    console.log("Form data to send to API:", formData);

    // api call
    // createNewBooking(formData);



      const token = auth?.token;
      console.log("token inside try of booking : ",token);
      try {
        const response = await createNewBooking(formData,token);
         

        if(response?.status === 200){
           console.log("booking created successfully !");
           
    reset();
    toast.success("Booking Created!");
    navigate(`/Bookings`);
        }
    
      } catch (error) {
        console.error("Failed to create new booking:", error);
        toast.error('Failed to create new booking');
        reset();
       navigate(`/Bookings`);
      }
    

  };

  useEffect(() => {
    console.log("pickupLoc : ", pickupLoc);
    console.log("dropLoc : ", dropLoc);
  }, [pickupLoc, dropLoc]);

  const handleZipChange = (event, isPickup) => {
    const enteredZip = event.target.value;
    const locationData = CITY_STATE_PIN_DATA.find(
      (item) => item.PINCODE === parseInt(enteredZip)
    );

    if (locationData) {
      if (isPickup) {
        setValue("pickup_city", locationData.CITY);
        setValue("pickup_state", locationData.STATE);

        setPickupLoc((prevLoc) => ({
          ...prevLoc,
          pickup_state: locationData.STATE,
        }));
        setPickupLoc((prevLoc) => ({
          ...prevLoc,
          pickup_city: locationData.CITY,
        }));
      } else {
        setValue("drop_city", locationData.CITY);
        setValue("drop_state", locationData.STATE);
        setDropLoc((prevLoc) => ({
          ...prevLoc,
          drop_state: locationData.STATE,
        }));
        setDropLoc((prevLoc) => ({
          ...prevLoc,
          drop_city: locationData.CITY,
        }));
      }
    }
  };

  const handlePickupChange = (e) => {
    const { name, value } = e.target;
    console.log("name, value : ", name, value);

    setPickupLoc((prevLoc) => ({
      ...prevLoc,
      [name]: value,
    }));
  };
  const handleDropChange = (e) => {
    const { name, value } = e.target;
    console.log("name, value : ", name, value);

    setDropLoc((prevLoc) => ({
      ...prevLoc,
      [name]: value,
    }));
  };

  const handleCoordinatesUpdate = (pickupCoords, dropCoords) => {
    setPickupCoordinates(pickupCoords);
    setDropCoordinates(dropCoords);
    console.log("Updated Pickup Coordinates:", pickupCoords);
    console.log("Updated Drop Coordinates:", dropCoords);
  };

  const [markers, setMarkers] = useState([]);

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 px-4">
      <Card.Body>
        <h2 className="mb-4">Add Booking Details</h2>
      
        <Form onSubmit={handleSubmit(onSubmit)}>
          <hr />

          <h3 className="mb-4">PickUp Details</h3>

          <Row>
          <h5>Personal Details ( For Pickup )</h5>

<hr/>
            <Col md={6} className="mb-3">
              <Form.Group id="pickup_name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...register("pickup_name")}
                />
                <p className="text-danger">{errors.pickup_name?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="pickup_mobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  {...register("pickup_mobile")}
                />
                <p className="text-danger">{errors.pickup_mobile?.message}</p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
          <h5>Address </h5>

<hr/>
            <Col md={12} className="mb-3">
              <Form.Group id="pickup_address1">
                <Form.Label>Pickup Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_address1"
                  placeholder="Enter address line 1"
                  {...register("pickup_address1")}
                  onChange={handlePickupChange}
                />
                <p className="text-danger">{errors.pickup_address1?.message}</p>
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group id="pickup_address2">
                <Form.Label>Pickup Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_address2"
                  placeholder="Enter address line 2"
                  {...register("pickup_address2")}
                  onChange={handlePickupChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>


            <Col md={4} className="mb-3">
              <Form.Group id="pickup_house">
                <Form.Label>Apartment Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_house"
                  placeholder="Enter Apartment Number"
                  {...register("pickup_house")}
                  onChange={handlePickupChange}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="pickup_landmark">
                <Form.Label>Landmark</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_landmark"
                  placeholder="Enter landmark for pickup location"
                  {...register("pickup_landmark")}
                  onChange={handlePickupChange}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="pickup_zip">
                <Form.Label>Pickup Zip</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_zip"
                  placeholder="Enter zip code"
                  {...register("pickup_zip")}
                  onChange={(e) => {
                    handleZipChange(e, true);
                    handlePickupChange(e);
                  }}
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>
            
            <Col md={4} className="mb-3">
              <Form.Group id="pickup_district">
                <Form.Label>pickup district</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_district"
                  placeholder="Enter pickup district"
                  {...register("pickup_district")}
                  
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="pickup_city">
                <Form.Label>Pickup City</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_city"
                  placeholder="Pickup city"
                  {...register("pickup_city")}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="pickup_state">
                <Form.Label>Pickup State</Form.Label>
                <Form.Control
                  type="text"
                  name="pickup_state"
                  placeholder="Pickup state"
                  {...register("pickup_state")}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
           
            
          </Row>
          <hr />
          {/* <div> <MapLocationFinder  markers={markers} pickupLoc={pickupLoc} dropLoc={dropLoc} setMarkers={setMarkers} onCoordinatesUpdate={handleCoordinatesUpdate}/> </div> */}
          {/* <div> <DropMapLocation markers={markers} pickupLoc={pickupLoc} dropLoc={null} setMarkers={setMarkers} onCoordinatesUpdate={handleCoordinatesUpdate}/> </div> */}

          <h3 className="mb-4">Drop Details</h3>

          <Row>
            <h5>Personal Details ( For Drop )</h5>

            <hr/>
            <Col md={6} className="mb-3">
              <Form.Group id="drop_name">
                <Form.Label> Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...register("drop_name")}
                />
                <p className="text-danger">{errors.drop_name?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="drop_mobile">
                <Form.Label> Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  {...register("drop_mobile")}
                />
                <p className="text-danger">{errors.drop_mobile?.message}</p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
          <h5>Address </h5>

<hr/>
{/* <br/> */}
            <Col md={12} className="mb-3">
              <Form.Group id="drop_address1">
                <Form.Label>Drop Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  name="drop_address1"
                  placeholder="Enter address line 1"
                  {...register("drop_address1")}
                  onChange={handleDropChange}
                />
                <p className="text-danger">{errors.drop_address1?.message}</p>
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group id="drop_address2">
                <Form.Label>Drop Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  name="drop_address2"
                  placeholder="Enter address line 2"
                  {...register("drop_address2")}
                  onChange={handleDropChange}
                />
              </Form.Group>
            </Col>
          </Row>
         

          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="drop_house">
                <Form.Label>Apartment Number</Form.Label>
                <Form.Control
                  type="text"
                  name="drop_house"
                  placeholder="Enter apartment number for drop location"
                  {...register("drop_house")}
                  onChange={handleDropChange}
                />
              </Form.Group> 
            </Col>


            <Col md={4} className="mb-3">
              <Form.Group id="drop_landmark">
                <Form.Label> Landmark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter landmark for drop location"
                  {...register("drop_landmark")}
                  name="drop_landmark"
                  onChange={handleDropChange}
                />
              </Form.Group>
            </Col>

            <Col md={4} className="mb-3">
              <Form.Group id="drop_zip">
                <Form.Label>Drop Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zip code"
                  {...register("drop_zip")}
                  onChange={(e) => {
                    handleZipChange(e, false);
                    handleDropChange(e);
                  }}
                />
              </Form.Group>
            </Col>
            

           
          </Row>
 <br/>
          <Row>
           
            <Col md={4} className="mb-3">
              <Form.Group id="drop_district">
                <Form.Label>drop district</Form.Label>
                <Form.Control
                  type="text"
                  name="drop_district"
                  placeholder="Enter drop district"
                  {...register("drop_district")}
                  
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="drop_city">
                <Form.Label>Drop City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Drop city"
                  {...register("drop_city")}
                  readOnly
                />
              </Form.Group>
            </Col>
           <Col md={4} className="mb-3">
              <Form.Group id="drop_state">
                <Form.Label>Drop State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Drop state"
                  {...register("drop_state")}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
           
           <hr/>
          </Row>
<br/>
<h4>Pin Point</h4>
<br/>
<div> <MapLocationFinder  markers={markers} pickupLoc={pickupLoc} dropLoc={dropLoc} setMarkers={setMarkers} onCoordinatesUpdate={handleCoordinatesUpdate}/> </div>

          <hr />

          {/* <h5 className="mb-4">
            Select exact Pick Up and drop location in map
          </h5>

          <Row>
            <Col md={12} className="mb-3">
              <div type="none" className="btn btn-primary" onClick={openModal}>
                Select Location
              </div>
            </Col>

            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              pickupLoc={pickupLoc}
              dropLoc={dropLoc}
              markers={markers}
              setMarkers={setMarkers}
              onCoordinatesUpdate={handleCoordinatesUpdate}
            >
              <h2>Select Location</h2>
            </Modal>
          </Row>
          <hr /> */}

          <h5 className="mb-4">Bidding Configuration</h5>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="min_bid">
                <Form.Label>Min Bid</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Minimum Bidding Price "
                  {...register("min_bid")}
                />
                <p className="text-danger">{errors.min_bid?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="max_bid">
                <Form.Label>Max Bid</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Maximum Bidding Price "
                  {...register("max_bid")}
                />
                <p className="text-danger">{errors.max_bid?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="steps">
                <Form.Label>Steps</Form.Label>
                <Form.Control
                  type="text"
                  name="steps"
                  placeholder="Enter steps for bidding"
                  {...register("steps")}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="step_period">
                <Form.Label>Step Period</Form.Label>
                <Form.Control
                  type="text"
                  name="step_period"
                  placeholder="Enter step period"
                  {...register("step_period")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="dist_increment">
                <Form.Label>Distance to increment </Form.Label>
                <Form.Control
                  type="text"
                  name="dist_increment"
                  placeholder="Enter distance to increment for each bid"
                  {...register("dist_increment")}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="start_dist">
                <Form.Label>Start Distance</Form.Label>
                <Form.Control
                  type="text"
                  name="start_dist"
                  placeholder="Enter starting distance"
                  {...register("start_dist")}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <div className="mt-3"> */}
          <Button className="btn btn-primary" type="submit">
            Submit
          </Button>
          {/* </div> */}
        </Form>
      </Card.Body>
    </Card>
  );
};
