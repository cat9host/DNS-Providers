import { Providers } from '../src';
afterAll(async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  }); // avoid jest open handle error
});

describe('test getPrice function', () => {
  it('should return true', () => {
    const p = new Providers({
      bnb_bep20: '',
      matic_mrc20: '',
      eth: ''
    })
    p.getPrice('cat9h0st').then((result) => {
      expect(result.status).toBe(false);
      expect(result.errorCode).toBe(2);
    });
    p.getPrice('9h0st.ru').then((result) => {
      expect(result.status).toBe(false);
      expect(result.errorCode).toBe(1);
    });
    p.getPrice('cat').then((result) => {
      expect(result.status).toBe(true);
      expect(result.errorCode).toBe(null);
    });
    p.getPrice('catasdasdasdasdasdasdasdasdas').then((result) => {
      expect(result.status).toBe(true);
      expect(result.errorCode).toBe(null);
    });
  });
});
