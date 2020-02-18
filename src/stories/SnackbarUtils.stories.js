import React from 'react';

import SnackbarUtils from '../components/SnackbarUtils';

export default {
  component: SnackbarUtils,
  title: 'SnackbarUtils',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// Props
const classes = {};
const message = {
  success: 'This is a success message',
  warning: 'This is a warning message',
  error: 'This is an error message',
  info: 'This is an info message',
};

export const Success = () => (
  <SnackbarUtils classes={classes} variant="success" message={message.success} />
);

export const Warning = () => (
  <SnackbarUtils classes={classes} variant="warning" message={message.warning} />
);

export const Error = () => (
  <SnackbarUtils classes={classes} variant="error" message={message.error} />
);

export const Info = () => (
  <SnackbarUtils classes={classes} variant="info" message={message.info} />
);
