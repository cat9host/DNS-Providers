export interface IUnstoppableDomains {
  checkAddress(
    domain: string,
    currency: string,
    debug: boolean
  ): Promise<boolean | null>;
  getAddress(domain: string, currency: string, debug: boolean): Promise<string>;
  getDomain(
    address: string,
    currency: string,
    debug: boolean
  ): Promise<{ ud: string | null }>;
}
