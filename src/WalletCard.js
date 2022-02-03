import react, {useState} from 'react'
import {ethers} from 'ethers'

const WalletCard = () => {
    const[errorMessage, setErrorMessage] = useState(null);
    const[defaultAccount,setDefaultAccount] = useState(null);
    const[userBalance,setUserBalance] = useState(null);
    const[connButtonText,setConnectButtonText] = useState("Connect Wallet");

    const connectionWalletHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0])

            })
            // Meytamask is here i think it
        } else {
            setErrorMessage("Install MetaMask");
        }
    }
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);

    }
    const getUserBalance = (address) => {
        console.log("address", address);
        window.ethereum.request({method:'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            console.log("balance",balance);
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }
    const chainChangedHandler = () => {
        window.location.reload();
    }
    if(window.ethereum)
    window.ethereum.on('accountChanged', accountChangedHandler);
    window.ethereum.on('chainChaned', chainChangedHandler);

    return (
        <div className= 'WalletCard'>
            <h4> {"Connection To the MetaMask using window.ethereum method"} </h4>
            <button onClick={connectionWalletHandler}>{connButtonText}</button>
            
            <div className= 'accountDisplay'>
                <h3>Address: {defaultAccount}</h3>
            </div>
            
            <div className= 'balanceDisplay'>
                <h3>Blanace: {userBalance}</h3>
                </div>
                
                {errorMessage}

        </div>
    )
}

export default WalletCard;