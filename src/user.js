import { put } from './requests';

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

function deleteUserInfo() {
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
