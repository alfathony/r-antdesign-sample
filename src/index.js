import React from 'react';
import ReactDOM from 'react-dom';
import { AppRoute } from './components/router';

import registerServiceWorker from './registerServiceWorker';

const app = process.env.REACT_APP_NAME;
const version = process.env.REACT_APP_VERSION;
const mode = process.env.REACT_APP_MODE;

if (mode !== 'production') {
  console.info([ //eslint-disable-line
    '\n',
    '================================================\n',
    'ENVIRONMENT \n',
    '------------------------------------------------\n',
    `APP      : ${app.toUpperCase()}\n`,
    `VERSION  : ${version}\n`,
    `MODE     : ${mode.toUpperCase()}\n`,
    '================================================\n\n\n',
  ].join(''));
}

ReactDOM.render(<AppRoute />, document.getElementById('app'));

registerServiceWorker();
