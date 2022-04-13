# Simple ERC-20 Token contract

Try running some of the following tasks:

Local deploy
```shell
npx hardhat run tasks\deploy.js --network localhost
```

Rinkeby deploy
```shell
npx hardhat run tasks\deploy.js --network rinkeby
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