// frontend/src/utils/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const mintNFT = async (address, lat, lng) => {
  const response = await axios.post(`${API_URL}/api/mint-nft`, { address, lat, lng });
  return response.data;
};