import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import AddressInput from './components/AddressInput';
import Map from './components/Map';
import NFTGenerator from './components/NFTGenerator';
import GlobalStyles, { darkTheme } from './styles/GlobalStyles';
import AnimatedTitle from './components/AnimatedTitle';

const AppWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  min-height: 100px;
  position: relative;
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
`;

const App = () => {
  const [selected, setSelected] = useState(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppWrapper>
        <GlobalStyles />
        <AnimatedTitle text="Address NFT Generator" />
        <ContentWrapper>
          <InputWrapper>
            <AddressInput setSelected={setSelected} />
          </InputWrapper>
          <MapWrapper>
            <Map selected={selected} />
          </MapWrapper>
          <NFTGenerator selected={selected} />
        </ContentWrapper>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
