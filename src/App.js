
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import SettlementsTab from './components/SettlementsTab';
import { getUserInfo, setUserInfo } from './user';

// TODO: consider adding an error boundary?
//       https://reactjs.org/docs/error-boundaries.html
// TODO: do we need to add styling to all the components? (Or should we get rid of this material
//       thing?)
// TODO: consider a big "DEVELOPMENT MODE" header when in development mode

function App(props) {
  const [user, setUser] = useState(getUserInfo());

  const loginSuccessful = result => {
    setUserInfo(result);
    setUser(result);
  };

  // TODO: what are the md (and xs, etc.) props on Grid?
  return (
    user === undefined ? <Login loginSuccessful={loginSuccessful} /> : <SettlementsTab />
  );
}

export default App;
