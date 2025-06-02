import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/shared/styles/global.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@/shared/styles/theme.ts";
import { Provider as JotaiProvider } from "jotai";
import "@/features/i18n/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </JotaiProvider>
  </StrictMode>
);
