import axios from 'axios';

const api = axios.create({
    baseURL: "https://apiragemode.somee.com"
})

export default api;