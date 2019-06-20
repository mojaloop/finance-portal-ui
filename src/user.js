import { put } from './requests';

const userInfoKey = 'login';

// TODO Greg: good to make sure the object that goes into setUserInfo is the same as the object
// that comes out of it.

// Check localstorage for our login information
function getUserInfo() {
  try {
    const userInfo = localStorage.getItem(userInfoKey);
    if (userInfo === null) {
      return undefined;
    }
    const parsedUserInfo = JSON.parse(userInfo);
    if ((new Date(parsedUserInfo.expiryDate)).getTime() < (new Date()).getTime()) {
      return localStorage.removeItem(userInfoKey);
    }
    return parsedUserInfo;
  } catch (err) {
    console.warn('Error retrieving user login info from localstorage'); // eslint-disable-line no-console
    return undefined;
  }
}

function setUserInfo(userInfo) {
  const expiryDate = new Date((new Date()).getTime() + userInfo.expiresIn * 1000);
  localStorage.setItem(userInfoKey, JSON.stringify({
    ...userInfo,
    expiryDate,
  }));
}

async function logout() {
  const tokenIsValid = getUserInfo(); // If token is invalid(timeout), it will be destroyed
  if (tokenIsValid) {
    localStorage.removeItem(userInfoKey);
    return put('/logout');
  }
  return true;
}

export {
  getUserInfo,
  logout,
  setUserInfo,
};
