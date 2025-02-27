import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx';
import { PermissionProvider } from './context/PermissionContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PermissionProvider>

        <StrictMode>
          <App />
        </StrictMode>
      </PermissionProvider>
    </AuthProvider>
  </BrowserRouter>
)
