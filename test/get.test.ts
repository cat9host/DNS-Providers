import { getAddress } from '../src';
describe('test checkAddress function', () => {
  it('should return true', () => {
    getAddress('cat9h0st', 'bnb_bep20', 'BNB').then((result) => {
      expect(result).toBe('0xdb9875cB6e088b11Cd6BA4D436FfE20dA46364db');
    });
    getAddress('cat9h0st', 'matic_mrc20', 'MATIC').then((result) => {
      expect(result).toBe('cat9h0st');
    });
    getAddress('cat', 'bnb_bep20', 'BNB').then((result) => {
      expect(result).toBe('cat');
    });
    getAddress('catasd', 'btc', 'BTC').then((result) => {
      expect(result).toBe('catasd');
    });
    getAddress('brad.crypto', 'eth', 'ETH').then((result) => {
      expect(result).toBe('brad.crypto');
    });
    getAddress(
      '0xdb9875cB6e088b11Cd6BA4D436FfE20dA46364db',
      'link_erc20',
      'LINK'
    ).then((result) => {
      expect(result).toBe('0xdb9875cB6e088b11Cd6BA4D436FfE20dA46364db');
    });
  });
});
