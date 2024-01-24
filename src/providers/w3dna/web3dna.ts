import { providers, Contract } from 'ethers';
import { BigNumber } from '../../tools';
import {
  IWeb3DNA,
  IDomainPriceResponse,
  IDomainPrice,
  ErrorCodesForDomainPrices,
} from './interfaces';
import Web3 from 'web3';
import { w3dnaABI } from './w3dnaABI';
import { Endpoints, PRECISION, w3dnaNFTCommonData } from './w3dnaCommon';
import { defaultNodeHeaders } from '../../config';
import axios, { AxiosInstance } from 'axios';

export class Web3DNA implements IWeb3DNA {
  private readonly provider: providers.Web3Provider;

  private readonly baseURL = 'https://w3dna.net/api';

  constructor(private asset: string, private nodes: Record<string, string>) {
    const node = this.nodes[this.asset]
    const web3 = new Web3(
      new Web3.providers.HttpProvider(node, {
        headers: Object.keys(defaultNodeHeaders).map((k) => {
          return {
            name: k,
            value: defaultNodeHeaders[k],
          };
        }),
      })
    );

    this.provider = new providers.Web3Provider(
      web3.currentProvider as providers.ExternalProvider
    );
  }

  get RESTClient(): AxiosInstance {
    return axios.create({
      baseURL: this.baseURL,
    });
  }

  w3dnaNFTContract = () => {
    return new Contract(
      w3dnaNFTCommonData[this.asset].address,
      w3dnaABI,
      this.provider
    );
  };

  async getAddress(domainName: string, debug: boolean): Promise<string | null> {
    try {
      const contract = this.w3dnaNFTContract();

      return await contract.getDomainNameOwner(domainName);
    } catch (e) {
      if (debug) {
        console.error(e);
      }

      return null;
    }
  }

  async checkAddress(domain: string, debug: boolean): Promise<boolean | null> {
    try {
      const address = await this.getAddress(domain, debug);

      return address && address !== domain ? true : null;
    } catch (e) {
      if (debug) {
        console.error(e);
      }

      return null;
    }
  }

  private toDisplayAmount = (amount: number | string | BigNumber) => {
    return new BigNumber(amount).div(10 ** PRECISION).toString();
  };

  async getDomainPrice(domain: string, debug: boolean): Promise<IDomainPrice> {
    try {
      const response = await this.RESTClient.post<IDomainPriceResponse>(
        Endpoints.PRICE,
        {
          domainNames: [domain],
        }
      ).catch((e) => {
        throw e;
      });

      const { data, status } = response.data;
      const [prices] = data.domainPrices;
      const domainStatus = prices.status;

      if (status !== 'OK') {
        if (prices.message.includes('forbidden symbols')) {
          throw {
            message: prices.message,
            errorCode: ErrorCodesForDomainPrices.FORBIDDEN_SYMBOLS,
          };
        }
        throw {
          message: prices.message,
          errorCode: ErrorCodesForDomainPrices.OTHER_NOT_PROCESSABLE,
        };
      }

      if (['OWNER_UNKNOWN'].includes(domainStatus)) {
        throw {
          message: 'Domain name is taken',
          errorCode: ErrorCodesForDomainPrices.DOMAIN_TAKEN,
        };
      }

      if (['FREE'].includes(domainStatus)) {
        return {
          status: true,
          message: 'ok',
          errorCode: null,
          prices: {
            price: this.toDisplayAmount(prices.priceWithDiscount),
            discount: this.toDisplayAmount(prices.discount),
            priceWithoutDiscount: this.toDisplayAmount(prices.price),
            isPremium: prices.isPremium,
            normalizedDomainName: prices.normalizedDomainName,
          },
        };
      }

      throw Error('Request is not processed');
    } catch (e: any) {
      if (debug) {
        console.error(e);
      }

      return {
        status: false,
        errorCode:
          e.errorCode ?? ErrorCodesForDomainPrices.OTHER_NOT_PROCESSABLE,
        message: e.message ?? 'Request failure',
      };
    }
  }

  async getDomain(
    _address: string,
    _debug = false
  ): Promise<{ w3dna: string | null }> {
    return { w3dna: null };
  }
}
