# Brief
Barbossa’s Brethren managed to acquire Queen Anne’s Revenge. They now
want to recruit sailors for a journey across the seas and they offer hefty joining
bonuses to attract young sailors. The joyous sailors decide to spend all their
bonus before the long voyage. Help the sailors lose their money by gambling.
You know how the saying goes: Once ye lose yer first hand, ye get hooked!
They need a platform for gambling, and looking at the sea shell on your
resume, they have approached you. You have to develop an online platform
on blockchain, so that they do not make you walk the plank. Since the pirates
do not know how to use a terminal, they want you to also develop a front
end for the dApp

# Usage
1. Clone the repository
2. `npm i`
3. `truffle build`
4. `truffle develop` Now you're up and running with the Truffle console
5. Now let's fire up the react client `cd client && npm i`
6. `npm start`

# Directory Structure

```
.
├── build - Used to contain ABIs for our contracts earlier but now moved to client/src/contracts
├── client - The react client which is housed in its separate repository
├── contracts - All your solidity contracts go here
├── migrations - Contains all migrations for deploying your contracts
└── Test_cases - contains the tests
```
