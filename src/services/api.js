import axios from 'axios';

const api = axios.create({
    baseURL: "http://apiragemode.somee.com"
})

export default api;