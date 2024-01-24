import { IUnstoppableDomains } from './interfaces';
import Resolution from '@unstoppabledomains/resolution/build/Resolution';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

class UnstoppableDomains implements IUnstoppableDomains {
  private resolution: Resolution;

  private moralisApiKey =
    'YO55O6JsDsDfDtj3Ovnl5zfDCgrC9dCmagDbbOt8NLxClhVYDyoke2GoLfG8YDJ8';

  constructor() {
    this.resolution = new Resolution();
  }

  async checkAddress(
    domain: string,
    currency: string,
    debug: boolean
  ): Promise<boolean | null> {
    const address = await this.getAddress(domain, currency, debug);

    return address !== domain ? true : null;
  }

  async getAddress(
    domain: string,
    currency: string,
    debug: boolean
  ): Promise<string> {
    let address = domain;
    const isValidDomain =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
        address
      );

    if (!isValidDomain) {
      return address;
    }
    try {
      address = await this.resolution.addr(domain, currency.toUpperCase());
    } catch (e) {
      if (debug) {
        console.error(e as Error, 'Unstoppable Domains');
      }
    }

    return address;
  }

  async getDomain(
    address: string,
    currency: string,
    debug = false
  ): Promise<{ ud: string | null }> {
    const response = { ud: null };
    try {
      const chain = this.getEvmChainByCurrency(currency);
      if (!chain) {
        return response;
      }
      const moralis = Moralis;
      await moralis.start({
        apiKey: this.moralisApiKey,
      });

      const r = await Moralis.EvmApi.resolve.resolveAddress({
        address,
      });

      // @ts-ignore
      response.ud = r ? r?.toJSON().name ?? null : null;
    } catch (e) {
      if (debug) {
        console.error(e as Error, 'Unstoppable Domains');
      }
    }

    return response;
  }

  getEvmChainByCurrency(currency: string) {
    const c = currency.split('_');
    switch (c[1] ?? c[0]) {
      case 'erc20':
      case 'eth':
        return EvmChain.ETHEREUM;
      case 'arb':
      case 'etharb':
        return EvmChain.ARBITRUM;
      case 'mrc20':
      case 'matic':
        return EvmChain.POLYGON;
      case 'bep20':
        return EvmChain.BSC;
      default:
        return null;
    }
  }
}

export const UDomains = new UnstoppableDomains();
