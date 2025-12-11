import axios from 'axios'
import { fetchAuthSession } from 'aws-amplify/auth'

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
})

api.interceptors.request.use(async (config) => {
	try {
		const session = await fetchAuthSession()
		const token = session.tokens?.accessToken?.toString()

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
	} catch (error) {
		console.error('Failed to fetch auth session:', error)
	}

	return config
}, (error) => {
	return Promise.reject(error)
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)

export default api