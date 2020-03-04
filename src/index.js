import 'core-js/features/array/flat';
import React from 'react';
import ReactDOM from 'react-dom';
import { JssProvider } from 'react-jss';
import { createGenerateClassName } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const generateClassName = createGenerateClassName({
  // Won't minify CSS classnames when true. This is very useful because it means in production
  // builds we are able to use CSS classnames as selectors for E2E testing.
  dangerouslyUseGlobalCSS: true,
});

ReactDOM.render(
  <JssProvider generateClassName={generateClassName}>
    <App />
  </JssProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
