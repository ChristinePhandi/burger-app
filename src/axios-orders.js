import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-app-920d4.firebaseio.com/'
});

export default instance;