import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useUIDSeed } from 'react-uid';
import { post } from '../requests';


const styles = (theme) => ({
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
      window.alert('Login failed!'); // eslint-disable-line no-alert
    }
    setBusy(false);
  };

  const keyPressValidation = (event) => {
    if (event.key === 'Enter') {
      attemptLogin();
    }
  };

  const loginIdGenerator = useUIDSeed();
  return (
    <>
      <TextField
        label="Username"
        id={loginIdGenerator('login-username')}
        className={classes.textField}
        margin="normal"
        onKeyPress={keyPressValidation}
        value={username}
        variant="outlined"
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <TextField
        id={loginIdGenerator('login-password')}
        label="Password"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onKeyPress={keyPressValidation}
        value={password}
        type="password"
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <Button variant="contained" color="primary" disabled={busy} className={classes.button} onClick={attemptLogin} id={loginIdGenerator('login-btn')}>
        Login
      </Button>
    </>
  );
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  loginSuccessful: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
