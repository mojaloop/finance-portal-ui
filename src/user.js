/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

import {
  get, post, put, fetchTimeoutController,
} from './requests';

const userInfoKey = 'login';

// TODO Greg: good to make sure the object that goes into setUserInfo is the same as the object
// that comes out of it.

// Check localstorage for our login information
function getUserInfo() {
  try {
    const userInfo = localStorage.getItem(userInfoKey);
    // TODO Greg: check whether the token has expired here:
    if (userInfo === null || userInfo.expiryDate > new Date()) {
      return undefined;
    }
    return JSON.parse(userInfo);
  } catch (err) {
    console.warn('Error retrieving user login info from localstorage');
    return undefined;
  }
}

function setUserInfo(userInfo) {
  localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
}

function deleteUserInfo(userInfo) {
  localStorage.removeItem(userInfoKey);
}

async function logout() {
  return put('/logout');
}

export {
  deleteUserInfo,
  getUserInfo,
  logout,
  setUserInfo,
};
