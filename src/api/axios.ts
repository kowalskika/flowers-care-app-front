import axiosDefault from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://yourflowerscare.networkmanager.pl/';

export const axios = axiosDefault.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axiosDefault.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
