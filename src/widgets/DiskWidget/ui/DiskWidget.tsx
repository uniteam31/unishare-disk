import { Warning, Widget } from 'shared/ui';

export const DiskWidget = () => {
	return (
		<Widget title={'Диск'} size={'medium'} to={'/disk'}>
			<Warning theme={'blue'} title={'В разработке'} text={'Виджет сервиса в разработке'} />
		</Widget>
	);
};
