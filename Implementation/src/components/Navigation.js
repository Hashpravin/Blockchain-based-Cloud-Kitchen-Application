import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {

    const connectHandler = async () => {
        console.log("Connnecting...")
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(accounts[0])
        // console.log(account)
        setAccount(account)
    }
    return (
        <nav>
            <div className='nav__brand'>
                <h1>TastyBite</h1>
            </div>
            <input
                type='text'
                className="nav__search"
            />
            {account ? (
                <button type="button"
                    className='nav__connect'>
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href='#Sweet'>Sweets</a></li>
                <li><a href='#Dish'>Dish</a></li>
                <li><a href='#Pickel'>Pickel</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;