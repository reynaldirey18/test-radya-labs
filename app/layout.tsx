/* eslint-disable */

"use client";

import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Switch, FormControlLabel, AppBar, Typography } from "@mui/material";
import "./globals.css";
import { Provider } from "./provider";
import { lightTheme, darkTheme } from "./theme";
import { useState } from "react";
import StoreProvider from "./storeProvide";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const selectedTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <Provider>
          <StoreProvider>
            <ThemeProvider theme={selectedTheme}>
              <body className={isDarkMode ? "dark" : "light"}>
                <AppBar
                  position="static"
                  color="inherit"
                  enableColorOnDark
                  className="mb-5 py-4"
                >
                  <div className="flex justify-between items-center px-4">
                    <Typography gutterBottom variant="h5" component="span">
                      {" "}
                      Reynaldi Rangga Prayuda{" "}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isDarkMode}
                          onChange={toggleDarkMode}
                          name="darkModeSwitch"
                          inputProps={{ "aria-label": "toggle dark mode" }}
                        />
                      }
                      label={isDarkMode ? "Dark Mode" : "Light Mode"}
                    />
                  </div>
                </AppBar>
                {children}
              </body>
            </ThemeProvider>
          </StoreProvider>
        </Provider>
      </AppRouterCacheProvider>
    </html>
  );
}
