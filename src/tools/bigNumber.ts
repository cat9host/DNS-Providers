import BigNumber from 'bignumber.js';

BigNumber.config({
  DECIMAL_PLACES: 20,
  EXPONENTIAL_AT: [-100, 100],
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

export { BigNumber };
