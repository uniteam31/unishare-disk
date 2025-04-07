import axios from 'axios';
import { useState } from 'react';
import type { IFile } from 'entities/FileObject';
import { useApiRequest } from 'shared/hooks';
import { sendApiRequest } from 'shared/lib';
import type { TUploadFileForm } from '../model/file';

type TUploadFileProps = TUploadFileForm & {
	parentID?: IFile['id'];
};

type TUploadFileSessionProps = {
	name: string;
	parentID?: IFile['id'];
	type: string;
};

// TODO: можно вынести в типы
type TUploadFileSessionResponse = {
	url: string;
	fileID: string;
};

// TODO: вынести всю работу с файлами в toolkit!!!
export const useUploadFileToCurrentSpace = () => {
	const { isLoading, error, execute } = useApiRequest<IFile>();

	const [uploadPercent, setUploadPercent] = useState(0);

	const uploadFile = (props: TUploadFileProps) => {
		const { file, parentID } = props;

		if (!file) {
			return;
		}

		return execute(async () => {
			/** Получаю подписанный url и id файла для загрузки в S3 */
			const { url, fileID } = await sendApiRequest<
				TUploadFileSessionProps,
				TUploadFileSessionResponse
			>({
				method: 'POST',
				url: '/files',
				data: {
					name: file.name,
					type: file.type,
					parentID,
				},
			});

			/** Загружаю файл по подписанному url */
			const uploadedFile = await axios
				.put(url, file, {
					headers: {
						'Content-Type': file.type,
					},
					onUploadProgress: (progressEvent) => {
						const percent = Math.round(
							(progressEvent.loaded * 100) / (progressEvent.total ?? 1),
						);

						setUploadPercent(percent);
					},
				})
				.then(() =>
					/** В случае успешной загрузки подтверждаю и получаю данные файла */
					sendApiRequest<any, IFile>({
						url: `/files/confirm/${fileID}`,
						method: 'POST',
					}),
				);

			return uploadedFile;
		});
	};

	return {
		isLoading,
		error,
		uploadFile,
		uploadPercent,
	};
};
