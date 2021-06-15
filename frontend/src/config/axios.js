import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_ROOT;

const setUpAxios = () => {};
const defaultExport = { setUpAxios };

export default defaultExport;