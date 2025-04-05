import { Button } from '@radix-ui/themes';
import type { ChangeEvent } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useUploadFileToCurrentSpace } from '../api/useUploadFileToCurrentSpace';
import type { TUploadFileForm } from '../model/file';

export const UploadFile = () => {
	const { control, handleSubmit: handleContexSubmit } = useForm<TUploadFileForm>();

	// TODO: loaders and errors
	const { uploadFile } = useUploadFileToCurrentSpace();

	const {
		field: { value, onChange },
	} = useController({ control, name: 'file' });

	const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		const file = event.target.files[0];

		onChange(file);
	};

	// TODO: then catch!
	const handleSubmit = () => {
		uploadFile({ file: value });
	};

	return (
		<form onSubmit={handleContexSubmit(handleSubmit)}>
			{/* TODO: uncontrolled component! */}
			<input type={'file'} onChange={handleChangeFile} />

			<Button onClick={handleSubmit}>Send</Button>
		</form>
	);
};
