import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yours-api.yoursbank.com.br/api',
});

export { api };
