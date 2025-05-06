import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CustomThemeProvider } from './context/ThemeContext'; // ✅ Import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomThemeProvider>   {/* ✅ Wrap App in Theme Provider */}
      <App />
    </CustomThemeProvider>
  </StrictMode>,
);