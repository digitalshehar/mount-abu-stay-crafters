
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

// Configure root element for responsive layout
if (rootElement) {
  rootElement.style.width = "100%";
  rootElement.style.height = "100%";
  rootElement.style.margin = "0";
  rootElement.style.padding = "0";
  rootElement.style.overflow = "hidden"; // Prevent horizontal scrollbar
  
  // Add viewport meta tag dynamically for better mobile support
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  document.head.appendChild(viewport);
}

createRoot(rootElement!).render(<App />);
