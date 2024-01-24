import { Providers } from '../src';
describe('test checkAddress function', () => {
  it('should return true', () => {
    const p = new Providers({
      bnb_bep20: '',
      matic_mrc20: '',
      eth: ''
    })
    p.checkAddress('cat9h0st', 'bnb_bep20', 'BNB').then((result) => {
      expect(!!result).toBe(true);
    });
    p.checkAddress('cat9h0st', 'usdt_bep20', 'BNB').then((result) => {
      expect(!!result).toBe(true);
    });
    p.checkAddress('cat9h0st', 'matic_mrc20', 'MATIC').then((result) => {
      expect(!!result).toBe(false);
    });
    p.checkAddress('cat9h0st', 'usdt_mrc20', 'MATIC').then((result) => {
      expect(!!result).toBe(false);
    });
    p.checkAddress('cat', 'bnb_bep20', 'BNB').then((result) => {
      expect(!!result).toBe(false);
    });
    p.checkAddress('catasd', 'btc', 'BTC').then((result) => {
      expect(!!result).toBe(false);
    });
    p.checkAddress('brad.crypto', 'eth', 'ETH').then((result) => {
      expect(!!result).toBe(false);
    });
  });
});
