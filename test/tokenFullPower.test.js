const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Token", function () {
  it("Should return the correct total supply of the contract", async function () {
    const Token = await ethers.getContractFactory("CryptoToken");
    const token = await Token.deploy(480);

    const totalSupplyExpected = 480;
    const totalSupplyResult = await token.getTotalSupply();

    expect(totalSupplyExpected).to.equal(totalSupplyResult);
  });

  it("Should return the correct balance", async function () {
    const [ owner, wallet1 ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CryptoToken", owner);
    const token = await Token.deploy(480);

    const ownerBalanceExpected = 480;
    const ownerBalance = await token.balanceOf(owner.address);

    expect(ownerBalanceExpected).to.equal(ownerBalance);

    const wallet1BalanceExpected = 0;
    const wallet1Balance = await token.balanceOf(wallet1.address);

    expect(wallet1BalanceExpected).to.equal(wallet1Balance);
  });

  it("Should transfer the correct value", async function () {
    const [ owner, wallet1 ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CryptoToken", owner);
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

  it("Should total supply decrease by half owner balance", async function () {
    const [ owner, wallet1 ] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CryptoToken", owner);
    const token = await Token.deploy(490);
    await token.deployed();

    const transferedValue = 20;
    const valueMinted = 10;
    const totalSupply = 490;  

    //Verifing inicial values
    const totalSupplyExpected = await token.getTotalSupply();
    
    expect(totalSupply).to.equal(totalSupplyExpected);

    //---------------Transactions
    await token.connect(owner).transfer(wallet1.address, transferedValue);
    const firstTotalSupply = await token.getTotalSupply();

    //Verifing total supply after first transaction
    expect(firstTotalSupply).to.equal(totalSupply + valueMinted);

    //Second Transaction
    await token.connect(owner).transfer(wallet1.address, transferedValue);
    const secondTotalSupply = await token.getTotalSupply();

    //Verifing total supply after second transaction
    expect(secondTotalSupply).to.equal(totalSupply + valueMinted + valueMinted);

    //Burning Transaction
    await token.connect(owner).transfer(wallet1.address, transferedValue);
    const burnTotalSupply = await token.getTotalSupply();
    const ownerBalance = await token.balanceOf(owner.address);
    const wallet1Balance = await token.balanceOf(wallet1.address);
    
    expect(burnTotalSupply).to.equal(ownerBalance.toNumber() + wallet1Balance.toNumber());
  });
});