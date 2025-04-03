import { Theme } from '@radix-ui/themes';
import { DiskPage } from 'pages/DiskPage';

import '@radix-ui/themes/styles.css';
import './styles/index.scss';
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';

const App = () => {
	return (
		<Theme>
			<DiskPage />
		</Theme>
	);
};

export default App;
