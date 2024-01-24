export interface IWeb3DNA {
  getAddress(domainName: string, debug: boolean): Promise<string | null>;
  checkAddress(domain: string, debug: boolean): Promise<boolean | null>;
  getDomainPrice(domain: string, debug: false): Promise<any>;
  getDomain(address: string, debug: boolean): Promise<{ w3dna: string | null }>;
}

export type TW3dnaNFTCommonData = Record<string, TW3dnaNFTCommonDataItem>;
export type TW3dnaNFTCommonDataItem = {
  address: string;
  networkId: number;
  chainId: number;
};

export const w3dnaAssets = ['mrc20', 'bep20', 'erc20'];

type TDomainPriceItem = {
  domainName: string;
  normalizedDomainName: string;
  status: string;
  message: string;
  price: string;
  discount: number;
  priceWithDiscount: string;
  isPremium: boolean;
};

export interface IDomainPriceResponse {
  status: string;
  message: string;
  details: string;
  data: {
    domainPrices: TDomainPriceItem[];
    price: string;
    discount: number;
    priceWithDiscount: string;
    couponDiscount: string;
  };
}

export interface IDomainPrice {
  status: boolean;
  message: string;
  errorCode: ErrorCodesForDomainPrices | null;
  prices?: {
    price: string;
    discount: string;
    priceWithoutDiscount: string;
    isPremium: boolean;
    normalizedDomainName: string;
  };
}

export enum ErrorCodesForDomainPrices {
  FORBIDDEN_SYMBOLS = 1,
  DOMAIN_TAKEN = 2,
  OTHER_NOT_PROCESSABLE = 3,
}
