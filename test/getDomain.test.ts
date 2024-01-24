import { getDomain } from '../src';
afterAll(async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  }); // avoid jest open handle error
});

describe('test getDomain function', () => {
  it('should return true', () => {
    getDomain('0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 'eth').then(
      (result) => {
        expect(result.ud).toBe('vitalik.eth');
        expect(result.w3dna).toBe(null);
      }
    );
    getDomain('0x69B3E1a57ffd00F2eD1db689f27E9C620383d64B', 'bnb_bep20').then(
      (result) => {
        expect(result.ud).toBe(null);
        expect(result.w3dna).toBe(null);
      }
    );
  });
});
