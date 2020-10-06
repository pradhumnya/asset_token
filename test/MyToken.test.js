const Token = artifacts.require("MyToken")
require("dotenv").config({ path: "../.env" })

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect

contract("TokenTest", async(accounts) => {

    const [deployerAccount, recepient, anotherAccount] = accounts;

    beforeEach(async () => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS)
    })

    it('all tokens should be in my account', async() => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)  //eventually takes care of awaiting for the promise to be fulfilled
    })

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
        expect(instance.transfer(recepient, sendTokens)).to.eventually.be.fulfilled
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
        return expect(instance.balanceOf(recepient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
    })

    it("is not possible to send more tokens than available in total", async () => {
        let instance = this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount)

        expect(instance.transfer(recepient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)
    })
})