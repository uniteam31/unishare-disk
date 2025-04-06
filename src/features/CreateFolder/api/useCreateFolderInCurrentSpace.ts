import type { IFile } from 'entities/FileObject';
import { IFolder } from 'entities/Folder';
import { useApiRequest } from 'shared/hooks';
import { sendApiRequest } from 'shared/lib';
import type { TCreateFolderForm } from '../model/createFolder';

type Props = TCreateFolderForm & {
	parentID?: IFile['id'];
};

export const useCreateFolderInCurrenSpace = () => {
	const { isLoading, error, execute } = useApiRequest<IFolder>();

	const createFolder = (props: Props) => {
		return execute(() =>
			sendApiRequest<Props, IFolder>({
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
