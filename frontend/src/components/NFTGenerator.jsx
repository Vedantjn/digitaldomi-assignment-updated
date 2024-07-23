import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const NFTGeneratorWrapper = styled(motion.div)`
  margin-top: 20px;
  text-align: center;
`;

const GenerateButton = styled(motion.button)`
  background-color: ${props => props.theme.accent};
  color: #000000;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #555555;
    cursor: not-allowed;
  }
`;

const NFTDisplay = styled(motion.div)`
  margin-top: 20px;
  padding: 24px;
  background-color: ${props => props.theme.card};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.cardBorder};
`;

const NFTTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 24px;
  color: ${props => props.theme.accent};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NFTInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const NFTInfoItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
`;

const NFTInfoLabel = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${props => props.theme.accent};
  text-transform: uppercase;
`;

const NFTInfoValue = styled.p`
  font-size: 16px;
  margin-bottom: 0;
  color: ${props => props.theme.text};
  word-break: break-all;
`;

const EtherscanLink = styled.a`
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.buttonHover};
    text-decoration: underline;
  }
`;

const NFTGenerator = ({ selected }) => {
  const [nftToken, setNftToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateNFT = async () => {
    if (!selected) {
      alert('Please select an address first');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${API_URL}/api/mint-nft`, {
        address: selected.address,
        lat: selected.lat,
        lng: selected.lng
      });
  
      const { tokenId, owner, transactionHash } = response.data;
  
      setNftToken({
        tokenId,
        owner,
        address: selected.address,
        lat: selected.lat,
        lng: selected.lng,
        transactionHash
      });
    } catch (error) {
      console.error('Error generating NFT:', error);
      if (error.response && error.response.data && error.response.data.details) {
        alert(`Error generating NFT: ${error.response.data.details}`);
      } else {
        alert('Error generating NFT. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NFTGeneratorWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GenerateButton
        onClick={generateNFT}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || !selected}
      >
        {isLoading ? 'Generating...' : 'Generate NFT'}
      </GenerateButton>
      {nftToken && (
        <NFTDisplay
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NFTTitle>NFT Generated!</NFTTitle>
          <NFTInfoGrid>
            <NFTInfoItem>
              <NFTInfoLabel>Transaction Hash</NFTInfoLabel>
              <NFTInfoValue>{nftToken.transactionHash}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Owner</NFTInfoLabel>
              <NFTInfoValue>{nftToken.owner}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Address</NFTInfoLabel>
              <NFTInfoValue>{nftToken.address}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Latitude</NFTInfoLabel>
              <NFTInfoValue>{nftToken.lat}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Longitude</NFTInfoLabel>
              <NFTInfoValue>{nftToken.lng}</NFTInfoValue>
            </NFTInfoItem>
            <NFTInfoItem>
              <NFTInfoLabel>Transaction</NFTInfoLabel>
              <NFTInfoValue>
                <EtherscanLink 
                  href={`https://sepolia.etherscan.io/tx/${nftToken.transactionHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </EtherscanLink>
              </NFTInfoValue>
            </NFTInfoItem>
          </NFTInfoGrid>
        </NFTDisplay>
      )}
    </NFTGeneratorWrapper>
  );
};

export default NFTGenerator;