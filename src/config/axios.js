import axios from 'axios';

const token = localStorage.getItem("token");

const instance = axios.create({
    // baseURL: 'http://14.225.206.168/api/',
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true,
    headers: {
        common: {
            Authorization: token !== null ? "Bearer " + token : "",
        },
    },
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
