import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const amberTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9800",
      dark: "#ef6c00",
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
            backgroundColor: "#ef6c00",
          },
        },
      },
    },
  },
});

export default amberTheme;
