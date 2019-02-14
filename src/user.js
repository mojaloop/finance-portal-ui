
const userInfoKey = 'login';

// Check localstorage for our login information
function getUserInfo() {
    const userInfo = localStorage.getItem(userInfoKey);
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
