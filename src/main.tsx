import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { store } from './store/index.ts';
import { Provider } from 'react-redux';

// rome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
