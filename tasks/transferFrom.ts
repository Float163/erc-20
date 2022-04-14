import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import { Contract } from "ethers";

task("transferFrom", "Transfer amount token from address to address", async (taskArgs, hre) => {
  let hardhatToken : Contract;
  const ta = (taskArgs as any);
    
  hardhatToken = await hre.ethers.getContractAt("m63", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const result = await hardhatToken.transferFrom(ta.sender, ta.recipient, hre.ethers.utils.parseEther(ta.value));

  console.log(result);
}).addParam("sender", "The sender address")
.addParam("recipient", "The recipient address")
.addParam("value", "Amount of token");
  
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.4"
};