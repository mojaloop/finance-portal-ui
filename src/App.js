
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import FinancialMonitoringTab from './components/FinancialMonitoringTab';
<<<<<<< feature/#454SettlementWindowActions
=======
import PaymentFilesTab from './components/PaymentFilesTab';
<<<<<<< feature/#454SettlementWindowActions
import FundsManagementTab from './components/FundsManagementTab';
>>>>>>> Moved NDC management to financial monitoring to avoid handling dfsp request failure
=======
>>>>>>> Moved funds management into financial monitoring to avoid handling dfsp request failure
import { getUserInfo, setUserInfo } from './user';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import SettlementWindowsTab from './components/SettlementWindowsTab';
import SettlementsDetailsTab from './components/SettlementsDetailsTab';

// TODO: consider adding an error boundary?
//       https://reactjs.org/docs/error-boundaries.html
// TODO: do we need to add styling to all the components? (Or should we get rid of this material
//       thing?)
// TODO: consider a big "DEVELOPMENT MODE" header when in development mode
// TODO: read more about PropTypes and available validation

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

function App(props) {
  const { classes } = props;
  const [user, setUser] = useState(getUserInfo());
  const [tab, setTab] = useState(0);

  const loginSuccessful = result => {
    setUserInfo(result);
    setUser(result);
  };

  // TODO: what are the md (and xs, etc.) props on Grid?
  return (
    <div className={classes.root}>
    {user === undefined ? <Login loginSuccessful={loginSuccessful} /> : (
      <>
      <AppBar position="static">
        <Tabs value={tab} onChange={(_, val) => setTab(val)}>
          <Tab label="Financial Monitoring" />
<<<<<<< feature/#454SettlementWindowActions
=======
          <Tab label="Payment Files" />
<<<<<<< feature/#454SettlementWindowActions
          <Tab label="Funds Management" />
>>>>>>> Moved NDC management to financial monitoring to avoid handling dfsp request failure
=======
>>>>>>> Moved funds management into financial monitoring to avoid handling dfsp request failure
          <Tab label="Settlement Windows" />
          <Tab label="Settlements Details" />
        </Tabs>
      </AppBar>
      {tab === 0 && <FinancialMonitoringTab />}
<<<<<<< feature/#454SettlementWindowActions
      {tab === 1 && <SettlementWindowsTab />}
      {tab === 2 && <SettlementsDetailsTab />}
=======
      {tab === 1 && <PaymentFilesTab />}
<<<<<<< feature/#454SettlementWindowActions
      {tab === 4 && <SettlementWindowsTab />}
      {tab === 5 && <SettlementsDetailsTab />}
>>>>>>> Moved NDC management to financial monitoring to avoid handling dfsp request failure
=======
      {tab === 2 && <SettlementWindowsTab />}
      {tab === 3 && <SettlementsDetailsTab />}
>>>>>>> Fixed App to once again show settlements and windows
      </>
    )}
    </div>
  );
}

export default withStyles(styles)(App);
