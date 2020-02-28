const Ntokens = artifacts.require('FiatTokenV2.sol');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

contract('Ntokens Contract check failed test cases', async (accounts) => {

    it('Should correctly initialize constructor values of Backers Token Contract', async () => {

        this.tokenhold = await Ntokens.new({ from: accounts[0], gas: 600000000 });

    });

    it('Should Not initializeToken contract', async () => {


        try { await this.tokenhold.initialize('BRLV', 'BRLV', 'USD', 6, accounts[1], accounts[2], accounts[3], accounts[0], { from: accounts[9] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

})

