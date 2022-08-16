import "../styles/globals.css";

import type { AppContext, AppProps } from "next/app";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { darkTheme, lightTheme } from "../themes";

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const cookies = appContext.ctx.req ? (appContext.ctx.req.cookies as any) : { theme: "light" };

  return {};
};

export default MyApp;
