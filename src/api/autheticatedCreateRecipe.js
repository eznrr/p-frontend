import axios from 'axios';

const authenticatedCreateRecipe = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

authenticatedCreateRecipe.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default authenticatedCreateRecipe;
