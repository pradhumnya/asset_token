// Defining how smart contracts are to be deployed
// artifacts are the created json files from truffle when it compiles the contract
var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");
require("dotenv").config({ path: "../.env" })

module.exports = async function(deployer) {   // async function as we are deploying the contracts
  let addr = await web3.eth.getAccounts()
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  await deployer.deploy(KycContract);
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, KycContract.address);
  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS)  // Transfers tokens from MyToken to MyTokenSale
};
