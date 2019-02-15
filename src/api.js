
import { get } from './requests';

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

export {
    getPaymentFileList,
    getSettlements,
    getPositions,
    getCurrentWindow,
    getDfsps
};
