import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { lightTheme } from "./theme";
import KeyCloakService from "./security/keycloakService";

const container = document.getElementById("root")!;
const root = createRoot(container);

const renderApp=()=>
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
KeyCloakService.CallLogin(renderApp);