import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Popup'
import './index.css'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
