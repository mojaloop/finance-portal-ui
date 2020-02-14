import React from 'react';
import {
  DialogActions as MuiDialogActions, DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle, IconButton, Typography, withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useUIDSeed } from 'react-uid';

const DialogTitle = withStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))((props) => {
  const { children, classes, onClose } = props;
  const dialogUIDGenerator = useUIDSeed();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" id={dialogUIDGenerator('dialog-iconButton')} className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

export {
  DialogTitle,
  DialogContent,
  DialogActions,
};
