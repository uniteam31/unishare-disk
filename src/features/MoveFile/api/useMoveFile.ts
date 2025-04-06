import type { IFile } from 'entities/File';
import { useApiRequest } from 'shared/hooks';
import { sendApiRequest } from 'shared/lib';

type Props = {
	fileID: IFile['id'];
	parentID?: IFile['id'];
};

export const useMoveFile = () => {
	const { isLoading, error, execute } = useApiRequest<IFile>();

	const moveFile = (props: Props) => {
		return execute(() => sendApiRequest({ method: 'PUT', url: 'files/move', data: props }));
	};

	return {
		isLoading,
		error,
		moveFile,
	};
};
