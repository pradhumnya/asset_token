const TokenSale = artifacts.require("MyTokenSale")
const Token = artifacts.require("MyToken")
const KycContract = artifacts.require("KycContract")
require("dotenv").config({ path: "../.env" })

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSaleTest", async(accounts) => {
    const [deployerAccount, recepient, anotherAccount] = accounts;

    it("should not have have any tokens in my deployer Account", async() => { //This is as we have already transferred tokens to MyTokenSale from MyToken
        let instance = await Token.deployed()
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0))           
    })

    it("all tokens should be in the TokenSale smart contract by default", async() => {
        let instance = await Token.deployed()
        let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address)
        let totalSupply = await instance.totalSupply()
        return expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply)
    })

    it("should be possible to buy tokens", async() => {
        let tokenInstance = await Token.deployed()
        let kycInstance = await KycContract.deployed()
        let tokenSaleInstance = await TokenSale.deployed()
        let balanceBefore = await tokenInstance.balanceOf(recepient)
        await kycInstance.setKycCompleted(recepient, {from: deployerAccount})
        expect(tokenSaleInstance.sendTransaction({from: recepient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        balanceBefore = balanceBefore.add(new BN(1));
        return expect(tokenInstance.balanceOf(recepient)).to.eventually.be.a.bignumber.equal(balanceBefore);
    })

})