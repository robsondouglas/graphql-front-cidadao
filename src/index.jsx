import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import App from './app/App';

// third party style
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import './index.css';
import "react-image-gallery/styles/css/image-gallery.css";


const root = createRoot(document.getElementById('root'));

root.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyledEngineProvider>
);

  