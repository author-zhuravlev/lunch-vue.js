import axios from 'axios';
import getDataFromLocalStorage from '@/utils/getDataFromLocalStorage';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    accept: 'application/json',
  },
  withCredentials: true
});

const token = getDataFromLocalStorage('token');

if (token) {
  instance.defaults.headers.common['Authorization'] = token;
}

export default instance;

