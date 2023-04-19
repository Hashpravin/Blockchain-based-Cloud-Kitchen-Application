const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}
const ID = 1
const Name = "Gulab Jamun"
const Category = "Sweets"
const Image = "ImageUrl"
const Cost = tokens(1)
const Rating = 4
const Stock = 5
describe("TastyBite", () => {
  let tasty
  let deployer
  let buyer
  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners();
    // console.log(deployer.address,buyer.address)
    // console.log()
    // Deploying the contract
    // Copy the smart contract with ether.js library 
    // ether.js connect your project with the blockchain 
    const Tasty = await ethers.getContractFactory("TastyBite")
    tasty = await Tasty.deploy()
  })

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await tasty.owner()).to.equal(deployer.address)
    })
  })

  describe("listing", () => {
    let transaction

    beforeEach(async () => {
      transaction = await tasty.connect(deployer).list(
        ID,
        Name,
        Category,
        Image,
        Cost,
        Rating,
        Stock
      )

      await transaction.wait()
    })
    it("Returns item attributes ", async () => {
      const item = await tasty.items(ID) // calling a map
      //Checking everything......
      expect(item.id).to.equal(ID) //  checking whether its working or not
      expect(item.name).to.equal(Name)
      expect(item.category).to.equal(Category)
      expect(item.image).to.equal(Image)
      expect(item.cost).to.equal(Cost)
      expect(item.rating).to.equal(Rating)
      expect(item.stock).to.equal(Stock)
    })

    it("Emits list event ", async () => {
      expect(transaction).to.emit(tasty, "List")
    })

  })

  describe("Buying", () => {
    let transaction

    beforeEach(async () => {
      transaction = await tasty.connect(deployer).list(ID, Name, Category, Image, Cost, Rating, Stock)
      await transaction.wait()

      // Buy an item 
      transaction = await tasty.connect(buyer).buy(ID, { value: Cost }) // value :Cost it is meta data
    })

    // TODO: Problem here is the value comes out to be undefine
    it("Update the contract balance", async () => {
      const result = await ethers.provider.getBalance(tasty.address)
      //  console.log(result)
      expect(result).to.equal(Cost)
    })

    it("Update the buyer's order count", async () => {
      const result = await tasty.orderCount(buyer.address)
      expect(result).to.equal(1)
    })

    it("Add the order", async () => {
      const order = await tasty.orders(buyer.address,1)
      // console.log(order);
      expect(order.time).to.be.greaterThan(0)
      expect(order.item.name).to.equal(Name)
    })
   
    it("Emit the Buy event ",() =>{
      expect(transaction).to.emit(tasty,"Buy");
    })
  })
   

  // checking the withdrawing
  describe("Withdrawing", () => {
    let balanceBefore

    beforeEach(async () => {
      // List a item
      let transaction = await tasty.connect(deployer).list(ID, Name, Category, Image, Cost, Rating, Stock)
      await transaction.wait()

      // Buy a item
      transaction = await tasty.connect(buyer).buy(ID, { value: Cost })
      await transaction.wait()

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      // Withdraw the fund
      transaction = await tasty.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      //  The balance of owner should get increase if transfer really happen then
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(tasty.address)
      expect(result).to.equal(0)
    })
  })


})
