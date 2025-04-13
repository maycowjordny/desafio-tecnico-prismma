import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#FDE8E8",
      main: "#F35E5E",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FCE4EC",
    },
    background: {
      default: "#F8F9FA",
      paper: "#ffffff",
    },
    text: {
      primary: "#020817",
      secondary: "#757575",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 700,
      lineHeight: "1.5rem",
      fontSize: "1.5rem",
    },
    h3: {
      fontWeight: 400,
      lineHeight: "1.5rem",
      fontSize: "1rem",
    },

    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
