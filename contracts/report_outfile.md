## Sūrya's Description Report

### Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| FiatTokenV1.sol | 9975afd6afc08d3ce12dd858b2cd6cc320ae7f5b |


### Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **FiatTokenV1** | Implementation | Ownable, ERC20, Pausable, Blacklistable |||
| └ | initialize | Public ❗️ | 🛑  |NO❗️ |
| └ | mint | Public ❗️ | 🛑  | whenNotPaused onlyMinters notBlacklisted notBlacklisted |
| └ | minterAllowance | Public ❗️ |   |NO❗️ |
| └ | isMinter | Public ❗️ |   |NO❗️ |
| └ | allowance | Public ❗️ |   |NO❗️ |
| └ | totalSupply | Public ❗️ |   |NO❗️ |
| └ | balanceOf | Public ❗️ |   |NO❗️ |
| └ | approve | Public ❗️ | 🛑  | whenNotPaused notBlacklisted notBlacklisted |
| └ | transferFrom | Public ❗️ | 🛑  | whenNotPaused notBlacklisted notBlacklisted notBlacklisted |
| └ | transfer | Public ❗️ | 🛑  | whenNotPaused notBlacklisted notBlacklisted |
| └ | configureMinter | Public ❗️ | 🛑  | whenNotPaused onlyMasterMinter |
| └ | removeMinter | Public ❗️ | 🛑  | onlyMasterMinter |
| └ | burn | Public ❗️ | 🛑  | whenNotPaused onlyMinters notBlacklisted |
| └ | updateMasterMinter | Public ❗️ | 🛑  | onlyOwner |


### Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
