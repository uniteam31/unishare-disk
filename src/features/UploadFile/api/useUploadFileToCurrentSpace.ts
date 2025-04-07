import axios from 'axios';
import { useState } from 'react';
import type { IFile } from 'entities/FileObject';
import { useApiRequest } from 'shared/hooks';
import { sendApiRequest } from 'shared/lib';
import type { TUploadFileForm } from '../model/file';

type Props = TUploadFileForm & {
	parentID?: IFile['id'];
};

type TUploadFileProps = {
	name: string;
	parentID?: IFile['id'];
	type: string;
};

export const useUploadFileToCurrentSpace = () => {
	const { isLoading, error, execute } = useApiRequest<string>();

	const [uploadPercent, setUploadPercent] = useState(0);

	const uploadFile = (props: Props) => {
		const { file, parentID } = props;

		if (!file) {
			return;
		}

		// TODO: обработать возвращаемое значение
		return execute(async () => {
			/** Получаю подписанный url для загрузки файла в S3 */
			const url = await sendApiRequest<TUploadFileProps, string>({
				method: 'POST',
				url: '/files',
				data: {
					name: file.name,
					type: file.type,
					parentID,
				},
			});

			/** Загружаю файл по подписанному url */
			await axios.put(url, file, {
				onUploadProgress: (progressEvent) => {
					const percent = Math.round(
						(progressEvent.loaded * 100) / (progressEvent.total ?? 1),
					);

					setUploadPercent(percent);
				},
			});

			return 'HARDCODE';
		});
	};

	return {
		isLoading,
		error,
		uploadFile,
		uploadPercent,
	};
};
