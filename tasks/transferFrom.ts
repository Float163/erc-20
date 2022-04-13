import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { abi } from '../artifacts/contracts/m63.sol/m63.json';

task("transferFrom", "Transfer amount token from address to address", async (taskArgs, hre) => {
  const ta = (taskArgs as any);
  const [signer] = await hre.ethers.getSigners();
  const tokenContr = new hre.ethers.Contract(ta.contract, abi, signer);
  const result = await tokenContr.transferFrom(ta.sender, ta.recipient, ta.value);
  console.log(result);
  }).addParam("contract", "The contract address")
  .addParam("sender", "The recipient address")
  .addParam("recipient", "The recipient address")
  .addParam("value", "amount of token");
  
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.4"
};