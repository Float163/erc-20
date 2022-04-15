# Simple ERC-20 Token contract

Verified contract - https://rinkeby.etherscan.io/address/0xa243973C370C858688110FB3fB6397049A812658#code

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
npx hardhat verify --network rinkeby <contract address> <token name> <token symbol> <decimals> <totalSupply>
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