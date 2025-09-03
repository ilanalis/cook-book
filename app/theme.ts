import { createTheme } from "@mui/material/styles";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      dark: "#ffffff",
      contrastText: "#000000",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          "&.MuiButton-contained": {
            backgroundColor: "#ffffff",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          },
          "&.MuiButton-text": {
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          marginBottom: "16px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&:before": {
            borderBottom: "1px solid rgba(255,255,255,0.4)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "1px solid #fff",
          },
          "&:after": {
            borderBottom: "2px solid #fff",
          },
        },
        input: {
          color: "#fff",
          "&::placeholder": {
            color: "rgba(255,255,255,0.7)",
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.85)",
          "&.Mui-focused": {
            color: "#fff",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#ffe0e0",
        },
      },
    },
  },
});

export default myTheme;
