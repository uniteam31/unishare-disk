import { useCallback, useState } from 'react';
import type { IFile } from 'entities/File';
import { IFolder } from 'entities/Folder';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { TCreateFolderForm } from '../model/createFolder';

type Props = TCreateFolderForm & {
	parentID?: IFile['id'];
};

type Response = ApiResponse<IFolder>;

export const useCreateFolderInCurrenSpace = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>();

	const createFolder = useCallback(async (props: Props) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.post<Response>('/files/folders', props);

			return response.data.data;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) ||
				'Произошла неизвестная ошибка при создании папки';

			setError(errorMessage);

			throw new Error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		isLoading,
		error,
		createFolder,
	};
};
