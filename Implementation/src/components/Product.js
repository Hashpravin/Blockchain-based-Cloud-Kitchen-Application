import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, tasty, togglePop }) => {

  const [order, setOrder] = useState(null)
  const [hasBought,setHashBought] = useState(null)

 const fetchDetails = async () => {
  const events = await tasty.queryFilter("Buy")
  const orders = events.filter(
    (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
  )
  
  if(orders.length === 0) return
   
  const order = await tasty.orders(account, orders[0].args.orderId)
  setOrder(order)
 }
 
  const buyHandler = async () => {
    console.log("Buy Handler")
    const signer = await provider.getSigner()
    let transaction = tasty.connect(signer).buy(item.id, {value : item.cost})
    await transaction.wait()

    setHashBought(true)
  }
 
 useEffect (() => {
  fetchDetails()
 },[hasBought]) 

  return (
    <div className="product">
      <div className='product__details'>
        <div className='product__image'>
          <img src={item.image} alt='Product'></img>
        </div>
        <div className='product__overview'>
          <h1>{item.name}</h1>
          <Rating value={item.rating} />
          <hr />
          <p>{item.address}</p>
          <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

          <hr />

          <h2>Overview</h2>
          <p>
            {item.description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </div>

        <div className='product__order'>
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>
          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {/* {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )} */}

          <button className='product__buy' onClick={buyHandler}>
            Order Now
          </button>

          {/* <p><small>Ships from</small> TastyBites</p>
          <p><small>Sold by</small> TastyBites</p> */}

          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}


        </div>

        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>

      </div>
    </div >
  );
}

export default Product;