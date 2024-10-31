import React  from 'react';
import { RhinoProvider } from '../context';
import './app.css';
import { theme } from './theme';
import Routers from './Routers';
import Layout from '../layouts';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <RhinoProvider>
          <BrowserRouter>
            <Layout>
              <Routers />
            </Layout>
          </BrowserRouter>
        </RhinoProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
