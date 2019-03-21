
import { get, post, put } from './requests';

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

async function getSettlementWindows({ startDate, endDate }) {
    return get(`settlement-windows?fromDateTime=${stringifyDate(startDate)}&toDateTime=${stringifyDate(endDate)}`);
}

async function getSettlementWindowInfo(settlementWindowId) {
    return get(`settlement-windows/${settlementWindowId}`);
}

async function getSettlementList({ startDate, endDate }) {
    return get(`settlements?fromDateTime=${stringifyDate(startDate)}&toDateTime=${stringifyDate(endDate)}`);
}

async function commitSettlement(settlementId, { participants, startDate, endDate }) {
    return put(`settlements/${settlementId}`, { participants, startDate, endDate });
}

async function getSettlementAccountBalance(participantId) {
    return get(`settlement-account/${participantId}`);
}

async function getParticipantIsActiveFlag(participantId) {
    return get(`participants/${participantId}/isActive`);
}

async function setParticipantIsActiveFlag(participantId, participantName, isActive) {
    return put(`participants/${participantId}/isActive/`, { participantName, isActive });
}

async function commitSettlementWindow(settlementWindowId, { participants, settlementId, startDate, endDate }) {
    return put(`settlement-window-commit/${settlementWindowId}`, { participants, settlementId, startDate, endDate });
}

async function closeSettlementWindow(settlementWindowId, { startDate, endDate }) {
    return put(`settlement-window-close/${settlementWindowId}`, { startDate, endDate });
}

async function getHistoricalData(participantName, { startDate, endDate }) {
    return get(`/historical-window-summary/${participantName}?fromDateTime=${stringifyDate(startDate)}&toDateTime=${stringifyDate(endDate)}`);
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
    getSettlementWindows,
    getSettlementWindowInfo,
    getSettlementList,
    commitSettlement,
    getSettlementAccountBalance,
    getParticipantIsActiveFlag,
    setParticipantIsActiveFlag,
    commitSettlementWindow,
    closeSettlementWindow,
    getHistoricalData
};
