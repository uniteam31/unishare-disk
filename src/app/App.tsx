import { Theme } from '@radix-ui/themes';
import { BrowserRouter, useInRouterContext } from 'react-router-dom';
import { DiskPage } from 'pages/DiskPage';

import '@radix-ui/themes/styles.css';
import './styles/index.scss';
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';

const App = () => {
	// TODO: refactoring
	const isRouter = useInRouterContext();

	if (isRouter) {
		return (
			<Theme>
				<DiskPage />
			</Theme>
		);
	}

	return (
		<BrowserRouter>
			<Theme>
				<DiskPage />
			</Theme>
		</BrowserRouter>
	);
};

export default App;
