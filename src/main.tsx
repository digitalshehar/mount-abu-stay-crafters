
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

// Ensure the root element has the right styling for full width
if (rootElement) {
  rootElement.style.width = "100%";
  rootElement.style.margin = "0";
  rootElement.style.padding = "0";
  rootElement.style.overflow = "hidden"; // Prevent horizontal scrollbar
}

createRoot(rootElement!).render(<App />);
