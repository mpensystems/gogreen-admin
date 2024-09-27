import React from 'react';
import { useParams } from 'react-router-dom';

const KycDetails = () => {
    const { id } = useParams(); // Get the rider ID from the URL
    console.log("rider id here ",id);
    return (
        <div>
            <h3>Rider Details for ID: {id} KycDetails</h3>
            {/* Render rider details here */}
        </div>
    );
};

export default KycDetails;
