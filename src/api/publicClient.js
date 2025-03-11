import axios from 'axios';

const publicApiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

export default publicApiClient;
