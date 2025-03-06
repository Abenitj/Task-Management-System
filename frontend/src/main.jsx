import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store,persister } from "./config/store.jsx";
import { PersistGate } from 'redux-persist/integration/react'; // Ensure to import both store and persistor
import LoadingSpinner from './components/LoadingSpinner.jsx'; // Optional loading spinner component
import SocketProvider from "./config/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persister}>
      <SocketProvider/>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
