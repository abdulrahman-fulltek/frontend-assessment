import axios from "axios";


export const doAction = async ({ value }) => {

    let data = { value: value };

    try {
        const response = await axios.post("MOCK_ENDPOINT", data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}