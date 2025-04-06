import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { IFile } from '../model/file';

type Response = ApiResponse<IFile>;

export const useGetCurrentSpaceFilesTree = () => {
	const fetcher = () =>
		axiosInstance.get<Response>('/files').then((response) => response.data.data);

	const { data, error, mutate, isValidating } = useSWR('/files', fetcher);

	const filesTree = data;

	return {
		filesTree,
		isLoading: isValidating,
		error: getApiResponseErrorMessage(error),
		mutateFilesTree: mutate,
	};
};
