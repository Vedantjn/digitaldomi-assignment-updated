// backend/routes/nftRoutes.js
const express = require('express');
const nftController = require('../controllers/nftController');

const router = express.Router();

router.post('/mint-nft', nftController.mintNFT);

module.exports = router;