import axios from 'axios';

const token = localStorage.getItem("paisestoken");

export const APIHeaders = {
   Accept: 'application/json',
   'Content-type': 'multipart/form-data',
   'Access-Control-Allow-Origin': '*',
   Authorization : `Bearer ${token}`
};

export const API = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: APIHeaders
});
