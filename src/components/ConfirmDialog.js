import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@reach/dialog';
import { Button } from '@material-ui/core';

function ConfirmDialog(props) {
  const {
    children,
    title,
    description,
    onConfirm,
    onReject,
  } = props;
  return (
    <Dialog>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
      <Button color="primary" variant="contained" onClick={onReject}>Cancel</Button>
      <Button color="secondary" variant="contained" onClick={onConfirm}>OK</Button>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
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

export default ConfirmDialog;
