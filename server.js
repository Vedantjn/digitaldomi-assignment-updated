const express = require('express');
const ethers = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const addressNFTABI = require('./frontend/src/AddressNFTABI.json');

const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0xDcCF37B6DA3fa20968bCD755cE02A67e352137F9";
const contract = new ethers.Contract(contractAddress, addressNFTABI.abi, wallet);

app.post('/api/mint-nft', async (req, res) => {
  try {
    const { address, lat, lng } = req.body;
    const latInt = Math.floor(lat * 1e6);
    const lonInt = Math.floor(lng * 1e6);

    console.log('Minting NFT with params:', { address, latInt, lonInt });

    const transaction = await contract.mintNFT(wallet.address, address, latInt, lonInt);
    console.log('Transaction:', transaction);

    const receipt = await transaction.wait();
    console.log('Transaction receipt:', receipt);

    let tokenId;

    // Method 1: Check for Transfer event
    const transferEvent = receipt.events.find(e => e.event === 'Transfer');
    if (transferEvent) {
      tokenId = transferEvent.args.tokenId.toString();
      console.log('Token ID from Transfer event:', tokenId);
    }

    // Method 2: If no Transfer event, check all logs
    if (!tokenId && receipt.logs.length > 0) {
      const log = receipt.logs[0];
      tokenId = ethers.BigNumber.from(log.topics[3]).toString();
      console.log('Token ID from logs:', tokenId);
    }

    // Method 3: If still no token ID, query the contract
    if (!tokenId) {
      console.log('Querying contract for latest token ID...');
      const latestTokenId = await contract.getLatestTokenId();
      tokenId = latestTokenId.toString();
      console.log('Latest token ID from contract:', tokenId);
    }

    // If all methods fail, use transaction hash
    if (!tokenId) {
      console.log('Unable to determine tokenId. Using transaction hash as identifier.');
      tokenId = receipt.transactionHash;
    }

    res.json({
      tokenId,
      owner: wallet.address,
      transactionHash: receipt.transactionHash
    });
  } catch (error) {
    console.error('Error minting NFT:', error);
    res.status(500).json({ error: 'Failed to mint NFT', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));