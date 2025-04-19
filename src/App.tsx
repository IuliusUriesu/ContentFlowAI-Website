import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CognitoAuthProvider } from "./context/CognitoAuthContext";
import AppLayout from "./ui/layouts/AppLayout";
import LandingPage from "./ui/pages/LandingPage";
import CreateContentRequestPage from "./ui/pages/CreateContentRequestPage";
import ContentRequestPage from "./ui/pages/ContentRequestPage";
import GeneratedContentPage from "./ui/pages/GeneratedContentPage";
import { ServiceProvider } from "./context/ServiceContext";

export default function App() {
  return (
    <CognitoAuthProvider>
      <ServiceProvider>
        <AppRouter />
      </ServiceProvider>
    </CognitoAuthProvider>
  );
}

function AppRouter() {
  return (
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
  );
}
