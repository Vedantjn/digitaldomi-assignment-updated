import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  background: '#1a1a1a',
  text: '#ffffff',
  title: '#ffffff',
  button: '#4a90e2',
  buttonText: '#ffffff',
  buttonHover: '#357abd',
  card: '#2c2c2c',
  cardBorder: '#444444',
  accent: '#61dafb',
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', Arial, sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  .mapboxgl-ctrl-geocoder {
    width: 100% !important;
    max-width: 400px !important;
    font-size: 15px;
    line-height: 20px;
    border-radius: 4px;
    background-color: ${props => props.theme.card};
    color: ${props => props.theme.text};
  }

  .mapboxgl-ctrl-geocoder--input {
    color: white !important;
  }

  .mapboxgl-ctrl-geocoder--suggestion {
    color: black !important; 
    background-color: white !important; 
  }

  .mapboxgl-ctrl-geocoder--suggestion-title {
    color: black !important;
  }

  .mapboxgl-ctrl-geocoder--suggestion-address {
    color: black !important;
  }

  .mapboxgl-canvas {
    left: 0;
  }

  .mapboxgl-ctrl-logo {
    display: none !important;
  }

  .mapboxgl-ctrl-attrib-inner {
    display: none;
  }

  /* 3D Animation Styles */
  canvas {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: pixelated;
    image-rendering: optimize-contrast;
  }

  .nft-animation-container {
    position: relative;
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 12px;
  }

  .nft-animation-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, ${props => props.theme.card});
    pointer-events: none;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.accent};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.buttonHover};
  }
`;

export default GlobalStyles;