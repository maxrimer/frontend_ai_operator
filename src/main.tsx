import './mocks';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { WithAllProviders } from './providers/WithAllProviders';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WithAllProviders>
    <App />
  </WithAllProviders>
);
