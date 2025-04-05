import { useForm } from 'react-hook-form';
import { FormWrapper } from 'shared/lib';
import { ModalUI } from 'shared/ui';
import { Form } from '../Form/Form';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const Modal = (props: Props) => {
	const { isOpen, onClose } = props;

	const methods = useForm();

	return (
		<ModalUI isOpen={isOpen} onClose={onClose}>
			<FormWrapper methods={methods}>
				<Form />
			</FormWrapper>
		</ModalUI>
	);
};
