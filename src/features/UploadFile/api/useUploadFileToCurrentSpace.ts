import { useCallback, useState } from 'react';
import type { IFile } from 'entities/File';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { TUploadFileForm } from '../model/file';

type Props = TUploadFileForm & {
	parentID?: IFile['id'];
};

// TODO: обработать возвращаемое значение
type Response = ApiResponse<string>;

export const useUploadFileToCurrentSpace = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const uploadFile = useCallback(async (props: Props) => {
		const { file, parentID } = props;

		if (!file) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const formData = new FormData();

			formData.append('file', file);

			if (parentID) {
				formData.append('parentID', parentID);
			}

			const response = await axiosInstance.post<Response>('/files', formData);

			return response.data.data;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при загрузке файла';

			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		uploadFile,
	};
};
