import React from "react";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// core styles are required for all packages
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { theme } from "./components/stepper/Stepper";
import { ContextProvider } from "./context/ContextProvider";
import { store } from './redux/store';
import StripeProvider from './StripeProvider';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ContextProvider>
          <StripeProvider>
            <App />
          </StripeProvider>
        </ContextProvider>
        <ToastContainer />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
