const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("TastyBite", () => {
  let tasty
  beforeEach(async () => {
    // Deploying the contract
    // Copy the smart contract with ether.js library 
    // ether.js connect your project with the blockchain 
    const Tasty = await ethers.getContractFactory("TastyBite")
    tasty = await Tasty.deploy()
  })

  describe("Deployment", () => {
    it('has a name', async () => {

      const name = await tasty.name();
      expect(name).to.equal("Tasty")
    })
  })
})
