import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Pages/App.jsx'
import './index.css'
import DataContextProvider from './context/DataContext.jsx'
import "./i18n"


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DataContextProvider>
        <App />
      </DataContextProvider>
  </StrictMode>,
)
