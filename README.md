# @arcticwallet/arctic-dns
### NOTE you need to provide BLOCKCHAIN_NODE_ADDRESSES to constructor
### also node addresses used in jest tests, please make a setup for jest config
Available methods

```const p = new Providers({bnb_bep20: 'node_address', eth: 'node_address''})```

```p.checkAddress(domain: string, currency: string, ticker: string, debug = false): Promise<null | boolean>```

```p.getAddress(domain: string, currency: string, ticker: string, debug = false): Promise<string>```

```p.getPrice(domain: string, debug = false): Promise<IDomainPrice>```



```ErrorCodes on getPrice method```

```
FORBIDDEN_SYMBOLS = 1,
DOMAIN_TAKEN = 2,
OTHER_NOT_PROCESSABLE = 3,
```
