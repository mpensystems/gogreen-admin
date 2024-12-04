
import React, { useState , useEffect

 } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';
import { CircleChart, BarChart, SalesValueChart, SalesValueChartphone } from "./Charts";
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';

import Profile1 from "../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../assets/img/profile-cover.jpg";
import { Spinner } from "@themesberg/react-bootstrap";

import teamMembers from "../data/teamMembers";
import { getImage } from "../api/adminApis";
import { useAuth } from "../context/AuthContext";
import ImageComponent from "./ImageComponent";
// const BASE_URL = process.env.imageUrl;
// const BASE_URL = "http://34.93.209.158:8004/v1/kyc";



export const ProfileCardWidget = ({profileData}) => {

  const { fullName, city, vehicleNumber,state ,rid,mobile,photo} = profileData;
  
 console.log("rider photo : ",photo);

 const {auth} = useAuth();
 const token = auth?.token;

 console.log("token for rider image : ", token);
 
  // const fullName = rider ? `${rider.first_name} ${rider.last_name}` : ''; 

  // call rider api here for profile
  return (
    <Card border="light" className="text-center p-0 mb-4">
      <div style={{ backgroundColor:"#61DAFB" }} className="profile-cover rounded-top" />
      <Card.Body className="pb-5">
        <div className="user-avatar large-avatar mx-auto mt-n7 mb-1 rounded-circle" >
        <ImageComponent 
         token={token}
         rid={rid}
         fileid={photo}
        //  blur={true}
        // className=" rounded-circle "

        round={true}
        />
        </div>
        
        {/* <Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-1" /> */}

        <Card.Title>{fullName}</Card.Title>
        {/* <Card.Subtitle className="fw-normal">Senior Software Engineer</Card.Subtitle> */}
        {/* <Card.Text className="text-gray mb-4">City of Operation : {city +","+ state}</Card.Text> */}
        <Card.Text className="text-gray mb-3">Vehicle No :{vehicleNumber}</Card.Text>
        <Card.Text className="text-gray mb-3">City of Operation : {city + " , " + state}</Card.Text>
        
        <Card.Text className="text-gray mb-0">Mobile Number  : {mobile}</Card.Text>

        {/* <Button variant="primary" size="sm" className="me-2">
          <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Connect
        </Button> */}
        {/* <Button variant="secondary" size="sm">Send Message</Button> */}
      </Card.Body>
    </Card>
  );
};




export const KycCardWidget = ({ profileData, rid }) => {
  
  const fileid = profileData?.photo;
  console.log("rid, fileid : ",rid, fileid);
  const fullName = profileData?.first_name + profileData?.last_name;
  const { auth } = useAuth();
  const token = auth?.token;
  const [imageSrc, setImageSrc] = useState(Profile1); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      console.log("image requiremnet here : ",fileid ,rid);
      
      if (fileid && rid && token) {
        
        try {
          console.log("rid, fileid inside: ",rid, fileid);
          const response = await getImage(token, rid, fileid);
          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageSrc(imageObjectURL); 

        } catch (error) {
          console.error("Failed to load image");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); 
      }
    };

    fetchImage();
  }, [rid, fileid, token]);


  console.log("image after set with api : ",imageSrc);
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Card border="light" className="text-center p-0 mt-2 ">
  <div style={{ backgroundColor: "#61DAFB" }} className="profile-cover rounded-top" />
  <Card.Body className="pb-4">
    <Card.Img
      src={imageSrc}
      alt="Neil Portrait"
      className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-1"
    />

    <Card.Title>{fullName}</Card.Title>

    {/* Container for key-value pairs */}
    <div className="text-start px-4">
      <div className="row mb-2">
        <div className="col-4 text-gray"><b>Mobile :</b></div>
        <div className="col-8">{profileData?.mobile}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-gray"><b>Gender :</b></div>
        <div className="col-8">{profileData?.gender}</div>
      </div>
      <div className="row mb-2">
        <div className="col-4 text-gray"><b>Address :</b></div>
        <div className="col-8">
          {profileData?.address_line1}, {profileData?.address_line2}, {profileData?.city}, {profileData?.zipcode}, {profileData?.state}, {profileData?.district}
        </div>
      </div>
    </div>
  </Card.Body>
</Card>

  );
};

export const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Image</div>
                  <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};








export const RidersWidget = ({ icon, iconColor, category, title ,refreshing }) => {
  return (
    <Card border="light" className="shadow-sm h-100">
      <Card.Body>
        <Row className="align-items-center text-center text-md-start">

          {refreshing ? (<div className="d-flex justify-content-center align-items-center w-100 h-100 position-absolute" style={{ zIndex: 10 }}>
            <Spinner animation="border" variant="primary" />
          </div>):(
<>
<Col xs={4} md={4} className="d-flex justify-content-center align-items-center">
            <div
              className="icon rounded-circle d-flex justify-content-center align-items-center"
              style={{ backgroundColor: iconColor, width: "50px", height: "50px" , color:'white' }}
            >
              {/* <FontAwesomeIcon icon={icon} style={{ color: "white", fontSize: "1.5rem" }} /> */}

              {icon}

            </div>
          </Col>
          <Col xs={8} md={8}>
            <h5 className="mb-1" style={{ color: iconColor }}>{category}</h5>
            <h4>{title}</h4>
          </Col>
</>
          )}

          
        </Row>
      </Card.Body>
    </Card>
  );
};





// export const RidersWidget = ({ icon, iconColor, category, title, refreshing }) => {
//   return (
//     <Card border="light" className="shadow-sm h-100">
//       <Card.Body>
//         <Row className="align-items-center text-center text-md-start">
//           {refreshing ? (
//             <div
//               className="d-flex justify-content-center align-items-center w-100 h-100 position-absolute"
//               style={{ zIndex: 10 }}
//             >
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : (
//             <>
//               <Col xs={4} md={4} className="d-flex justify-content-center align-items-center">
//                 <div
//                   className="icon rounded-circle d-flex justify-content-center align-items-center"
//                   style={{
//                     backgroundColor: iconColor,
//                     width: "60px", // Increased size for better visibility
//                     height: "60px", // Increased size for better visibility
//                   }}
//                 >
//                   {icon}
//                 </div>
//               </Col>
//               <Col xs={8} md={8}>
//                 <h5 className="mb-1" style={{ color: iconColor }}>
//                   {category}
//                 </h5>
//                 <h4>{title}</h4>
//               </Col>
//             </>
//           )}
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// };



export const CircleChartWidget = (props) => {
  const { title, data = [] } = props;
  const series = data.map(d => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col xs={12} xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map(d => (
              <h6 key={`circle-element-${d.id}`} className="fw-normal text-gray">
                <FontAwesomeIcon icon={d.icon} className={`icon icon-xs text-${d.color} w-20 me-1`} />
                {` ${d.label} `}{`${d.value}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export const BarChartWidget = (props) => {
  const { title, value, percentage, data = [] } = props;
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const series = data.map(d => d.value);
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="d-flex flex-row align-items-center flex-0 border-bottom">
        <div className="d-block">
          <h6 className="fw-normal text-gray mb-2">{title}</h6>
          <h3>{value}</h3>
          <small className="mt-2">
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={`${percentageColor} fw-bold`}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-block ms-auto">
          {data.map(d => (
            <div key={`bar-element-${d.id}`} className="d-flex align-items-center text-end mb-2">
              <span className={`shape-xs rounded-circle bg-${d.color} me-2`} />
              <small className="fw-normal">{d.label}</small>
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Body className="p-2">
        <BarChart labels={labels} series={series} />
      </Card.Body>
    </Card>
  );
};

export const TeamMembersWidget = () => {
  const TeamMember = (props) => {
    const { name, statusKey, image, icon, btnText } = props;
    const status = {
      online: { color: "success", label: "Online" },
      inMeeting: { color: "warning", label: "In a meeting" },
      offline: { color: "danger", label: "Offline" }
    };

    const statusColor = status[statusKey] ? status[statusKey].color : 'danger'
      , statusLabel = status[statusKey] ? status[statusKey].label : 'Offline';

    return (
      <ListGroup.Item className="px-0">
        <Row className="align-items-center">
          <Col className="col-auto">
            <a href="#top" className="user-avatar">
              <Image src={image} className="rounded-circle" />
            </a>
          </Col>
          <Col className="ms--2">
            <h4 className="h6 mb-0">
              <a href="#!">{name}</a>
            </h4>
            <span className={`text-${statusColor}`}>● </span>
            <small>{statusLabel}</small>
          </Col>
          <Col className="col-auto">
            <Button variant="tertiary" size="sm">
              <FontAwesomeIcon icon={icon} className="me-1" /> {btnText}
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light d-flex justify-content-between">
        <h5 className="mb-0">Team members</h5>
        <Button variant="secondary" size="sm">See all</Button>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush list my--3">
          {teamMembers.map(tm => <TeamMember key={`team-member-${tm.id}`} {...tm} />)}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const ProgressTrackWidget = () => {
  const Progress = (props) => {
    const { title, percentage, icon, color, last = false } = props;
    const extraClassName = last ? "" : "mb-2";

    return (
      <Row className={`align-items-center ${extraClassName}`}>
        <Col xs="auto">
          <span className={`icon icon-md text-${color}`}>
            <FontAwesomeIcon icon={icon} className="me-1" />
          </span>
        </Col>
        <Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">{title}</h6>
              <small className="fw-bold text-dark">
                <span>{percentage} %</span>
              </small>
            </div>
            <ProgressBar variant={color} now={percentage} min={0} max={100} />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Progress track</h5>
      </Card.Header>
      <Card.Body>

        <Progress title="Rocket - SaaS Template" color="purple" icon={faBootstrap} percentage={34} />
        <Progress title="Pixel - Design System" color="danger" icon={faAngular} percentage={60} />
        <Progress title="Spaces - Listings Template" color="tertiary" icon={faVuejs} percentage={45} />
        <Progress title="Stellar - Dashboard" color="info" icon={faReact} percentage={35} />
        <Progress last title="Volt - Dashboard" color="purple" icon={faBootstrap} percentage={34} />
      </Card.Body>
    </Card>
  );
};

export const RankingWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6><FontAwesomeIcon icon={faGlobeEurope} className="icon icon-xs me-3" /> Global Rank</h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              #755 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>
            <h6 className="mb-0"><FontAwesomeIcon icon={faFlagUsa} className="icon icon-xs me-3" />Country Rank</h6>
            <div className="small card-stats">
              United States <FontAwesomeIcon icon={faAngleUp} className="icon icon-xs text-success ms-2" />
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #32 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-3">
          <div>
            <h6 className="mb-0"><FontAwesomeIcon icon={faFolderOpen} className="icon icon-xs me-3" />Category Rank</h6>
            <Card.Link href="#top" className="small card-stats">
              Travel &gt; Accomodation
            </Card.Link>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              #16 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidget = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">
            {title}
          </h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={percentageColor}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">Month</Button>
          <Button variant="primary" size="sm" className="me-3">Week</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChart />
      </Card.Body>
    </Card>
  );
};

export const SalesValueWidgetPhone = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-md-flex flex-row align-items-center flex-0">
        <div className="d-block mb-3 mb-md-0">
          <h5 className="fw-normal mb-2">
            {title}
          </h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={percentageColor}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button variant="secondary" size="sm" className="me-2">Month</Button>
          <Button variant="primary" size="sm" className="me-3">Week</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <SalesValueChartphone />
      </Card.Body>
    </Card>
  );
};

export const AcquisitionWidget = () => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <h5>Acquisition</h5>
        <p>Tells you where your visitors originated from, such as search engines, social networks or website referrals.</p>
        <div className="d-block">
          <div className="d-flex align-items-center pt-3 me-5">
            <div className="icon icon-shape icon-sm icon-shape-danger rounded me-3">
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div className="d-block">
              <label className="mb-0">Bounce Rate</label>
              <h4 className="mb-0">33.50%</h4>
            </div>
          </div>
          <div className="d-flex align-items-center pt-3">
            <div className="icon icon-shape icon-sm icon-shape-quaternary rounded me-3">
              <FontAwesomeIcon icon={faChartArea} />
            </div>
            <div className="d-block">
              <label className="mb-0">Sessions</label>
              <h4 className="mb-0">9,567</h4>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
