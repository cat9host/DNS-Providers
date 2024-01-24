import { Providers } from '../src';
describe('test checkAddress function', () => {
  it('should return true', () => {
    const p = new Providers({
      bnb_bep20: '',
      matic_mrc20: '',
      eth: ''
    })
    p.getAddress('cat9h0st', 'bnb_bep20', 'BNB').then((result) => {
      expect(result).toBe('0xdb9875cB6e088b11Cd6BA4D436FfE20dA46364db');
    });
    p.getAddress('cat9h0st', 'matic_mrc20', 'MATIC').then((result) => {
      expect(result).toBe('cat9h0st');
    });
    p.getAddress('cat', 'bnb_bep20', 'BNB').then((result) => {
      expect(result).toBe('cat');
    });
    p.getAddress('catasd', 'btc', 'BTC').then((result) => {
      expect(result).toBe('catasd');
    });
    p.getAddress('brad.crypto', 'eth', 'ETH').then((result) => {
      expect(result).toBe('brad.crypto');
    });
    p.getAddress(
      '0xdb9875cB6e088b11Cd6BA4D436FfE20dA46364db',
      'link_erc20',
      'LINK'
    ).then((result) => {
      expect(result).toBe('0xdb9875cB6e088b11Cd6BA4D436FfE20dA46364db');
    });
  });
});
