import { useState } from 'react';
import type { IFile } from 'entities/File';
import { useApiRequest } from 'shared/hooks';
import { sendApiRequest } from 'shared/lib';
import type { TUploadFileForm } from '../model/file';

type Props = TUploadFileForm & {
	parentID?: IFile['id'];
};

export const useUploadFileToCurrentSpace = () => {
	const { isLoading, error, execute } = useApiRequest<string>();

	const [uploadPercent, setUploadPercent] = useState(0);

	const uploadFile = (props: Props) => {
		const { file, parentID } = props;

		if (!file) {
			return;
		}

		const formData = new FormData();

		formData.append('file', file);

		if (parentID) {
			formData.append('parentID', parentID);
		}

		// TODO: обработать возвращаемое значение
		return execute(() =>
			sendApiRequest<FormData, string>({
				method: 'POST',
				url: '/files',
				data: formData,
				config: {
					onUploadProgress: (progressEvent) => {
						const percent = Math.round(
							(progressEvent.loaded * 100) / (progressEvent.total ?? 1),
						);

						setUploadPercent(percent);
					},
				},
			}),
		);
	};

	return {
		isLoading,
		error,
		uploadFile,
		uploadPercent,
	};
};
