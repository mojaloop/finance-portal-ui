
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import SettlementsTab from './components/SettlementsTab';
import { get } from './requests';
import { getUserInfo, setUserInfo } from './user';

// TODO: consider adding an error boundary?
//       https://reactjs.org/docs/error-boundaries.html
// TODO: do we need to add styling to all the components? (Or should we get rid of this material
//       thing?)
// TODO: consider a big "DEVELOPMENT MODE" header when in development mode

function App(props) {
  const [user, setUser] = useState(getUserInfo());
  const [fspList, setFspList] = useState(undefined);

  const loginSuccessful = result => {
    setUserInfo(result);
    setUser(result);
    getFspList();
  };

  const getFspList = () => {
    get('dfsps')
      .then(dfsps => {
        // Augment fspList with a map of ids -> names and vice-versa.
        dfsps.ids = Object.assign(...dfsps.map(fsp => ({ [fsp.id]: fsp.name })));
        // Note that names are guaranteed unique by the db. We assume here that the concept of
        // string uniqueness in mysql is no more strict than the concept of string uniqueness in
        // node
        dfsps.names = Object.assign(...dfsps.map(fsp => ({ [fsp.name]: fsp.id })));
        setFspList(dfsps)
      })
      .catch(err => window.alert('Failed to get FSPS')); // TODO: better error message, let user retry
  };

  useEffect(() => {
    if (user !== undefined) {
      getFspList();
    }
  }, []);

  // TODO: what are the md (and xs, etc.) props on Grid?
  return (
      <>
      {user === undefined ?
        <Login loginSuccessful={loginSuccessful} /> :
        (fspList === undefined ? <></> : <SettlementsTab fspList={fspList} />
        )}
      </>
  );
}

export default App;
