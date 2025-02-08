import axios, { AxiosRequestConfig } from 'axios';
import { useAlert } from '@/context/AlertProvider';

interface RequestApiProps {
	path: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	data?: object;
	params?: object;
	headers?: object;
	onError?: () => void;
}

export function useRequestApi() {
	const { showAlert } = useAlert();

	function requestApi<T = unknown>({
		path,
		method,
		data,
		params,
		onError,
		headers,
	}: RequestApiProps): Promise<{ status: number; data: T }> {
		const config: AxiosRequestConfig = {
			method,
			url: path,
			data,
			baseURL: 'http://eletele.tplinkdns.com/api',
			params: params,
			timeout: 5000,
			withCredentials: true,
			headers,
		};

		return axios(config)
			.then((response) => {
				showAlert('API SUCCESS', 'success');
				return { status: response.status, data: response.data };
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					const errorMessage = error.message || 'Nieznany błąd';
					showAlert(errorMessage, 'error');
				} else {
					showAlert('Wystąpił nieoczekiwany błąd', 'error');
				}
				if (onError) {
					onError();
				}
				return {
					status: error.response?.status || 500,
					data: error.response?.data || {},
				};
			});
	}

	return { requestApi };
}
