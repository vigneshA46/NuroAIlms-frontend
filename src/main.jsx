import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProvider>
      <Toaster position="top-right" reverseOrder={false} />
    <App />
    </StudentProvider>
  </StrictMode>,
)
