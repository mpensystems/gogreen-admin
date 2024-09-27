const url = process.env.REACT_APP_BACKEND_URL;
const URL  = "http://localhost:8080";


export const getAllRiders = async()=>{
    try {
        // console.log('url : ',url);
        const response = await fetch(`${URL}/v1/rider/getAllRiders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("get all riders data", data);
        
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}


export const getAllBookings = async()=>{
    try {
        // console.log('url : ',url);
        const response = await fetch(`${URL}/v1/booking/getAllBookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("get all Bookings data", data);

        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}


export const getRiderById = async()=>{
    try {
        // console.log('url : ',url);
        const response = await fetch(`${URL}/v1/routes/admin/getRiderById`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}


export const getRidersKYCDoc = async()=>{
    try {
        // console.log('url : ',url);
        const response = await fetch(`${URL}/v1/routes/admin/getRidersKYCDoc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data in api ",data)
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

// for transaction table

export const getAllTransactions = async()=>{
    try {
        // console.log('url : ',url);
        const response = await fetch(`${URL}/v1/rider/get-transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("get all Transactions data", data);
        
        return data;
    } catch (error) {
        console.error('Error fetching Transactions:', error);
        throw error;
    }
}