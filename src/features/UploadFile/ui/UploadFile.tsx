import { Button } from '@radix-ui/themes';
import { ChangeEvent } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useUploadFileToCurrentSpace } from '../api/useUploadFileToCurrentSpace';
import type { TUploadFileForm } from '../model/file';

type Props = {
	parentID?: string;
};

export const UploadFile = (props: Props) => {
	const { parentID } = props;

	const { control, handleSubmit: handleContextSubmit } = useForm<TUploadFileForm>();

	// TODO: loaders and errors
	const { uploadFile, uploadPercent } = useUploadFileToCurrentSpace();

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
		uploadFile({ file: value, parentID });
	};

	return (
		<form onSubmit={handleContextSubmit(handleSubmit)}>
			{/* TODO: uncontrolled component! */}
			<input type={'file'} onChange={handleChangeFile} />

			<div>{uploadPercent}</div>

			<Button>Send</Button>
		</form>
	);
};
