import { getForexRates, setForexRate, validateTransferId } from '../api';

describe('API Utilities', () => {
  describe('getForexRates(requestOpts)', () => {
    it('should build the request with the correct endpoint', () => {
      const mockGet = jest.fn();
      const expected = 'forex/rates';
      getForexRates(mockGet);
      expect(mockGet).toHaveBeenCalledWith(expected);
    });
  });
  describe('setForexRate({ sourceCurrency, destinationCurrency, rate, startTime, endTime,'
  + 'reuse = true, decimalRate = 4 })', () => {
    it('should build the request with the correct endpoint given the transferId', () => {
      const mockPost = jest.fn();
      const sourceCurrency = 'eur';
      const destinationCurrency = 'mad';
      const rate = 1115555;
      const startTime = '2019-09-03T08:30:00.000Z';
      const endTime = '2019-09-04T08:30:00.000Z';
      const reuse = true;
      const decimalRate = 4;
      const expectedEndpoint = 'forex/rates/eurmad';
      const expectedBody = {
        rate: 1115555,
        decimalRate: 4,
        startTime: '2019-09-03T08:30:00.000Z',
        endTime: '2019-09-04T08:30:00.000Z',
        reuse: true,
      };
      setForexRate({
        sourceCurrency,
        destinationCurrency,
        rate,
        startTime,
        endTime,
        reuse,
        decimalRate,
      }, mockPost);
      expect(mockPost).toHaveBeenCalledWith(expectedEndpoint, expectedBody);
    });
    it('should set reuse to false by default', () => {
      const mockPost = jest.fn();
      const sourceCurrency = 'eur';
      const destinationCurrency = 'mad';
      const rate = 1115555;
      const startTime = '2019-09-03T08:30:00.000Z';
      const endTime = '2019-09-04T08:30:00.000Z';
      const decimalRate = 4;
      const expectedEndpoint = 'forex/rates/eurmad';
      const expectedBody = {
        rate: 1115555,
        decimalRate: 4,
        startTime: '2019-09-03T08:30:00.000Z',
        endTime: '2019-09-04T08:30:00.000Z',
        reuse: false,
      };
      setForexRate({
        sourceCurrency,
        destinationCurrency,
        rate,
        startTime,
        endTime,
        decimalRate,
      }, mockPost);
      expect(mockPost).toHaveBeenCalledWith(expectedEndpoint, expectedBody);
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
