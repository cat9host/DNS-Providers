import { getPrice } from '../src';
afterAll(async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  }); // avoid jest open handle error
});

describe('test getPrice function', () => {
  it('should return true', () => {
    getPrice('cat9h0st').then((result) => {
      expect(result.status).toBe(false);
      expect(result.errorCode).toBe(2);
    });
    getPrice('9h0st.ru').then((result) => {
      expect(result.status).toBe(false);
      expect(result.errorCode).toBe(1);
    });
    getPrice('cat').then((result) => {
      expect(result.status).toBe(true);
      expect(result.errorCode).toBe(null);
    });
    getPrice('catasdasdasdasdasdasdasdasdas').then((result) => {
      expect(result.status).toBe(true);
      expect(result.errorCode).toBe(null);
    });
  });
});
