import { TextField } from '@radix-ui/themes';
import { useController, useFormContext } from 'react-hook-form';
import { FormModalWrapper } from 'shared/ui';
import { useCreateFolderInCurrenSpace } from '../../api/useCreateFolderInCurrentSpace';
import type { TCreateFolderForm } from '../../model/createFolder';

export const Form = () => {
	const {
		control,
		formState: { isDirty },
		handleSubmit: handleContextSubmit,
	} = useFormContext<TCreateFolderForm>();

	// TODO: loaders and errors
	const { createFolder } = useCreateFolderInCurrenSpace();

	const {
		field: { value, onChange },
	} = useController({ control, name: 'name' });

	// TODO: then...
	const handleSubmit = () => {
		createFolder({ name: value });
	};

	return (
		<FormModalWrapper
			onSubmit={handleContextSubmit(handleSubmit)}
			title={'Создать папку'}
			isDirty={isDirty}
		>
			<TextField.Root placeholder={'Имя папки'} value={value} onChange={onChange} />
		</FormModalWrapper>
	);
};
