import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://yours-api.yoursbank.com.br/api',
  baseURL: 'http://localhost:5000/api',
});

export { api };
