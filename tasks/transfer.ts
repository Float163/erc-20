import * as conf from "../config";
import { task } from "hardhat/config";

task("transfer", "Transfer")
    .addParam("recipient", "The recipient address")
    .addParam("value", "Amount of token")
    .setAction(async (taskArgs, { ethers }) => {
    let hardhatToken = await ethers.getContractAt(conf.FABRIC_NAME, conf.CONTRACT_ADDRESS);
    const result = await hardhatToken.transfer(taskArgs.recipient, ethers.utils.parseEther(taskArgs.value));
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };
  