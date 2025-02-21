import axios from 'axios';
import config from "../url.js";

const headers = {
    "Content-Type": "multipart/form-data"
}

const API_URI = '${config.API_BASE_URL}';

export const getSignedUrl = async (data) => {
    try {
        const response = await axios.get(`${API_URI}/api/image-url`);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log('Error while calling the API ', error.message);
        return error.response.data;
    }
}

export const uploadFile = async (url, file) => {
    try {
        const response = await axios.put(url, file, { headers: headers });
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
        return error.response.data;
    }
}