import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Routers } from './routes';
import theme from './utils/theme';
import * as serviceWorker from './serviceWorker';
import { LoadingProvider } from './hooks/useLoading';

function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // on document refresh
  window.addEventListener('load', () => {
    const googleTranslateIframe = document.querySelectorAll('iframe.skiptranslate');
    for (let i = 0; i < googleTranslateIframe.length; i += 1) {
      googleTranslateIframe[i].style.display = 'none';
    }
  });

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme, ...theme
        }}
      >
        <Notifications />
        <LoadingProvider>
          <Routers />
        </LoadingProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

serviceWorker.register();
