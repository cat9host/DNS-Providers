export const EVMNetworks: Record<
  string,
  { networkId: number; chainId: number }
> = {
  eth: {
    networkId: 1,
    chainId: 1,
  },
  bnb_bep20: {
    networkId: 56,
    chainId: 56,
  },
  matic_mrc20: {
    networkId: 137,
    chainId: 137,
  },
  avax_c: {
    networkId: 1,
    chainId: 43114,
  },
  brise_brise: {
    networkId: 32520,
    chainId: 32520,
  },
  iotx_iotx: {
    networkId: 4689,
    chainId: 4689,
  },
  ftm_ftm: {
    networkId: 250,
    chainId: 250,
  },
};
