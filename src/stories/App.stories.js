import React from 'react';

import App from '../App';

export default {
  component: App,
  title: 'App',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Props
const getUserInfo = () => ({});

export const LoggedOut = () => (
  <App />
);

export const LoggedIn = () => (
  <App storybookMode getUserInfo={getUserInfo} />
);
