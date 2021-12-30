import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.136.128:8000',
    timeout: 1000,
    withCredentials: true
})

export default instance;