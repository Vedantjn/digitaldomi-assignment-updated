// backend/config/config.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  infuraProjectId: process.env.INFURA_PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  contractAddress: "0xDcCF37B6DA3fa20968bCD755cE02A67e352137F9",
};