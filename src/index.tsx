import React from "react";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { store } from "./redux/store";
import FontFamily from "./styles/font";
import GlobalStyle from "./styles/globalStyle";
import baseTheme from "./theme/baseTheme";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider theme={baseTheme}>
          <Helmet>{FontFamily}</Helmet>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
