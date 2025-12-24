import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import "./listeners/taskListeners";
import { ToastWrapper } from "./components/ToastWrapper.tsx";
import { TanStackQuery } from "./providers/TanStackQuery.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackQuery>
      <ToastWrapper />
      <App />
    </TanStackQuery>
  </StrictMode>
);
