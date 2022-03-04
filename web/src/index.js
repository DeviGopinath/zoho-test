import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
	// palette: {
	// 	type: 'dark',
	// 	primary: {
	// 		main: '#ecf0f3',
	// 	},
	// 	secondary: {
	// 		main: '#ecf0f3',
	// 	},
	// },
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
