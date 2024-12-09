import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Redux/store';
import DesktopDevicePrompt from './Pages/DesktopDevicePrompt';

import { ProgressSpinner } from 'primereact/progressspinner';
        

const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isMobileDevice ?  
        <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div> 
        : <DesktopDevicePrompt /> }
        {/* {isMobileDevice ? <App /> : <DesktopDevicePrompt /> } */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
