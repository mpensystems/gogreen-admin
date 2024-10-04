// Modal.js
import React, { useState } from 'react';
import MapLocationFinder from '../pages/MapLocationFinder';

const Modal = ({ isOpen, onClose, children,dropLoc,pickupLoc,markers,setMarkers ,onCoordinatesUpdate }) => {
  if (!isOpen) return null;
console.log("dropLoc : ",dropLoc);
console.log("pickupLoc : ",pickupLoc);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        {children}
        <div> <MapLocationFinder  markers={markers} pickupLoc={pickupLoc} dropLoc={dropLoc} setMarkers={setMarkers} onCoordinatesUpdate={onCoordinatesUpdate}/> </div>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>

      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '50vw',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#f00',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Modal;
