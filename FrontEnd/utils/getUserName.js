import axios from "axios";

const getUserName = async () => {
    try {
        const response = await axios.get('http://localhost:3069/api/session', {
            withCredentials: true,
        });


        const userName = response.data;

        if (!userName) {
            console.error("No username found in session.");
            return null; 
        }

        console.log(userName);
        return userName;
    } catch (error) {
        console.error("Error fetching username:", error.message);
        return null; 
    }
};

export default getUserName;
