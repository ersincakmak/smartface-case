import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      table: {
        hover: string;
      };
      text: {
        primary: string;
        gray: string;
        error: string;
      };
      button: {
        primary: {
          base: string;
          hovered: string;
        };
      };
    };
  }
}
