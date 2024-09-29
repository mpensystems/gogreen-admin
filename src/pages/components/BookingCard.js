import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
// import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import { Card} from '@themesberg/react-bootstrap';



export default ({title}) => {
  return (
    <>
      

      <Row>
       
      <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
         
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <div className="d-md-block text-start">
                  <h6 className="fw-normal text-dark mb-1">PickUp Location </h6>
                   <div className="text-gray ">pickup_address1</div>
                   <div className="text-gray ">pickup_address2</div>
                   <div className="text-gray ">pickup_house</div>
                   <div className="text-gray ">pickup_landmark</div>
                   <div className="text-gray ">pickup_zip</div>
                   <div className="text-gray ">pickup_city</div>
                   <div className="text-gray ">pickup_state</div>
                   <div className="text-gray ">pickup_district</div>
                   <div className="text-gray ">pickup_mobile</div>
                   <div className="text-gray ">pickup_name</div>
                   <div className="text-gray ">pickup_geo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
     </Card>
      </Row>
    </>
  );
};
