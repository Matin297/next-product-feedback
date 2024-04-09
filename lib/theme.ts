"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { teal, amber } from "@mui/material/colors";
import LinkBehavior from "@/components/link-behavior";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: teal,
    secondary: amber,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButton: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default theme;
