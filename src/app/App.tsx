import { Theme } from '@radix-ui/themes';
import { BrowserRouter, useInRouterContext } from 'react-router-dom';
import { DiskPage } from 'pages/DiskPage';

import '@radix-ui/themes/styles.css';
import './styles/index.scss';
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';

const App = () => {
	/** Нужно, чтобы корректно встраиваться в хост */
	const isRouter = useInRouterContext();

	const renderContent = () => (
		<Theme style={{ height: '100%', minHeight: 'unset' }} radius={'large'}>
			<div
				// id нужен для отрисовки компонентов из radix в провайдере стилей
				id={'content'}
				style={{ height: '100%', width: '100%' }}
			>
				<DiskPage />
			</div>
		</Theme>
	);

	if (!isRouter) {
		return <BrowserRouter>{renderContent()}</BrowserRouter>;
	}

	return renderContent();
};

export default App;
