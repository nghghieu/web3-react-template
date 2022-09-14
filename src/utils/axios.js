import axios from 'axios';

const { REACT_APP_API_BASE_URL, REACT_APP_API_VERSION } = process.env;

const axiosClient = axios.create({
  baseURL: `${REACT_APP_API_BASE_URL}/${REACT_APP_API_VERSION}`,
  validateStatus: (status) => status >= 200 && status < 400,
});

export default axiosClient;
