import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyle';
import Typography from './styles/Typography';
import { ThemeProvider } from 'styled-components';
import { dark } from './styles/Themes';
import { Canvas } from './components/Canvas';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default function App() {
	return (
		<ThemeProvider theme={dark}>
			<ReactNotification />
			<GlobalStyles />
			<Typography />
			<Router>
				<Switch>
					<Route path='/' component={Canvas}></Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}
