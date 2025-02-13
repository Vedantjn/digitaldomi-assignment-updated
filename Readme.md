# Address NFT Generator

A React application that generates NFTs based on address input. We don't want to use any external wallet and and have to do it in the backend.

Here are some screenshots of the application:


![Demo](https://drive.google.com/drive/folders/1Wx7Kyq9nDbRz3aaWjF77IkkGdDRFg72l)

![Home Page](./frontend/public/screenshot1.png)
*Home page of the Address NFT Generator*

![Map View](./frontend/public/screenshot2.png)
*Map view after entering an address*

![NFT Generation](./frontend/public/screenshot3.png)
*NFT generation process*

![Etherscan](./frontend/public/screenshot4.png)
*Etherscan*


## Introduction

This project is an Address NFT Generator that allows users to input an address, view it on a map, and generate an NFT based on that address. It utilizes React, styled-components, Framer Motion, and Mapbox for a seamless and interactive user experience.

## Instructions

1. Clone this repository.
2. Ensure you have Node.js installed (version 14 or higher recommended).
3. Run `npm install` to install dependencies.
4. Create a `.env` file in the root directory and add your Mapbox API key:
    - INFURA_PROJECT_ID=
    - PRIVATE_KEY=
    - REACT_APP_MAPBOX_ACCESS_TOKEN=
    - REACT_APP_API_URL=http://localhost:3001
    - PORT=3000
5. Run `npm start` to start the development server.
6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Build Commands

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Removes the single build dependency from your project.

## Hardhat Smart Contract Commands

This project uses Hardhat for smart contract development, testing, and deployment. Here are the key Hardhat commands:

1. Compile contracts:
    npx hardhat compile
2. Deploy contracts to local network:
    npx hardhat run scripts/deploy.js --network sepolia
3. Verify contract on Etherscan (replace with your contract address and constructor arguments):

Note: Make sure to configure your `hardhat.config.js` file with the appropriate network settings and API keys before deploying to testnets or mainnet.

## Project Structure

- `contracts/`: Contains Solidity smart contracts
- `scripts/`: Contains deployment and interaction scripts
- `test/`: Contains test files for smart contracts
- `hardhat.config.js`: Hardhat configuration file

## Environment Setup

- Node.js: v14.0.0 or higher
- React: v17.0.2 or higher
- styled-components: v5.3.0 or higher
- framer-motion: v4.1.17 or higher
- mapbox-gl: v2.9.1 or higher
- @mapbox/mapbox-gl-geocoder: v5.0.0 or higher

Make sure to set up your Mapbox access token in the `.env` file as mentioned in the instructions.

## Features

1. Address input with autocomplete using Mapbox Geocoder
2. Map display of the selected address
3. NFT generation based on the address (uses deployed contract's address)
4. Responsive design for various screen sizes
5. Dark theme with customizable styling

## Dependencies

- React
- styled-components
- Framer Motion
- Mapbox GL JS
- Mapbox GL Geocoder

## Additional Notes

- The Mapbox integration requires a valid access token. Make sure to replace the placeholder token with your own in the `.env` file.
- The NFT generation feature in the NFTGenerator component uses the address of the deployed smart contract. Ensure this address is correctly set in the component.
