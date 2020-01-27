import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import { Button, Toolbar } from '@material-ui/core';

import './App.css';
import * as userUtils from './user';
import Login from './components/Login';
import AdminTab from './components/AdminTab';
import FinancialMonitoringTab from './components/FinancialMonitoringTab';
import SettlementWindowsTab from './components/SettlementWindowsTab';
import TransferVerificationTab from './components/TransferVerificationTab';
import ForexRatesTab from './components/ForexRatesTab';

// TODO: consider adding an error boundary?
//       https://reactjs.org/docs/error-boundaries.html
// TODO: do we need to add styling to all the components? (Or should we get rid of this material
//       thing?)
// TODO: consider a big "DEVELOPMENT MODE" header when in development mode

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
});

function App(props) {
  const {
    classes, getUserInfo, logout, setUserInfo, storybookMode,
  } = props;
  const [user, setUser] = useState(getUserInfo());
  const [tab, setTab] = useState(0);

  const loginSuccessful = (result) => {
    setUserInfo(result);
    setUser(result);
  };

  const processLogout = async () => {
    if (storybookMode) {
      return;
    }
    await logout(); // await because the response will change/clear the cookie
    window.location = '/';
  };

  return (
    <div className={classes.root}>
      {user === undefined ? <Login loginSuccessful={loginSuccessful} /> : (
        <>
          <AppBar position="static">
            <Toolbar>
              <Tabs
                value={tab}
                onChange={(_, val) => setTab(val)}
                className={classes.grow}
              >
                <Tab label="Financial Monitoring" />
                <Tab label="Settlement Windows" />
                <Tab label="Administration" />
                <Tab label="Transfer Verification" />
                <Tab label="Forex Rates" />
              </Tabs>
              <Button id="btnLogout" variant="outlined" color="inherit" onClick={processLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          {tab === 0 && <FinancialMonitoringTab />}
          {tab === 1 && <SettlementWindowsTab />}
          {tab === 2 && <AdminTab />}
          {tab === 3 && <TransferVerificationTab />}
          {tab === 4 && <ForexRatesTab />}

        </>
      )}
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  getUserInfo: PropTypes.func,
  logout: PropTypes.func,
  setUserInfo: PropTypes.func,
  storybookMode: PropTypes.bool,
};

App.defaultProps = {
  getUserInfo: userUtils.getUserInfo,
  logout: userUtils.logout,
  setUserInfo: userUtils.setUserInfo,
  storybookMode: false,
};

export default withStyles(styles)(App);
