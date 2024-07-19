// src/MetamaskIntegration.js
import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

const MetamaskIntegration = () => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const initMetamask = async () => {
            const ethProvider = await detectEthereumProvider();
            if (ethProvider) {
                setProvider(new ethers.providers.Web3Provider(ethProvider));
            } else {
                console.log('Please install Metamask!');
            }
        };
        initMetamask();
    }, []);

    const connectWallet = async () => {
        if (provider) {
            const accounts = await provider.send('eth_requestAccounts', []);
            setAccount(accounts[0]);
        }
    };

    const interactWithDiceGame = async () => {
        if (provider && account) {
            const signer = provider.getSigner();
            // Example interaction, replace with actual contract address and ABI
            const contractAddress = "0xYourContractAddress";
            const contractABI = [
                // ABI goes here
            ];
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            // Example function call
            await contract.yourFunctionName();
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Metamask</button>
            {account && <p>Connected Account: {account}</p>}
            <button onClick={interactWithDiceGame}>Interact with Dice Game</button>
        </div>
    );
};

export default MetamaskIntegration;