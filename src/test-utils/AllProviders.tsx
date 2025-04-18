import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { appStore } from "../app/store";

const theme = createTheme();

export const AllProviders = ({ children }: { children: ReactNode }) => (
  <Provider store={appStore}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);
