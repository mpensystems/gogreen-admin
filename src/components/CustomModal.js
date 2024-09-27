import React, { useState,useEffect } from 'react';
import { Modal, Button ,Card} from '@themesberg/react-bootstrap';


const CustomModal = ({ show, handleClose, title, children, footerButtons, images }) => {
    console.log("images in custome components ",images);
    const URL = 'http://localhost:8080';


    const [kycDoc, setKycDoc] = useState({});

    const [imageUrls, setImageUrls] = useState({
        photoImage: '',
        aadharImage: '',
        panCardImage: '',
        rcCardImage: ''
    });
    useEffect(()=>{
        setKycDoc(images);

        setImageUrls({
            photoImage: `${URL}/${kycDoc?.photo}` ,
            aadharImage: `${URL}/${kycDoc?.aadharCard}` ,
            panCardImage:  `${URL}/${kycDoc?.panCard}` ,
            rcCardImage: `${URL}/${kycDoc?.rcCard}` 
        });
    },[images])


    console.log("herre photo news",kycDoc);
    console.log("herre photo is",`${URL}/${kycDoc?.photo}`);
  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h6">{title}</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        {children}
        {kycDoc && kycDoc.length > 0 && (
          <div className="image-gallery" style={{
            // display: 'flex',
            // flexWrap: 'wrap',
            // gap: '100px' 
        }}>
            {kycDoc.map((image, index) => (
                <Card border="light" style={{
                    border: 'none', 
                    borderRadius: '8px',
                    border:"2px solid red",

                    // overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    // maxWidth: '200px' 
                    margin:"20px"
                }}>
              <img 

                key={index}
                src={`${URL}/${image}`}
                alt={`image-${index}`}
                style={{
                    width: '100%', 
                    height: 'auto',
                    display: 'block' 
                }}
              />
              </Card>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {footerButtons.map((button, index) => (
          <Button key={index} variant={button.variant} onClick={button.onClick}>
            {button.label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;


