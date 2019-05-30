/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

import {
  get, post, put, fetchTimeoutController,
} from './requests';

const stringifyDate = dt => (dt instanceof Date ? dt.toISOString() : dt);

async function getPaymentFileList({ from, to }, requestOpts) {
  return get(`payment-file-list?fromDateTime=${stringifyDate(from)}&toDateTime=${stringifyDate(to)}`, requestOpts);
}

async function getSettlements(participantId, { from, to }, requestOpts) {
  return get(`settlements/${participantId}?fromDateTime=${stringifyDate(from)}&toDateTime=${stringifyDate(to)}`, requestOpts);
}

async function getPositions(participantId, requestOpts) {
  return get(`positions/${participantId}`, requestOpts);
}

async function getCurrentWindow(participantId, requestOpts) {
  return get(`current-window/${participantId}`, requestOpts);
}

async function getPreviousWindow(participantId, requestOpts) {
  return get(`previous-window/${participantId}`);
}

async function getDfsps(requestOpts) {
  return get('dfsps', requestOpts);
}

// Note that participantName is indeed distinct from participantId
async function getAccounts(participantName, requestOpts) {
  return get(`accounts/${participantName}`, requestOpts);
}

async function getParticipantAccountById(participantName, accountId) {
  return get(`accounts/${participantName}/${accountId}`);
}

async function processFundsIn(participantName, accountId, amount, currency, requestOpts) {
  return post(`funds-in/${participantName}/${accountId}`, {
    amount,
    currency,
  }, requestOpts);
}

async function processFundsOut(participantName, accountId, amount, currency, requestOpts) {
  return post(`funds-out/${participantName}/${accountId}`, {
    amount,
    currency,
  }, requestOpts);
}

async function getTransfer(transferId) {
  return get(`transfer/${transferId}`);
}

async function getNetDebitCap(participantName, requestOpts) {
  return get(`netdebitcap/${participantName}`, requestOpts);
}

async function updateNetDebitCap(participantName, currency, newValue, accountId, requestOpts) {
  return post(`netdebitcap/${participantName}`, { currency, newValue, accountId }, requestOpts);
}

async function getEmailAddresses(participantName, requestOpts) {
  return get(`emailAddress/${participantName}`, requestOpts);
}

async function updateEmailAddress(participantName, emailType, newValue, requestOpts) {
  return put(`emailAddress/${participantName}`, { emailType, newValue }, requestOpts);
}

async function getSettlementWindows({ from, to }, requestOpts) {
  return get(`settlement-windows?fromDateTime=${stringifyDate(from)}&toDateTime=${stringifyDate(to)}`, requestOpts);
}

async function getSettlementWindowInfo(settlementWindowId, requestOpts) {
  return get(`settlement-windows/${settlementWindowId}`, requestOpts);
}

async function getSettlementList({ from, to }, requestOpts) {
  return get(`settlements?fromDateTime=${stringifyDate(from)}&toDateTime=${stringifyDate(to)}`, requestOpts);
}

async function commitSettlement(settlementId, { participants, from, to }, requestOpts) {
  return put(`settlements/${settlementId}`, { participants, from, to }, requestOpts);
}

async function getSettlementAccountBalance(participantId, requestOpts) {
  return get(`settlement-account/${participantId}`, requestOpts);
}

async function getParticipantIsActiveFlag(participantId, requestOpts) {
  return get(`participants/${participantId}/isActive`, requestOpts);
}

async function setParticipantIsActiveFlag(participantId, participantName, isActive, requestOpts) {
  return put(`participants/${participantId}/isActive/`, { participantName, isActive }, requestOpts);
}

async function commitSettlementWindow(settlementWindowId, {
  participants, settlementId, from, to,
}, requestOpts) {
  return put(`settlement-window-commit/${settlementWindowId}`, {
    participants, settlementId, from, to,
  }, requestOpts);
}

async function closeSettlementWindow(settlementWindowId, { startDate, endDate }, requestOpts) {
  return put(`settlement-window-close/${settlementWindowId}`, { startDate, endDate }, requestOpts);
}

async function getHistoricalData(participantName, { from, to }, requestOpts) {
  return get(`/historical-window-summary/${participantName}?fromDateTime=${stringifyDate(from)}&toDateTime=${stringifyDate(to)}`, requestOpts);
}

async function validateTransferId(transferId, requestOpts) {
  return get(`/validate-transfer/${transferId}`, requestOpts);
}

export {
  closeSettlementWindow,
  commitSettlement,
  commitSettlementWindow,
  fetchTimeoutController,
  getAccounts,
  getCurrentWindow,
  getPreviousWindow,
  getDfsps,
  getEmailAddresses,
  getHistoricalData,
  getNetDebitCap,
  getParticipantAccountById,
  getParticipantIsActiveFlag,
  getPaymentFileList,
  getPositions,
  getSettlementAccountBalance,
  getSettlementList,
  getSettlements,
  getSettlementWindowInfo,
  getSettlementWindows,
  getTransfer,
  processFundsIn,
  processFundsOut,
  setParticipantIsActiveFlag,
  updateEmailAddress,
  updateNetDebitCap,
  validateTransferId,
};
