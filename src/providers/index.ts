import { UDomains } from './ud';
import { Web3DNA, w3dnaAssets, IDomainPrice } from './w3dna';
import { networkDetermination } from '../tools/networkDetermination';

export interface IProviders {
  getDomain(
      address: string,
      currency: string,
      debug: boolean,
  ): Promise<Record<'ud' | 'w3dna', string | null>>
  getAddress(
      domain: string,
      currency: string,
      ticker: string,
      debug: boolean,
  ): Promise<string>
  checkAddress(
      domain: string,
      currency: string,
      ticker: string,
      debug: boolean,
  ): Promise<null | boolean>
  getPrice(
      domain: string,
      debug: boolean,
  ): Promise<IDomainPrice>
}

export class Providers implements IProviders {
  constructor(private nodes: Record<string, string>) {}

  async getDomain(
      address: string,
      currency: string,
      debug = false
  ): Promise<Record<'ud' | 'w3dna', string | null>> {
    let w3dnaResponse = null;
    if (w3dnaAssets.includes(networkDetermination(currency))) {
      const w3dna = new Web3DNA(networkDetermination(currency), this.nodes);
      w3dnaResponse = await w3dna.getDomain(address, debug);
    }
    const udResponse = await UDomains.getDomain(address, currency, debug);

    return {
      w3dna: w3dnaResponse ? w3dnaResponse.w3dna : null,
      ...udResponse,
    };
  }

  async getAddress(
      domain: string,
      currency: string,
      ticker: string,
      debug = false
  ): Promise<string> {
    let address: string | null = domain;
    if (w3dnaAssets.includes(networkDetermination(currency))) {
      const w3dna = new Web3DNA(networkDetermination(currency), this.nodes);
      address = await w3dna.getAddress(domain, debug);
    }

    if (!address || address === domain) {
      address = await UDomains.getAddress(domain, ticker, debug);
    }

    return address ?? domain;
  }

  async checkAddress(
      domain: string,
      currency: string,
      ticker: string,
      debug = false
  ): Promise<null | boolean> {
    let status: boolean | null = false;
    if (w3dnaAssets.includes(networkDetermination(currency))) {
      const w3dna = new Web3DNA(networkDetermination(currency), this.nodes);
      status = await w3dna.checkAddress(domain, debug);
    }
    if (!status) {
      status = await UDomains.checkAddress(domain, ticker, debug);
    }

    return status;
  }

  async getPrice(
      domain: string,
      debug = false
  ): Promise<IDomainPrice> {
    const w3dna = new Web3DNA('bep20', this.nodes);

    return w3dna.getDomainPrice(domain, debug);
  }

}
