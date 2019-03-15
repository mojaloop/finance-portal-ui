
import { get, post } from './requests';

const stringifyDate = dt => dt instanceof Date ? dt.toISOString() : dt;

async function getPaymentFileList({ startDate, endDate }) {
    return get(`payment-file-list?fromDateTime=${stringifyDate(startDate)}&toDateTime=${stringifyDate(endDate)}`);
};

async function getSettlements(participantId, { startDate, endDate }) {
    return get(`settlements/${participantId}?fromDateTime=${stringifyDate(startDate)}&toDateTime=${stringifyDate(endDate)}`);
}

async function getPositions(participantId) {
    return get(`positions/${participantId}`);
}

async function getCurrentWindow(participantId) {
    return get(`current-window/${participantId}`);
}

async function getDfsps() {
    return get('dfsps');
}

// Note that participantName is indeed distinct from participantId
async function getAccounts(participantName) {
    return get(`accounts/${participantName}`);
}

async function processFundsIn(participantName, accountId, amount, currency) {
    return post(`funds-in/${participantName}/${accountId}`, {
        amount,
        currency
    });
}

async function processFundsOut(participantName, accountId, amount, currency) {
    return post(`funds-out/${participantName}/${accountId}`, {
        amount,
        currency
    });
}

async function getNetDebitCap(participantName) {
    return get(`netdebitcap/${participantName}`);
}

async function updateNetDebitCap(participantName, currency, newValue, accountId) {
    return post(`netdebitcap/${participantName}`, { currency, newValue, accountId });
}

async function getEmailAddresses(participantName) {
    return get(`emailAddress/${participantName}`);
}

async function updateEmailAddress(participantName, emailType, newValue) {
    return post(`emailAddress/${participantName}`, { emailType, newValue });
}
export {
    getAccounts,
    getCurrentWindow,
    getDfsps,
    getPaymentFileList,
    getPositions,
    getSettlements,
    processFundsIn,
    processFundsOut,
    getNetDebitCap,
    updateNetDebitCap,
    getEmailAddresses,
    updateEmailAddress
};
