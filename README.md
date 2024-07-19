# Metamask Integration Demo

This project demonstrates how to integrate Metamask with a React application. It includes functionalities for connecting to Metamask, detecting account changes, and displaying the connected account.

## Features

- Connect to Metamask
- Detect and handle account changes
- Display the connected account address

## Prerequisites

- Node.js
- Metamask extension installed in your browser

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/metamask-integration-demo.git
   cd metamask-integration-demo
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

### Usage

1. Click the "Connect Metamask" button to connect your Metamask wallet.
2. Allow the connection in the Metamask pop-up.
3. The connected account address will be displayed.
4. Change the account in Metamask to see the updated account address in the application.

## Code Overview

### `App.tsx`

- Initializes Metamask and listens for account changes.
- Connects to Metamask when the button is clicked.
- Displays the connected account address.

```tsx
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
        
        // Listen for account changes
        ethProvider.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            console.log('Account changed:', accounts[0]);
            alert('Account changed: ' + accounts[0]);
          } else {
            setAccount(null);
            console.log('No accounts available');
          }
        });
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
```

## License

This project is licensed under the MIT License.
