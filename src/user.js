
const userInfoKey = 'login';

// TODO Greg: good to make sure the object that goes into setUserInfo is the same as the object
// that comes out of it.

// Check localstorage for our login information
function getUserInfo() {
    const userInfo = localStorage.getItem(userInfoKey);
    // TODO Greg: check whether the token has expired here:
    if (userInfo === null || userInfo.expiryDate > new Date()) {
        return undefined;
    }
    return userInfo;
}

function setUserInfo(userInfo) {
    localStorage.setItem(userInfoKey, userInfo);
}

export {
    getUserInfo,
    setUserInfo
};
