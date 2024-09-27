import React from 'react';
import { useParams } from 'react-router-dom';

const RiderDetails = () => {
    const { id } = useParams(); // Get the rider ID from the URL
    console.log("rider id here ",id);
    // Fetch rider details using the id or use passed props if available
    // Example: useEffect(() => { fetchRiderDetails(id); }, [id]);

    return (
        <div>
            <h3>Rider Details for ID: {id}</h3>
            {/* Render rider details here */}
        </div>
    );
};

export default RiderDetails;
