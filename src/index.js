import 'core-js/features/array/flat';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { JssProvider } from 'react-jss';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true, // won't minify CSS classnames when true
  productionPrefix: 'c', // 'jss' by default
});

ReactDOM.render(
    <JssProvider generateClassName={generateClassName}>
        <App />
    </JssProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
