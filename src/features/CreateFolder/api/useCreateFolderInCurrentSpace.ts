import type { IFile } from 'entities/FileObject';
import { useApiRequest } from 'shared/hooks';
import { sendApiRequest } from 'shared/lib';
import type { TCreateFolderForm } from '../model/createFolder';

type Props = TCreateFolderForm & Partial<Pick<IFile, 'parentID'>>;

export const useCreateFolderInCurrenSpace = () => {
	const { isLoading, error, execute } = useApiRequest<IFile>();

	const createFolder = (props: Props) => {
		return execute(() =>
			sendApiRequest<Props, IFile>({
				method: 'POST',
				url: '/files/folders',
				data: props,
			}),
		);
	};

	return {
		isLoading,
		error,
		createFolder,
	};
};
