import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@reach/dialog';

export default function ConfirmDialog(props) {
    const { children, title, description, onConfirm = () => {}, onReject = () => {} } = props;
    return (
      <>
        <Dialog>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
          <button type="button" onClick={onReject}>Cancel</button>
          <button type="button" onClick={onConfirm}>OK</button>
        </Dialog>
      </>
    );
}

ConfirmDialog.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
  onConfirm: PropTypes.func,
  onReject: PropTypes.func,
};

// vim: ts=2:sw=2:expandtab
