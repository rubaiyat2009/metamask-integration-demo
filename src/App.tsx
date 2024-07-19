import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

const App: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const initMetamask = async () => {
      console.log('Checking for Metamask...');
      const ethProvider: any = await detectEthereumProvider();
      if (ethProvider) {
        setProvider(new ethers.providers.Web3Provider(ethProvider));
        console.log('Metamask provider detected');
      } else {
        alert('Please install Metamask!');
      }
    };
    initMetamask();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        await provider.send('wallet_requestPermissions', [{ eth_accounts: {} }]);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);
        alert('Connected account: ' + accounts[0]);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error connecting to Metamask:', error);
          alert('Error connecting to Metamask: ' + error.message);
        } else {
          console.error('Error connecting to Metamask:', error);
          alert('Error connecting to Metamask.');
        }
      }
    } else {
      console.log('No provider found');
      alert('No provider found. Please ensure Metamask is installed.');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Metamask</button>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
};

export default App;