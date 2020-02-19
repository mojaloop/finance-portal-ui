import {getForexRates, validateTransferId} from '../api';

describe('API Utilities', () => {
  describe('getForexRates(requestOpts)', () => {
    it('should build the request with the correct endpoint', () => {
      const mockGet = jest.fn();
      const expected = 'forex/rates';
      getForexRates(mockGet);
      expect(mockGet).toHaveBeenCalledWith(expected);
    });
  });
});
