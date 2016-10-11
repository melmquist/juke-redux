'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import store from './myRedux';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app')
);
