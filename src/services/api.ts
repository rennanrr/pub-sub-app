import axios from 'axios';
/* import jwt from 'jwt-decode'
import { logout } from '../Actions/userActions'; */

const Api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3000/api/v1/"
});

Api.interceptors.request.use(async config => {
  const token = localStorage.getItem('X-ACCESS-TOKEN');
  if (token) {
    /* const expireded = jwt(token).exp <= Date.now().valueOf() / 1000;
    if (expireded) {
      logout();
    }
    config.headers.Authorization = `${token}`; */
  }
  return config;
});

export default Api;