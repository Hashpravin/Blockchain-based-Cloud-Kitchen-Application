// We require the Hardhat Runtime Environment explicitly here. This is optional
// will compile contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// Hardhat let script which is just instruction to deploy 
// our smart contract on blockchain
const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  //  Setting up accounts
  const [deployer] = await ethers.getSigners() // deployer is public key or account
  // Depoying the smart contract of TastyBites
  const Tasty = await hre.ethers.getContractFactory("TastyBite")
  const tasty = await Tasty.deploy()
  await tasty.deployed()

  // to check
  console.log(`Deployed TastyBites at: ${tasty.address}\n`)

  // listing items for frontend ....
  for(let i=0;i<items.length;i++){
    const transaction = await tasty.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock, 
    )

    await transaction.wait()
    
    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}

// This pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
