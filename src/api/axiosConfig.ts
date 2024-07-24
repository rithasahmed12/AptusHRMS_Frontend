import axios from "axios";

const BASE_URL = import.meta.env.PROD ? 'https://api.shoetopia.site/' : import.meta.env.VITE_BASE_URL;
console.log('BaseUrl:',BASE_URL);
const Api = axios.create({baseURL:BASE_URL})

export default Api; 