import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { formatApiErrorMessages } from '../../../lib';
import { Button, Text, TextAlign, Warning } from '../../../ui';
import s from './FormModalWrapper.module.scss';

type Props = {
	title: string;
	text?: string;
	//
	onSubmit?: () => void;
	onReset?: () => void;
	//
	isDirty?: boolean;
	isLoading?: boolean;
	errors?: string | null;
	//
	className?: string;
};

// TODO взять из тулкита, как только Костя вынесет
/**
 * @description Предоставляет базовый UI для форм, которые находятся в модальном окне
 * */
export const FormModalWrapper = (props: PropsWithChildren<Props>) => {
	const { title, text, onSubmit, onReset, isDirty, errors, isLoading, children, className } =
		props;

	const handleReset = () => {
		onReset?.();
	};

	return (
		<form className={classNames(s.FormModalWrapper, className)} onSubmit={onSubmit}>
			<div>
				<Text className={s.title} title={title} text={text} align={TextAlign.CENTER} />

				{!isLoading && errors && (
					<Warning
						className={s.error}
						title={'Ошибка'}
						text={formatApiErrorMessages(errors)}
						theme={'red'}
					/>
				)}

				{/** Тело формы */}
				{children}
			</div>

			<div className={s.buttonsWrapper}>
				<Button className={s.submitButton} disabled={!isDirty || isLoading}>
					Сохранить
				</Button>

				<Button
					className={s.resetButton}
					disabled={!isDirty || isLoading}
					onClick={handleReset}
				>
					Сбросить
				</Button>
			</div>
		</form>
	);
};
