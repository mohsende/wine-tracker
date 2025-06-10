import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WineTracker from './WineTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WineTracker />
    {/* <App /> */}
  </StrictMode>,
)
