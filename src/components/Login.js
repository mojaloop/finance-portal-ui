
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { post } from '../requests';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function Login(props) {
  const { loginSuccessful, classes } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const attemptLogin = async () => {
    setBusy(true);
    try {
      const res = await post('login', { username, password });
      loginSuccessful(res);
    } catch (err) {
      // TODO: indicate failure to the user
      window.alert('Login failed!');
    }
    setBusy(false);
  };

  return (
    <>
      <TextField
        id="login-username"
        label="Username"
        className={classes.textField}
        margin="normal"
        value={username}
        variant="outlined"
        onChange={ev => setUsername(ev.target.value)}
      />
      <TextField
        id="login-password"
        label="Password"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={password}
        type="password"
        onChange={ev => setPassword(ev.target.value)}
      />
      <Button variant="contained" color="primary" disabled={busy} className={classes.button} onClick={attemptLogin} id="btnLogin">
        Login
      </Button>
    </>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginSuccessful: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
