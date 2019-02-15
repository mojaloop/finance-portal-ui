
import { get } from './requests';

async function getPaymentFileList({ startDate, endDate }) {
    return get(`payment-file-list?fromDateTime=${startDate}&toDateTime=${endDate}`);
};

async function getSettlements(participantId, { startDate, endDate }) {
    return get(`settlements/${participantId}?fromDateTime=${startDate}&toDateTime=${endDate}`);
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
