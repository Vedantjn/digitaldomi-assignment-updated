// backend/controllers/nftController.js
const nftService = require('../services/nftService');

exports.mintNFT = async (req, res) => {
  try {
    const { address, lat, lng } = req.body;
    const result = await nftService.mintNFT(address, lat, lng);
    res.json(result);
  } catch (error) {
    console.error('Error minting NFT:', error);
    res.status(500).json({ error: 'Failed to mint NFT', details: error.message });
  }
};