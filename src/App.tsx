import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import BaseLayout from "./ui/layouts/BaseLayout";
import SidebarLayout from "./ui/layouts/SidebarLayout";
import LandingPage from "./ui/pages/LandingPage";
import CreateContentRequestPage from "./ui/pages/CreateContentRequestPage";
import ContentRequestPage from "./ui/pages/ContentRequestPage";
import { CognitoAuthProvider } from "./context/CognitoAuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import { ContentRequestsStoreProvider } from "./context/ContentRequestsStoreContext";

export default function App() {
  return (
    <CognitoAuthProvider>
      <ServiceProvider>
        <ContentRequestsStoreProvider>
          <AppRouter />
        </ContentRequestsStoreProvider>
      </ServiceProvider>
    </CognitoAuthProvider>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<SidebarLayout />}>
          <Route path="create" element={<CreateContentRequestPage />} />
          <Route path="cr/:id" element={<ContentRequestPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
