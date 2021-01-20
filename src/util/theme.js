import { createMuiTheme } from "@material-ui/core";
import { orange, yellow, deepOrange, grey } from "@material-ui/core/colors";

const themeType = {
  dark: {
    palette: {
      type: "dark",
      primary: {
        light: orange[300],
        main: orange[500],
        dark: orange[700],
      },
      secondary: {
        light: yellow[300],
        main: yellow[500],
        dark: yellow[700],
      },
      info:{
        light: yellow[300],
        main: yellow[500],
        dark: yellow[700],  
      },
      background: {
        paper: "rgba(255,255,255,.2)",
      },
    },
  },
  light: {
    palette: {
      type: "light",
      primary: deepOrange,
      secondary: grey,
      background:{
        paper:"rgba(255,255,255,.5)"
      }
    },
  },
};

const theme = (type) => createMuiTheme({ ...themeType[type] });
export default theme;
