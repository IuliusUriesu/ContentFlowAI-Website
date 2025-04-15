import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CognitoAuthProvider } from "./context/CognitoAuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CognitoAuthProvider>
      <App />
    </CognitoAuthProvider>
  </StrictMode>
);
