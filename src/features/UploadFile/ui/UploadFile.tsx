import type { ChangeEvent } from 'react';
import { mutate } from 'swr';
import { Button, Progress, Flex } from 'shared/ui';
import { useUploadFileToCurrentSpace } from '../api/useUploadFileToCurrentSpace';

type Props = {
	parentID?: string;
};

export const UploadFile = (props: Props) => {
	const { parentID } = props;

	// TODO: добавить процент загрузки файла
	// TODO: loaders and errors
	const { uploadFile, uploadPercent } = useUploadFileToCurrentSpace();

	const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		const file = event.target.files[0];

		uploadFile({ file, parentID })?.then(() => {
			event.target.value = '';
			mutate((key) => key === '/files');
		});
	};

	return (
		<>
			<Button onClick={() => document.getElementById('file-input')?.click()}>
				Загрузить файл
			</Button>

			{/* TODO: DEBUG PROGRESS! */}
			<Flex gap={'2'} align={'center'}>
				<Progress value={uploadPercent} /> <span>{uploadPercent}%</span>
			</Flex>

			<input
				id="file-input"
				type="file"
				onChange={handleChangeFile}
				style={{ display: 'none' }}
			/>
		</>
	);
};
