import { createTheme } from "@mui/material";
import { cyan, red } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#8D0333",
      dark: "#5A021F",
      light: red[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: "#ffffff",
    },
    background: {
      default: "#f7f6f3",
      paper: "#ffffff",
    },
  },
});
