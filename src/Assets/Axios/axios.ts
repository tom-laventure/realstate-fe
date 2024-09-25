import axios from "axios";

const instance = axios.create({
	baseURL: 'http://localhost:8080/',
	timeout: 1000,
	// headers: {'X-Custom-Header': ''}
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken')
	if(token) config.headers['Authorization'] = token
	return config
}, e => {
	return Promise.reject(e)
})


export default instance