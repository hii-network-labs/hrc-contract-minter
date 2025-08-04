import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { WalletProvider } from './contexts/WalletContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WalletProvider>
    <App />
  </WalletProvider>
);
