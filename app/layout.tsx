/* eslint-disable */

"use client";

import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Switch, FormControlLabel } from "@mui/material";
import "./globals.css";
import { Provider } from "./provider";
import { lightTheme, darkTheme } from "./theme";
import { useState } from "react";

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
          <ThemeProvider theme={selectedTheme}>
            <body className={isDarkMode ? "dark" : "light"}>
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
              {children}
            </body>
          </ThemeProvider>
        </Provider>
      </AppRouterCacheProvider>
    </html>
  );
}
