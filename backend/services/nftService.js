const ethers = require('ethers');
const config = require('../config/config');
const addressNFTABI = require('../AddressNFTABI.json');

const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${config.infuraProjectId}`);
const wallet = new ethers.Wallet(config.privateKey, provider);
const contract = new ethers.Contract(config.contractAddress, addressNFTABI.abi, wallet);

exports.mintNFT = async (address, lat, lng) => {
  const latInt = Math.floor(lat * 1e6);
  const lonInt = Math.floor(lng * 1e6);

  const transaction = await contract.mintNFT(wallet.address, address, latInt, lonInt);
  const receipt = await transaction.wait();

  let tokenId = await getTokenId(receipt);

  return {
    tokenId,
    owner: wallet.address,
    transactionHash: receipt.transactionHash
  };
};

async function getTokenId(receipt) {
  for (const event of receipt.events) {
    if (event.event === 'Transfer') {
      return event.args.tokenId.toString();
    }
  }
  throw new Error('TokenId not found in transaction receipt');
}