import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-6ff64.firebaseio.com/'
});

export default instance;