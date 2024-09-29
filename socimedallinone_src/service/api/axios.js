import axios from 'axios';
import { BASE_URL, DefaultHeader } from '../config';

const createAxios = (baseURL = BASE_URL, headers = DefaultHeader) => {
	const customAxios = axios.create({
		baseURL: baseURL,
		headers: headers
	});

	customAxios.interceptors.request.use(
		async (config) => {
			// Do something before request is sent

			return config;
		},
		(error) => {
			// Do something with request error
			Promise.reject(error);
		}
	);

	// function renderSuccessMessage(title = '', message) {
	//   Toast.show(message);
	// }

	customAxios.interceptors.response.use(
		async (response) => {
			return response;
		},
		async (error) => {
			return Promise.reject(error);
		}
	);

	return customAxios;

	//   return {
	//     get: config =>
	//       customAxios({
	//         method: 'GET',
	//         ...config,
	//       }),
	//     post: config =>
	//       customAxios({
	//         method: 'POST',
	//         ...config,
	//       }),
	//     put: config =>
	//       customAxios({
	//         method: 'PUT',
	//         ...config,
	//       }),
	//   };
};

export default createAxios;
