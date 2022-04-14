# Simple ERC-20 Token contract

Try running some of the following tasks:

Local deploy
```shell
npx hardhat run scripts/deploy.ts --network localhost
```

Rinkeby deploy
```shell
npx hardhat run scripts/deploy.ts --network rinkeby
```

Test
```shell
npx hardhat test
```

Verify
```shell
npx hardhat verify --network rinkeby <contract address> <token name> <token symbol>
```

transfer
```shell
npx hardhat transfer --recipient <address> --value <amount>
```

transferFrom
```shell
npx hardhat transferFrom --sender <address> --recipient <address> --value <amount>
```

approve
```shell
npx hardhat approve --recipient <address> --value <amount>
```