import Onboard from 'bnc-onboard';
import { ethers } from 'ethers';

const NETWORK_ID = 1; // Replace with the desired Ethereum network ID
const RPC_URL = 'https://mainnet.infura.io/v3/3cb1dcc9740f48faad0d63cbf29da0b1'; // Replace with your Infura project ID or desired RPC URL
const NFT_CONTRACT_ADDRESS = '0x123456789ABCDEF'; // Replace with the address of your NFT contract
const NFT_TOKEN_ID = 1; // Replace with the ID of the NFT you want to purchase
const ADDRESS = '0xc32169bc8997E71414a8b219Cd77ac8519FA4ccf'; // Replace with the actual recipient address for sending ETH
let provider;
const onboard = Onboard({
  networkId: NETWORK_ID,
  darkMode: true,
  subscriptions: {
    wallet: async (wallet) => {
      if (wallet.provider) {
        try {
          provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
        //    signer = provider.getSigner();

          // Load the NFT contract using its ABI and address
        //   const nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);

          // Purchase the NFT
        //   const purchaseTx = await nftContract.purchase(NFT_TOKEN_ID);

          // Wait for the transaction to be mined
        //   const receipt = await purchaseTx.wait();

        //   console.log('NFT purchase successful:', receipt);

          // Send ETH transaction
        //   const price = document.getElementById('price').textContent.trim();
        //   await sendEth(price, signer);
        } catch (error) {
          console.error('Error purchasing NFT:', error);
        }
      } else {
        console.error('No wallet provider available');
      }
    },
  },
  walletSelect: {
    wallets: [
      { walletName: 'metamask' },
      { walletName: 'trust', rpcUrl: RPC_URL },
      { walletName: 'walletConnect', infuraKey: '3cb1dcc9740f48faad0d63cbf29da0b1' },
    ],
  },
});

// Call the walletSelect method to prompt the user to select a wallet
export const selectWallet = async () => {
  try {
    const selected = await onboard.walletSelect();
    if (selected) {
        console.log('selected')
      // User has selected a wallet, walletCheck will be automatically triggered
    }
  } catch (error) {
    console.error('Error selecting wallet:', error);
  }
};

// Call the walletCheck method to check if a wallet is already connected
export const checkWallet = async () => {
  try {
    const walletSelected = await onboard.walletCheck();
    if (walletSelected) {
        console.log('ready')
        sessionStorage.setItem('walletReady','1')
        return true
      // Wallet is already connected, the `wallet` subscription callback will be triggered
    } else {
      // Wallet is not connected, prompt the user to select a wallet
      await selectWallet();
    }
  } catch (error) {
    console.error('Error checking wallet connection:', error);
  }
};

export const connectWallet=async ()=> {
  // let ans=
    await selectWallet()
    let ans= await checkWallet();
return ans
}
// Call the checkWallet function to initialize the onboarding process
// checkWallet();

// async function sendEth(price, signer) {
//   try {
//     await signer.sendTransaction({
//       to: ADDRESS,
//       value: ethers.utils.parseEther(price),
//       gasLimit: 100000,
//     });
//     console.log('ETH transaction sent successfully');
//   } catch (error) {
//     console.error('Error sending ETH transaction:', error);
//   }
// }

export const sendEth=async(price)=>{
    const signer = provider.getSigner();
    try {
        await signer.sendTransaction({
          to: ADDRESS,
          value: ethers.utils.parseEther(price),
          gasLimit: 100000,
        });
        console.log('ETH transaction sent successfully');
      } catch (error) {
        console.error('Error sending ETH transaction:', error);
      }
}
