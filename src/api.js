
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

// TODO: remove extensionList?
async function processFundsIn(participantName, accountId, amount, currency) {
    return post(`funds-in/${participantName}/${accountId}`, {
        amount,
        currency
    });
}

export {
    getAccounts,
    getCurrentWindow,
    getDfsps,
    getPaymentFileList,
    getPositions,
    getSettlements,
    processFundsIn
};