import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Auth0Provider>
    </React.StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
