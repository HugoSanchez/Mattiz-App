// Crypto imports
import 'ethers/dist/shims.js'; // Required 'Shim' for ethers.js to work in React Native.
import { ethers } from 'ethers';

const provider = provider = ethers.getDefaultProvider()

// Returns transaction object ready to be signed. 
export const buildTx = async (wallet, address, amount) => {
    return {
        nonce: await wallet.getTransactionCount(),
        gasLimit: 21000,
        gasPrice: await provider.getGasPrice(),   
        to: address,
        value: ethers.utils.parseEther(amount),
        data: "0x",
        chainId: ethers.utils.getNetwork('homestead').chainId
    }
}

export const 