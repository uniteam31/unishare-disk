import { useState, useCallback } from 'react';

// TODO: вынести в toolkit
/**
 * Хук, обеспечивающий выполнение асинхронных запросов с управлением состоянием загрузки и ошибок.
 *
 * Этот хук предоставляет:
 * - `isLoading`: логическое значение, показывающее, выполняется ли в данный момент запрос;
 * - `error`: сообщение об ошибке, если запрос завершился с ошибкой;
 * - `execute`: функцию, принимающую callback, которая выполняет асинхронный запрос и оборачивает его выполнение в обработку состояний.
 *
 * @template R Тип данных, возвращаемых запросом.
 * @returns {Object} Объект с полями `isLoading`, `error` и `execute`.
 *
 * @example
 * const { isLoading, error, execute } = useApiRequest();
 *
 * const fetchData = async () => {
 *   return await execute(() => fetch('/api/data'));
 * };
 */
export function useApiRequest<R = any>() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const execute = useCallback(async (request: () => Promise<R>): Promise<R> => {
		setIsLoading(true);
		setError(null);

		try {
			return await request();
		} catch (err: any) {
			setError(err.message || 'Произошла неизвестная ошибка');
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { isLoading, error, execute };
}
