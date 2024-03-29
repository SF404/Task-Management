import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider, theme } from '@chakra-ui/react'
import AppRoutes from './AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  </React.StrictMode>
);

