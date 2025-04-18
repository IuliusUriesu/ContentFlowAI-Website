import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CognitoAuthProvider } from "./context/CognitoAuthContext";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import CreateContentRequestPage from "./pages/CreateContentRequestPage";
import ContentRequestPage from "./pages/ContentRequestPage";
import GeneratedContentPage from "./pages/GeneratedContentPage";

export default function App() {
  return (
    <CognitoAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="create" element={<CreateContentRequestPage />} />
            <Route path="cr/:id" element={<ContentRequestPage />} />
            <Route path="gc/:id" element={<GeneratedContentPage />} />
            <Route path="*" element={<Navigate to="/create" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CognitoAuthProvider>
  );
}
