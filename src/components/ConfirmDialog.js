import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@reach/dialog';
import { Button, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function ConfirmDialog(props) {
  const {
    children,
    title,
    description,
    onConfirm,
    onReject,
    classes,
  } = props;
  return (
    <Dialog className={classes.root}>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
      <Button className={classes.button} color="primary" variant="contained" onClick={onReject}>Cancel</Button>
      <Button className={classes.button} color="secondary" variant="contained" onClick={onConfirm}>OK</Button>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string, margin: PropTypes.string, button: PropTypes.string,
  }).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
  onConfirm: PropTypes.func,
  onReject: PropTypes.func,
};

ConfirmDialog.defaultProps = {
  children: [],
  onConfirm: () => {},
  onReject: () => {},
};

export default withStyles(styles)(ConfirmDialog);
