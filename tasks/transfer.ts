import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

import { Contract } from "ethers";
import { ContractFactory } from "ethers";

task("transfer", "Transfer amount token to address", async (taskArgs, hre) => {
    let Token : ContractFactory;
    let hardhatToken : Contract;
    let ta: any;
    let result: boolean;
    ta = (taskArgs as any);
  
    Token = await hre.ethers.getContractFactory("m63");
    hardhatToken = await Token.deploy('platinum', 'PL');
    try {
      result = await hardhatToken.transfer(ta.recipient, ta.value);
      console.log('Result OK');      
    }
    catch (err) {
        console.log(err);
    }
  }).addParam("recipient", "The recipient address").addParam("value", "amount of token");
  
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.4"
};
