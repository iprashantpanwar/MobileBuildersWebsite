import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivacyPage } from "./pages/PrivacyPage";
import "./styles/fonts";
import "./styles/tokens.css";
import "./styles/base.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
);
