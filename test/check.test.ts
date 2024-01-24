import { checkAddress } from '../src';
describe('test checkAddress function', () => {
  it('should return true', () => {
    checkAddress('cat9h0st', 'bnb_bep20', 'BNB').then((result) => {
      expect(!!result).toBe(true);
    });
    checkAddress('cat9h0st', 'usdt_bep20', 'BNB').then((result) => {
      expect(!!result).toBe(true);
    });
    checkAddress('cat9h0st', 'matic_mrc20', 'MATIC').then((result) => {
      expect(!!result).toBe(false);
    });
    checkAddress('cat9h0st', 'usdt_mrc20', 'MATIC').then((result) => {
      expect(!!result).toBe(false);
    });
    checkAddress('cat', 'bnb_bep20', 'BNB').then((result) => {
      expect(!!result).toBe(false);
    });
    checkAddress('catasd', 'btc', 'BTC').then((result) => {
      expect(!!result).toBe(false);
    });
    checkAddress('brad.crypto', 'eth', 'ETH').then((result) => {
      expect(!!result).toBe(false);
    });
  });
});
