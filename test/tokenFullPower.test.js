const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Token", function() {
    it("Should return the correct total supply of the contract", async function() {
        const Token = await ethers.getContractFactory("TokenFullPower");
        const token = await Token.deploy(480);

        const totalSupplyExpected = 480;
        const totalSupplyResult = await token.getTotalSupply();

        expect(totalSupplyExpected).to.equal(totalSupplyResult);
    });

    it("Should return the correct balance", async function() {
        const [owner, wallet1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("TokenFullPower", owner);
        const token = await Token.deploy(480);

        const ownerBalanceExpected = 480;
        const ownerBalance = await token.balanceOf(owner.address);

        expect(ownerBalanceExpected).to.equal(ownerBalance);

        const wallet1BalanceExpected = 0;
        const wallet1Balance = await token.balanceOf(wallet1.address);

        expect(wallet1BalanceExpected).to.equal(wallet1Balance);
    });

    it("Should transfer the correct value", async function() {
        const [owner, wallet1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("TokenFullPower", owner);
        const token = await Token.deploy(480);
        await token.deployed();

        const ownerBalanceExpected = 480;
        const transferedValue = 20;
        const valueMinted = 10;
        const ownerBalance = await token.balanceOf(owner.address);

        expect(ownerBalanceExpected).to.equal(ownerBalance);

        const wallet1BalanceExpected = 0;
        const wallet1Balance = await token.balanceOf(wallet1.address);

        expect(wallet1BalanceExpected).to.equal(wallet1Balance);

        //Transaction
        await token.connect(owner).transfer(wallet1.address, transferedValue);

        const newOwnerBalance = await token.balanceOf(owner.address);
        const newWallet1Balance = await token.balanceOf(wallet1.address);

        expect(newOwnerBalance).to.equal(ownerBalanceExpected - transferedValue + valueMinted);
        expect(newWallet1Balance).to.equal(transferedValue);
    });

    it("Should total supply decrease by half owner balance", async function() {
        const [owner, ...accounts] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("TokenFullPower");
        const token = await Token.deploy(499);

        await token.deployed();

        const transferedValue = 20;
        //const valueMinted = 10;
        const totalSupply = 499;

        //Verifing inicial values
        const totalSupplyExpected = await token.getTotalSupply();

        expect(totalSupply).to.equal(totalSupplyExpected);



        //---------------Transactions
        const transfer1 = await token.transfer(accounts[0].address, transferedValue);
        await transfer1.wait()
        const firstTotalSupply = await token.getTotalSupply();

        const ownerBalance = await token.balanceOf(owner.address);
        const wallet1Balance = await token.balanceOf(accounts[0].address);

        console.log(firstTotalSupply)
        console.log(ownerBalance)
        console.log(wallet1Balance)

        //Verifing total supply after first transaction
        expect(firstTotalSupply).to.equal(ownerBalance.toNumber() + wallet1Balance.toNumber());

        //Second Transaction

        await token.connect(owner).transfer(accounts[0].address, transferedValue);
        const secondTotalSupply = await token.getTotalSupply();
        //Verifing total supply after second transaction
        const ownerBalance1 = await token.balanceOf(owner.address);
        const wallet1Balance1 = await token.balanceOf(accounts[0].address);
        //expect(secondTotalSupply).to.equal(totalSupply + valueMinted);

        expect(secondTotalSupply).to.equal(ownerBalance1.toNumber() + wallet1Balance1.toNumber());

        //Burning Transaction
        await token.connect(owner).transfer(accounts[0].address, transferedValue);
        const burnTotalSupply = await token.getTotalSupply();
        const ownerBalance2 = await token.balanceOf(owner.address);
        const wallet1Balance2 = await token.balanceOf(accounts[0].address);

        expect(burnTotalSupply).to.equal(ownerBalance2.toNumber() + wallet1Balance2.toNumber());
    });
});