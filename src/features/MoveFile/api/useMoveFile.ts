import { useCallback, useState } from 'react';
import type { IFile } from 'entities/File';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

type Props = {
	fileID: IFile['id'];
	parentID?: IFile['id'];
};

type Response = ApiResponse<IFile>;

export const useMoveFile = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const moveFile = useCallback(async (props: Props) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.put<Response>('/files/move', props);

			return response.data.data;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при перемещении файла';

			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		moveFile,
	};
};
