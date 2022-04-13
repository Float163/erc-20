import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import { Contract } from "ethers";
import { ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

task("approve", "Approve transfer amount token to address", async (taskArgs, hre) => {
 
  }).addParam("recipient", "The recipient address").addParam("value", "amount of token");
  
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.4"
};
