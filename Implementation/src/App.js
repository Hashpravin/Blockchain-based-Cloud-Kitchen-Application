import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import TastyBite from './abis/TastyBites.json'

// Config
import config from './config.json'

function App() {

  /*
   useState is React Hook that allows you to add state to a functional component. 
   It returns an array with two values: the current state and a function to update it. 
   The Hook takes an initial state value as an argument and returns an updated state value
   whenever the setter function is called. 
  */
  const [account,setAccount] = useState(null)
  const [provider,setProvider] = useState(null)

  const [tasty,setTastyBites] = useState(null)

  const [Pickel,setPickel] = useState(null)
  const [Sweets,setSweets] = useState(null)
  const [Dish,setDish] = useState(null)

  const togglePop = () => {
    console.log("Toggle run..")
  }

  const loadBlockchainData = async() => {
      /*Steps involved
      1] Connect blockchain
      2] Connect Smart contracts
      3] Load Products
      */
     /*
     metaMask turn out the browser into blockchain browser
     in the similar way ether.js change application
     from normal to blockchain.
     */
     // connect it with the blockchain
     const provider = new ethers.providers.Web3Provider(window.ethereum)
     setProvider(provider)
    // Knowing the network
    const network = await provider.getNetwork()
    console.log(network)
    
    // Connect with smart contracts and creat js version of smart contract
    // ABI - abstract binary interface
    //  describe the function of smart contract...
    /*  To dynamically loading the address of contract :
       config[31337].TastyBites.address
    */
     const tasty = new ethers.Contract(config[network.chainId].TastyBites.address, 
      TastyBite, 
      provider 
      )
      setTastyBites(tasty)
    /* Here after getting the js version of smart contract have to 
    save this in variables
    */
     //Load Product
     const items = []
    //  const sz = await tasty.items.size()
    //  console.log(sz)
      for(var i=0;i<9;i++){
        const item = await tasty.items(i+1)
        items.push(item)
      }
      
      const Sweets = items.filter((item) => item.category === 'Sweets')
      const Dish = items.filter((item) => item.category === 'Dish')
      const Pickel = items.filter((item) => item.category === 'Pickel')

      setSweets(Sweets)
      setDish(Dish)
      setPickel(Pickel)
  }
  
  useEffect(() =>{
    loadBlockchainData()
  },[])

  return (
    <div>
      <Navigation account ={account} setAccount={setAccount} />
      <h2>TastyBite taste the best</h2>
      
      { Sweets && Dish && Pickel && (
        <>
        
        <Section title={'Sweets'} items={Sweets} togglePop = {togglePop} />
        <Section title={'Dish'} items={Dish} togglePop = {togglePop} />
        <Section title={'Pickel'} items={Pickel} togglePop = {togglePop} />
        </>
      )}

    </div>
  );
}

export default App
