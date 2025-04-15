import type { AxiosRequestConfig, Method } from 'axios';
import { axiosInstance } from '../../api';
import type { ApiResponse } from '../../types';
import { getApiResponseErrorMessage } from '../index';

interface RequestOptions<P = any> {
	method: Method;
	url: string;
	data?: P;
	config?: AxiosRequestConfig;
}

// TODO: вынести в toolkit
/**
 * Выполняет HTTP-запрос к серверу с использованием axios и обрабатывает ошибки.
 *
 * @template P Тип передаваемых данных, отправляемых в запросе.
 * @template R Тип данных, ожидаемых в ответе.
 * @param {RequestOptions<P>} options Объект с параметрами запроса, содержащий следующие свойства:
 *   - **method**: HTTP-метод (например, GET, POST, PUT, DELETE).
 *   - **url**: URL, по которому выполняется запрос.
 *   - **data** (необязательно): Данные, отправляемые вместе с запросом (например, объект, FormData и т.д.).
 *   - **config** (необязательно): Дополнительные настройки запроса, совместимые с Axios.
 * @returns {Promise<R>} Промис, который разрешается данными ответа.
 *
 * @throws {Error} Генерирует ошибку с сообщением, полученным из функции getApiResponseErrorMessage, если запрос завершается неудачно.
 *
 * @example
 * const data = await sendApiRequest<{ name: string }, { id: number }>({
 *   method: 'POST',
 *   url: '/api/users',
 *   data: { name: 'Daniil Perekosov' },
 * });
 */
export async function sendApiRequest<P = any, R = any>(options: RequestOptions<P>): Promise<R> {
	const { method, url, data, config } = options;

	try {
		const response = await axiosInstance.request<ApiResponse<R>>({
			method: method,
			url: url,
			data: data,
			...config,
		});

		return response.data.data;
	} catch (error) {
		const errorMessage =
			getApiResponseErrorMessage(error) ||
			'Произошла неизвестная ошибка при выполнении запроса';

		throw new Error(errorMessage);
	}
}
