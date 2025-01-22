import axios, { AxiosRequestConfig } from 'axios';
import { useAlert } from '@/context/AlertContext';

interface RequestApiProps {
	path: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	data?: object;
	params?: object;
	headers?: object;
	onError?: () => void;
	showErrorAlert?: boolean;
	showSuccessAlert?: boolean;
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
		showSuccessAlert = false,
		showErrorAlert = true,
	}: RequestApiProps): Promise<T> {
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
				showSuccessAlert = true;
				showErrorAlert = false;
				if (showSuccessAlert) {
					showAlert('API SUCCESS', 'success');
				}
				return response;
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					const errorMessage = error.message || 'Nieznany błąd';
					if (showErrorAlert) {
						showAlert(errorMessage, 'error');
					}
				} else {
					if (showErrorAlert) {
						showAlert('Wystąpił nieoczekiwany błąd', 'error');
					}
				}
				if (onError) {
					onError();
				}
				return error;
			});
	}

	return { requestApi };
}
