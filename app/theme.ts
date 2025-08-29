import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const amberTheme = createTheme({
  palette: {
    primary: {
      main: "#c62828",
      dark: "#8e0000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: orange[200],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#8e0000",
          },
          borderRadius: "8px",
        },
      },
    },
  },
});

export default amberTheme;
