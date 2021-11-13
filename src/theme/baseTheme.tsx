import { DefaultTheme } from "styled-components";

const baseTheme: DefaultTheme = {
  colors: {
    background: "#FEF5ED",
    button: {
      primary: {
        base: "#94DAFF",
        hovered: "#94B3FD",
      },
    },
    text: {
      primary: "#191A19",
      gray: "#808080",
      error: {
        base: "#ff4646",
        hovered : "#da0000",
      }
    },
    table: {
      hover: "#e4c7ae68",
    },
  },
};

export default baseTheme;
