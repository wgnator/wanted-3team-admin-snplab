import axios from 'axios';
import { resolvePath } from 'react-router-dom';
// import { BASE_URL } from '../constants/constants';
export const BASE_URL = 'http://localhost:8000/';
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const axiosPromise =(callback:any) => {
  return new Promise(function(){
    resolvePath(callback);
  })
}
