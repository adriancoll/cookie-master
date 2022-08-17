import "../styles/globals.css";

import type { AppContext, AppProps } from "next/app";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { customTheme, darkTheme, lightTheme } from "../themes";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Theme } from "@mui/system";

const themes = {
  dark: darkTheme,
  light: lightTheme,
  custom: customTheme,
};

export type Themes = "light" | "dark" | "custom";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const cookieTheme = (Cookies.get("theme") as Themes) || "light";
    setCurrentTheme(themes[cookieTheme]);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const validThemes = ["light", "dark", "custom"];

//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: "light" };

//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   };
// };

export default MyApp;
