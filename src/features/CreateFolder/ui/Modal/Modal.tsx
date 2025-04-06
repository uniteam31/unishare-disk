import { useForm } from 'react-hook-form';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import { Form } from '../Form/Form';
import type { TFormProps } from '../Form/Form';

type Props = TFormProps & {
	isOpen: boolean;
	onClose: () => void;
};

export const Modal = (props: Props) => {
	const { isOpen, onClose, parentID } = props;

	const methods = useForm();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<Form parentID={parentID} />
			</FormWrapper>
		</ModalUI>
	);
};
