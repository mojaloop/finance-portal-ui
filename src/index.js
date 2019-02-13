import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const endpoint = 'http://localhost:3002';
const fetchOpts = { headers: { 'accept': 'application/json' } };
fetch(`${endpoint}/dfsps`, fetchOpts).then(res => res.json())
    .then(fspList => {
        // Augment fspList with a map of ids -> names and vice-versa.
        fspList.ids = Object.assign(...fspList.map(fsp => ({ [fsp.id]: fsp.name })));
        // Note that names are guaranteed unique by the db. We assume here that the concept of
        // string uniqueness in mysql is no more strict than the concept of string uniqueness in
        // node
        fspList.names = Object.assign(...fspList.map(fsp => ({ [fsp.name]: fsp.id })));
        ReactDOM.render(<App fspList={fspList} />, document.getElementById('root'));
    })
    .catch(err => {
        // TODO: display this more nicely
        alert(`Couldn't get FSP list: ${err}`);
    });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
