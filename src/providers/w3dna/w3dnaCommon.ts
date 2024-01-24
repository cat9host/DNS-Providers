import { TW3dnaNFTCommonData } from './interfaces';
import { EVMNetworks } from '../../config';

export const w3dnaNFTCommonData: TW3dnaNFTCommonData = {
  bep20: {
    address: '0xe1e538acCAD918C2F5924fbebbd11867Ff89F473',
    networkId: EVMNetworks.bnb_bep20.networkId,
    chainId: EVMNetworks.bnb_bep20.chainId,
  },
  mrc20: {
    address: '0x604fC029e73f340bAAabfEECA61651508690d653',
    networkId: EVMNetworks.matic_mrc20.networkId,
    chainId: EVMNetworks.matic_mrc20.chainId,
  },
  erc20: {
    address: '0x2E84A0351447A3eCED8D9F47a65F32EFcE237f8A',
    networkId: EVMNetworks.eth.networkId,
    chainId: EVMNetworks.eth.chainId,
  },
};

export enum Endpoints {
  PRICE = 'sales/domains/price',
}

export const PRECISION = 18;
