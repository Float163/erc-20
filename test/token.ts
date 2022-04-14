// We import Chai to use its asserting functions here.
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Token contract", function () {
  // Mocha has four functions that let you hook into the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Token : ContractFactory;
  let hardhatToken : Contract;
  let owner : SignerWithAddress;
  let addr1 : SignerWithAddress;
  let addr2 : SignerWithAddress;
  let addrs : SignerWithAddress[];

  beforeEach(async function () {
    Token = await ethers.getContractFactory("m63");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy('platinum', 'PL', 18, ethers.utils.parseEther('500'));
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should mint tokens to accounts", async function () {
        // Mint 100 tokens from to addr1
        await hardhatToken.mint(addr1.address, ethers.utils.parseEther('100'));
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(ethers.utils.parseEther('100'));
      });

    it("Should burn tokens from accounts", async function () {
        // Burn 50 tokens from to addr1
        await hardhatToken.mint(addr1.address, ethers.utils.parseEther('100'));        
        await hardhatToken.burn(addr1.address, ethers.utils.parseEther('50'));
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(ethers.utils.parseEther('50'));
    });

    it("Should fail if mint sender not owner", async function () {
      await expect(
        hardhatToken.connect(addr1).mint(addr2.address, ethers.utils.parseEther('100'))
      ).to.be.revertedWith("Only owner");
    });

    it("Should fail if burn sender not owner", async function () {
      await expect(
        hardhatToken.connect(addr1).burn(addr2.address, ethers.utils.parseEther('100'))
      ).to.be.revertedWith("Only owner");
    });
      
    it("Should transfer tokens between accounts", async function () {
      await hardhatToken.mint(addr1.address, ethers.utils.parseEther('100'));              
      await hardhatToken.connect(addr1).transfer(addr2.address, ethers.utils.parseEther('50'));
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);      
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther('50'));      
      expect(addr2Balance).to.equal(ethers.utils.parseEther('50'));
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.mint(addr1.address, ethers.utils.parseEther('100'));              
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, ethers.utils.parseEther('101'))
      ).to.be.revertedWith("No enough token");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(addr1.address, ethers.utils.parseEther('100'));
      await hardhatToken.transfer(addr2.address, ethers.utils.parseEther('50'));
      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(ethers.utils.parseEther('150')));

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther('100'));

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(ethers.utils.parseEther('50'));
    });

    it("Should allowance transfer", async function () {
      await hardhatToken.connect(addr1).approve(addr2.address, ethers.utils.parseEther('100'));
      expect(await hardhatToken.allowance(addr1.address, addr2.address)).to.equal(
        ethers.utils.parseEther('100')
      );
    });

    it("Should transfer token if allowance", async function () {
      await hardhatToken.mint(addr1.address, ethers.utils.parseEther('200'));
      await hardhatToken.connect(addr1).approve(addr2.address, ethers.utils.parseEther('100'));
      await hardhatToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther('50'))
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(ethers.utils.parseEther('150'));
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(ethers.utils.parseEther('50'));
    });


    it("Should fail if allowance doesn’t have enough tokens", async function () {
      await hardhatToken.connect(addr1).approve(addr2.address, ethers.utils.parseEther('100'));
      await expect(
        hardhatToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther('101'))
      ).to.be.revertedWith("No enough token");
    });

  });

});

