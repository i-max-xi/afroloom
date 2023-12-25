import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store';
import { Provider } from 'react-redux';
// import MobileDevicePrompt from './Pages/MobileDevicePrompt';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Redux/store';

// const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* {isMobileDevice ? <MobileDevicePrompt /> : <App />} */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
