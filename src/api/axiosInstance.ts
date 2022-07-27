import axios from 'axios';
import { HttpRequest } from "./httpRequest"

export const Address_URL = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/`;
export const Register_URL = 'http://localhost:8000/register/';

export const axiosAddress = axios.create({
  baseURL: Address_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
export const axiosRegister = axios.create({
  baseURL: Register_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const addressService = new HttpRequest(axiosAddress);
export const registerService = new HttpRequest(axiosRegister)

