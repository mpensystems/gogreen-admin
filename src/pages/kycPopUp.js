
// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "@themesberg/react-bootstrap";
// import ImageComponent from "../components/ImageComponent";

// const KycPopUp = ({ token, rid, show, handleClose, modalData = {}, title }) => {
//   const { frontImageUrl, backImageUrl, info } = modalData;
//   console.log("info: ",info);
//   console.log("modalData: ",modalData);
  
//   // Fallback image URLs (actual image URLs)
//   const tempFrontImageUrl =
//     "https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8";
//   const tempBackImageUrl =
//     "https://plus.unsplash.com/premium_photo-1664457233796-d863a0ce5641?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8";

//   // Effect hook to track changes in the title prop
//   useEffect(() => {
//     console.log("Title prop changed: ", title);
//   }, [title]);

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{title}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="d-flex flex-column flex-lg-row">
//         {/* Left side: Images */}
//         <div
//           className="d-flex flex-column align-items-center"
//           style={{
//             flex: "1",
//             marginBottom: "20px",
//             maxWidth: "400px", // Limit the width of the image section
//           }}
//         >
//           {/* Display front image using ImageComponent or fallback image */}
          
//           {frontImageUrl ? (
//             <div style={{ marginBottom: "10px", width: "100%", maxHeight: "300px" }}>
//               <h6>Front Side</h6>
//               <ImageComponent
//                 token={token}
//                 rid={rid}
//                 fileid={frontImageUrl} 
//               />
//             </div>
//           ) : (
//             <div style={{ marginBottom: "10px", width: "100%", maxHeight: "300px" }}>
//               <img
//                 src={tempFrontImageUrl}
//                 alt="Fallback Front Image"
//                 style={{ width: "100%", height: "auto" }}
//               />
//             </div>
//           )}

//           {backImageUrl ? (
            
//             <div style={{ width: "100%", maxHeight: "300px" }}>
//               <h6>Back side</h6>
//               <ImageComponent
//                 token={token}
//                 rid={rid}
//                 fileid={backImageUrl} 
//               />
//             </div>
//           ) : (
//             // <div style={{ width: "100%", maxHeight: "300px" }}>
//             //   <img
//             //     src={tempBackImageUrl}
//             //     alt="Fallback Back Image"
//             //     style={{ width: "100%", height: "auto" }}
//             //   />
//             // </div>
//             <></>
//           )}
//         </div>

//         {/* Right side: Information */}
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{
//             flex: "1",
//             padding: "20px",
//             textAlign: "left",
//             overflowY: "auto", // Allow scrolling if content is too long
//           }}
//         >
//           <div>
//             {/* Display key-value pairs for the modal data */}
//             {Object.keys(modalData).length > 0 ? (
//   Object.entries(modalData)
//     .filter(([key]) => key !== "frontImageUrl" && key !== "backImageUrl" && key !== "title") // Exclude specific keys
//     .map(([key, value]) => (
//       <div key={key} style={{ marginBottom: "10px" }}>
//         <strong>{key}:</strong> {value}
//       </div>
//     ))
// ) : (
//   <div>No data available</div>
// )}

//           </div>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default KycPopUp;












import React, { useEffect } from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";
import ImageComponent from "../components/ImageComponent";

const KycPopUp = ({ token, rid, show, handleClose, modalData = {}, title }) => {
  const { frontImageUrl, backImageUrl } = modalData;

  const tempFrontImageUrl = "https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?w=500&auto=format&fit=crop&q=60";
  const tempBackImageUrl = "https://plus.unsplash.com/premium_photo-1664457233796-d863a0ce5641?w=500&auto=format&fit=crop&q=60";

  useEffect(() => {
    console.log("Title prop changed: ", title);
  }, [title]);

  const labelMapping = {
    Name: "Name",
    Mobile: "Mobile Number",
    Gender: "Gender",
    Dob: "Date of Birth",
    Aadhar_No: "Aadhar Number",
    Address: "Address",
    Pan_no: "PAN Number",
    Bank_account: "Bank Account Number",
    Bank_ifsc: "Bank IFSC Code",
    Bank_ac_name: "Account Holder Name",
    Drivers_license: "Driver's License No",
    Drivers_license_expiry: "License Expiry Date",
    Vehicle_type: "Vehicle Type",
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column flex-lg-row">
        {/* Left side: Images */}
        <div className="d-flex flex-column align-items-center" style={{ flex: "1", marginBottom: "20px", maxWidth: "400px" }}>
          {/* Front Image */}
          <div style={{ marginBottom: "50px", width: "100%", maxHeight: "300px" }}>
            <h6>{title=="Pan Card Details" ? (" "):  (title=="Bank Details"?("Cancelled Cheque"):("Front Side"))}</h6>
            {frontImageUrl ? (
              <ImageComponent token={token} rid={rid} fileid={frontImageUrl} />
            ) : (
              <img src={tempFrontImageUrl} alt="Fallback Front Image" style={{ width: "100%", height: "auto" }} />
            )}
          </div>
          {/* Back Image */}
          {backImageUrl && (
            <div style={{ width: "100%", maxHeight: "300px" }}>
              <h6>Back Side</h6>
              <ImageComponent token={token} rid={rid} fileid={backImageUrl} />
            </div>
          )}
        </div>

        {/* Right side: Information */}
        <div className="d-flex justify-content-center align-items-center" style={{ flex: "1", padding: "20px", textAlign: "left", overflowY: "auto" }}>
        <div >
  {Object.keys(modalData).length > 0 ? (
    Object.entries(modalData)
      .filter(([key]) => !["frontImageUrl", "backImageUrl", "title"].includes(key)) // Filter out specific keys
      .map(([key, value]) => (
        <div key={key} style={{ display: "flex", marginBottom: "10px" }}>
          <div style={{ fontWeight: "bold", width: "150px" }}>{labelMapping[key]}:</div>
          <div style={{ flex: 1 }}>{value}</div>
        </div>
      ))
  ) : (
    <div>No data available</div>
  )}
</div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KycPopUp;
