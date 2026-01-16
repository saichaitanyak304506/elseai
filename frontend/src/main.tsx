import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Theme ,ThemePanel} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";

import AiContextProvider from "./context/AiContextProvider";
import AuthGate from "./auth/AuthGate";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme appearance="inherit" accentColor="indigo">
        <AiContextProvider>
          <AuthGate />
        </AiContextProvider>
        {/* <ThemePanel/> */}
      </Theme>
    </BrowserRouter>
  </React.StrictMode>
);
