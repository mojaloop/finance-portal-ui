import { getForexRates, validateTransferId } from '../api';

describe('API Utilities', () => {
  describe('getForexRates(requestOpts)', () => {
    it('should build the request with the correct endpoint', () => {
      const mockGet = jest.fn();
      const expected = 'forex/rates';
      getForexRates(mockGet);
      expect(mockGet).toHaveBeenCalledWith(expected);
    });
  });
  describe('validateTransferId(transferId, requestOpts)', () => {
    it('should build the request with the correct endpoint given the transferId', () => {
      const mockGet = jest.fn();
      const transferId = 0;
      const requestOpts = {};
      const expected = '/validate-transfer/0';
      validateTransferId(transferId, requestOpts, mockGet);
      expect(mockGet.mock.calls[0]).toContainEqual(expected);
    });
  });
});
