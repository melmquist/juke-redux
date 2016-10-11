'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import store from './myRedux';

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>

);

	// ,
	// document.getElementById('app')