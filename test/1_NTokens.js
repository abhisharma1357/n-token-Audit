const Ntokens = artifacts.require('FiatTokenV2.sol');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

contract('Ntokens Contract', async (accounts) => {

    it('Should correctly initialize constructor values of Backers Token Contract', async () => {

        this.tokenhold = await Ntokens.new({ gas: 600000000 });

    });

    it('Should check Owner of Token contract', async () => {

        let Owner = await this.tokenhold.owner.call();
        assert.equal(Owner, accounts[0]);

    });

    it('Should check Symbol of Token contract', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol, '');
    });

    it('Should check name of Token contract', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name, '');
    });

    it('Should check currency of Token contract', async () => {

        let currency = await this.tokenhold.currency.call();
        assert.equal(currency, '');
    });

    it('Should check decimal of Token contract', async () => {

        let decimal = await this.tokenhold.decimals.call();
        assert.equal(decimal.toNumber(), 0);
    });

    it('Should check masterMinter of Token contract', async () => {

        let masterMinter = await this.tokenhold.masterMinter.call();
        assert.equal(masterMinter, 0x0);
    });

    it('Should check blacklister of Token contract', async () => {

        let blacklister = await this.tokenhold.blacklister.call();
        assert.equal(blacklister, 0x0);
    });

    it('Should check pauser of Token contract', async () => {

        let pauser = await this.tokenhold.pauser.call();
        assert.equal(pauser, 0x0);
    });

    it('Should check totalSupply of Token contract', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply, 0);
    });

    it('Should initialize Token contract', async () => {

        await this.tokenhold.initialize('nTokens Real Virtual', 'BRLV', 'USD', 6, accounts[1], accounts[2], accounts[3], accounts[0], { from: accounts[0] });

    });

    it('Should Not initialize Token contract once initialised', async () => {


        try {

            await this.tokenhold.initialize('BRLV', 'BRLV', 'USD', 6, accounts[1], accounts[2], accounts[3], accounts[0], { from: accounts[0] });

        } catch (error) {

            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should check Owner of Token contract after Initialization', async () => {

        let Owner = await this.tokenhold.owner.call();
        assert.equal(Owner, accounts[0]);

    });

    it('Should check Symbol of Token contract after Initialization', async () => {

        let symbol = await this.tokenhold.symbol.call();
        assert.equal(symbol, 'BRLV');
    });

    it('Should check name of Token contract after Initialization', async () => {

        let name = await this.tokenhold.name.call();
        assert.equal(name, 'nTokens Real Virtual');
    });

    it('Should check currency of Token contract after Initialization', async () => {

        let currency = await this.tokenhold.currency.call();
        assert.equal(currency, 'USD');
    });

    it('Should check decimal of Token contract after Initialization', async () => {

        let decimal = await this.tokenhold.decimals.call();
        assert.equal(decimal.toNumber(), 6);
    });

    it('Should check masterMinter of Token contract after Initialization', async () => {

        let masterMinter = await this.tokenhold.masterMinter.call();
        assert.equal(masterMinter, accounts[1]);
    });

    it('Should check blacklister of Token contract after Initialization', async () => {

        let blacklister = await this.tokenhold.blacklister.call();
        assert.equal(blacklister, accounts[3]);
    });

    it('Should check pauser of Token contract after Initialization', async () => {

        let pauser = await this.tokenhold.pauser.call();
        assert.equal(pauser, accounts[2]);
    });

    it('Should check totalSupply of Token contract after Initialization', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply, 0);
    });

    it('Should add minter by master minter only', async () => {

        await this.tokenhold.configureMinter(accounts[4], 1000000 * 10 ** 6, { from: accounts[1] });

    });

    it('Should check Minter allowance ', async () => {

        let minterAllowance = await this.tokenhold.minterAllowance(accounts[4]);
        assert.equal(minterAllowance.toNumber(), 1000000 * 10 ** 6);
    });

    it('Should check minter or not', async () => {

        let isMinter = await this.tokenhold.isMinter(accounts[4]);
        assert.equal(isMinter, true);
    });

    it('Should not configure Minter by non master minter', async () => {

        try {

            await this.tokenhold.configureMinter(accounts[4], 1000000 * 10 ** 6, { from: accounts[0] });

        } catch (error) {

            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it("Should Not be able to pause Token contract from Non Owner accounts", async () => {

        try {
            var pauseStatusBefore = await this.tokenhold.paused.call();
            assert.equal(pauseStatusBefore, false);
            await this.tokenhold.pause({ from: accounts[1] });
        } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it("Should be able to pause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, false);
        await this.tokenhold.pause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, true);
    });

    it('Should Not be able to configure Minter when paused ', async () => {

        try { await this.tokenhold.configureMinter(accounts[4], 1000000 * 10 ** 6, { from: accounts[1] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it("Should be able to unpause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, true);
        await this.tokenhold.unpause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, false);
    });


    it('Should configure Minter(This test should be failed as already configured this minter) ', async () => {

        await this.tokenhold.configureMinter(accounts[4], 1000000 * 10 ** 6, { from: accounts[1] });

    });

    it('Should check Minter allowance ', async () => {

        let minterAllowance = await this.tokenhold.minterAllowance(accounts[4]);
        assert.equal(minterAllowance.toNumber(), 1000000 * 10 ** 6);
    });

    it('Should check masterMinter of Token contract before update', async () => {

        let masterMinter = await this.tokenhold.masterMinter.call();
        assert.equal(masterMinter, accounts[1]);
    });

    it('Should Not Update master minter by Non owner account', async () => {


        try { await this.tokenhold.updateMasterMinter(accounts[5], { from: accounts[5] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should Update master minter by owner only', async () => {

        await this.tokenhold.updateMasterMinter(accounts[5], { from: accounts[0] });

    });

    it('Should check masterMinter of Token contract after update', async () => {

        let masterMinter = await this.tokenhold.masterMinter.call();
        assert.equal(masterMinter, accounts[5]);
    });

    it('Should check blackLister or not', async () => {

        let isBlacklisted = await this.tokenhold.isBlacklisted(accounts[6]);
        assert.equal(isBlacklisted, false);
    });

    it('Should check blackLister or not', async () => {

        let isBlacklisted = await this.tokenhold.isBlacklisted(accounts[0]);
        assert.equal(isBlacklisted, false);
    });

    it('Should not add blackLister by non blacklistAdmin', async () => {


        try { await this.tokenhold.blacklist(accounts[0], { from: accounts[0] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should add blackLister', async () => {

        await this.tokenhold.blacklist(accounts[0], { from: accounts[3] });

    });

    it('Should check blackLister or not after blacklist is added', async () => {

        let isBlacklisted = await this.tokenhold.isBlacklisted(accounts[0]);
        assert.equal(isBlacklisted, true);
    });

    it('Should Not remove blackLister by non blacklister account', async () => {

        try { await this.tokenhold.unBlacklist(accounts[0], { from: accounts[2] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it("Should be able to pause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, false);
        await this.tokenhold.pause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, true);
    });

    it('Should Not remove blackLister when it is paused ', async () => {

        try { await this.tokenhold.unBlacklist(accounts[0], { from: accounts[3] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it("Should be able to unpause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, true);
        await this.tokenhold.unpause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, false);
    });

    it('Should check blackLister or not after blacklist is not added', async () => {

        let isBlacklisted = await this.tokenhold.isBlacklisted(accounts[6]);
        assert.equal(isBlacklisted, false);
    });

    it('Should remove blackLister', async () => {


        try { await this.tokenhold.unBlacklist(accounts[6], { from: accounts[3] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should check blackLister or not after blacklist is removed', async () => {

        let isBlacklisted = await this.tokenhold.isBlacklisted(accounts[0]);
        assert.equal(isBlacklisted, false);
    });

    it('Should check blackLister of Token contract before update', async () => {

        let blacklister = await this.tokenhold.blacklister.call();
        assert.equal(blacklister, accounts[3]);
    });

    it('Should Not Update master minter by Non owner', async () => {


        try { await this.tokenhold.updateBlacklister(accounts[1], { from: accounts[1] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should Update master minter by owner only', async () => {

        await this.tokenhold.updateBlacklister(accounts[1], { from: accounts[0] });

    });

    it('Should check blackLister of Token contract after update', async () => {

        let blacklister = await this.tokenhold.blacklister.call();
        assert.equal(blacklister, accounts[1]);
    });

    it("Should Not be able to transfer ownership of token Contract by non owner account", async () => {

        try { await this.tokenhold.transferOwnership(accounts[9], { from: accounts[1] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should check Owner of Token contract before transfering ownership', async () => {

        let Owner = await this.tokenhold.owner.call();
        assert.equal(Owner, accounts[0]);

    });

    it("Should be able to transfer ownership of token Contract ", async () => {

        await this.tokenhold.transferOwnership(accounts[9], { from: accounts[0] });
    });

    it('Should check Owner of Token contract after transfering ownership', async () => {

        let Owner = await this.tokenhold.owner.call();
        assert.equal(Owner, accounts[9]);

    });

    it('Should not be able to mint tokens by non minter', async () => {

        try { await this.tokenhold.mint(accounts[6], 1000, { from: accounts[2] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }

    });

    it('Should check totalSupply of Token contract before minting', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply, 0);
    });

    it('Should not be able to mint tokens by minter only more then allowed', async () => {

        try { await this.tokenhold.mint(accounts[6], 10000000 * 10 ** 6, { from: accounts[4] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it("Should check balance of accounts[6] before minting", async () => {

        var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[6]);
        assert.equal(balanceOfAccountFour, 0);

    });

    it('Should be able to mint tokens by minter only', async () => {

        await this.tokenhold.mint(accounts[6], 1000 * 10 ** 6, { from: accounts[4] });

    });

    it('Should check totalSupply of Token contract before minting', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply / 10 ** 6, 1000);
    });

    it("Should check balance of accounts[6]", async () => {

        var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[6]);
        assert.equal(balanceOfAccountFour / 10 ** 6, 1000);

    });

    it("Should check balance of a minter before minting for self", async () => {

        var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[4]);
        assert.equal(balanceOfAccountFour, 0);

    });

    it('Should be able to mint tokens by minter only to itself', async () => {

        await this.tokenhold.mint(accounts[4], 1000 * 10 ** 6, { from: accounts[4] });

    });

    it('Should check totalSupply of Token contract before minting', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply / 10 ** 6, 2000);
    });

    it("Should check balance of accounts[4]", async () => {

        var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[4]);
        assert.equal(balanceOfAccountFour / 10 ** 6, 1000);

    });

    it('Should check totalSupply of Token contract before burning token', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply / 10 ** 6, 2000);
    });

    it("Should be able to pause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, false);
        await this.tokenhold.pause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, true);
    });

    it("Should Not be able to burn tokens when not paused", async () => {

        try { await this.tokenhold.burn(1000 * 10 ** 6, { from: accounts[4] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it("Should be able to unpause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, true);
        await this.tokenhold.unpause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, false);
    });

    it("Should be able to burn tokens by minter only of itself", async () => {

        await this.tokenhold.burn(1000 * 10 ** 6, { from: accounts[4] });

    });

    it("Should check balance of accounts[4] after burning tokens", async () => {

        var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[4]);
        assert.equal(balanceOfAccountFour, 0);

    });

    it('Should check totalSupply of Token contract after burning token', async () => {

        let totalSupply = await this.tokenhold.totalSupply.call();
        assert.equal(totalSupply / 10 ** 6, 1000);
    });

    it("Should Not be able to burn tokens by Non minter of itself", async () => {

        try { await this.tokenhold.burn(1000 * 10 ** 6, { from: accounts[6] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should check minter or not before removing minter', async () => {

        let isMinter = await this.tokenhold.isMinter(accounts[4]);
        assert.equal(isMinter, true);
    });

    it('Should not be able remove minter by master minter only) ', async () => {

        try { await this.tokenhold.removeMinter(accounts[4], { from: accounts[2] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should remove minter by master minter only) ', async () => {

        await this.tokenhold.removeMinter(accounts[4], { from: accounts[5] });

    });

    it('Should check Minter allowance ', async () => {

        let minterAllowance = await this.tokenhold.minterAllowance(accounts[4]);
        assert.equal(minterAllowance.toNumber(), 0);
    });

    it('Should check minter or not after removing minter', async () => {

        let isMinter = await this.tokenhold.isMinter(accounts[4]);
        assert.equal(isMinter, false);
    });

    it("Should not be able to transfer Tokens when a user doesnt have tokens", async () => {

        try {
            let balanceRecieverBefore = await this.tokenhold.balanceOf.call(accounts[7]);
            assert.equal(balanceRecieverBefore.toNumber(), 0, 'balance of beneficery(reciever)');
            await this.tokenhold.transfer(accounts[8], 100 * 10 ** 6, { from: accounts[7], gas: 5000000 });
        } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it("Should not be able to transfer Tokens more than a balance have", async () => {

        try {
            var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[6]);
            assert.equal(balanceOfAccountFour / 10 ** 6, 1000);
            let balanceRecieverBefore = await this.tokenhold.balanceOf.call(accounts[7]);
            assert.equal(balanceRecieverBefore.toNumber(), 0, 'balance of beneficery(reciever)');
            await this.tokenhold.transfer(accounts[8], 10000 * 10 ** 6, { from: accounts[6], gas: 5000000 });
        } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it("Should be able to pause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, false);
        await this.tokenhold.pause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, true);
    });

    it("Should not be able to transfer Tokens when it is paused", async () => {

        try {
            var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[6]);
            assert.equal(balanceOfAccountFour / 10 ** 6, 1000);
            let balanceRecieverBefore = await this.tokenhold.balanceOf.call(accounts[7]);
            assert.equal(balanceRecieverBefore.toNumber(), 0, 'balance of beneficery(reciever)');
            await this.tokenhold.transfer(accounts[8], 100 * 10 ** 6, { from: accounts[6], gas: 5000000 });
        } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it("Should be able to unpause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, true);
        await this.tokenhold.unpause({ from: accounts[2] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, false);
    });

    it("Should be able to transfer Tokens", async () => {
        var balanceOfAccountFour = await this.tokenhold.balanceOf.call(accounts[6]);
        assert.equal(balanceOfAccountFour / 10 ** 6, 1000);
        let balanceRecieverBefore = await this.tokenhold.balanceOf.call(accounts[7]);
        assert.equal(balanceRecieverBefore.toNumber(), 0, 'balance of beneficery(reciever)');
        await this.tokenhold.transfer(accounts[7], 100 * 10 ** 6, { from: accounts[6], gas: 5000000 });
        let balanceRecieverAfter = await this.tokenhold.balanceOf.call(accounts[7]);
        assert.equal(balanceRecieverAfter.toNumber() / 10 ** 6, 100, 'balance of beneficery(reciever)');
    });

    it('Should check pauser of Token contract before update', async () => {

        let pauser = await this.tokenhold.pauser.call();
        assert.equal(pauser, accounts[2]);
    });

    it('Should Not Update pauser by Non owner account', async () => {


        try { await this.tokenhold.updatePauser(accounts[5], { from: accounts[5] }); } catch (error) {
            var error_ = 'VM Exception while processing transaction: revert';
            assert.equal(error.message, error_, 'Reverted ');
        }
    });

    it('Should Update pauser by owner only', async () => {

        await this.tokenhold.updatePauser(accounts[0], { from: accounts[9] });

    });

    it('Should check pauser of Token contract after update', async () => {

        let masterMinter = await this.tokenhold.pauser.call();
        assert.equal(masterMinter, accounts[0]);
    });

    it("Should be able to pause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, false);
        await this.tokenhold.pause({ from: accounts[0] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, true);
    });

    it("Should be able to unpause Token contract", async () => {

        var pauseStatusBefore = await this.tokenhold.paused.call();
        assert.equal(pauseStatusBefore, true);
        await this.tokenhold.unpause({ from: accounts[0] });
        var pauseStatusAfter = await this.tokenhold.paused.call();
        assert.equal(pauseStatusAfter, false);
    });


})

