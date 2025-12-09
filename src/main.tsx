import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.tsx'
import CoopWS from './pages/CoopWS.tsx'
import SimpleParser from './pages/SimpleParser.tsx'
import BlocklyEscapeRoom from './pages/BlocklyEscapeRoom.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects/coopws" element={<CoopWS />} />
          <Route path="/projects/simpleparser" element={<SimpleParser />} />
          <Route path="/projects/blockly-escape-room" element={<BlocklyEscapeRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
