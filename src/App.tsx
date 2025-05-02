import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./ui/layouts/BaseLayout";
import SidebarLayout from "./ui/layouts/SidebarLayout";
import LandingPage from "./ui/pages/LandingPage";
import CreateContentRequestPage from "./ui/pages/CreateContentRequestPage";
import ContentRequestPage from "./ui/pages/ContentRequestPage";
import GeneratedContentPage from "./ui/pages/GeneratedContentPage";
import CognitoAuthProvider from "./context/CognitoAuthProvider";
import NavigateToCreate from "./ui/components/NavigateToCreate";
import { SWRConfig } from "swr";
import { swrConfig } from "./config/swrConfig";
import { ServiceProvider } from "./context/ServiceProvider";
import { useCognitoAuth } from "./hooks/useCognitoAuth";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function App() {
  return (
    <SWRConfig value={swrConfig}>
      <CognitoAuthProvider>
        <ServiceProvider>
          <AppRouter />
        </ServiceProvider>
      </CognitoAuthProvider>
    </SWRConfig>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route
          element={
            <RequireAuth>
              <BaseLayout />
            </RequireAuth>
          }
        >
          <Route path="gc/:id" element={<GeneratedContentPage />} />
        </Route>

        <Route
          element={
            <RequireAuth>
              <SidebarLayout />
            </RequireAuth>
          }
        >
          <Route path="create" element={<CreateContentRequestPage />} />
          <Route path="cr/:id" element={<ContentRequestPage />} />
        </Route>

        <Route path="*" element={<NavigateToCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = useCognitoAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      const manualSignout = sessionStorage.getItem("manualSignout") === "1";
      if (manualSignout) {
        sessionStorage.removeItem("manualSignout");
      } else {
        auth.signinRedirect();
      }
    }
  }, [auth]);

  if (auth.isLoading) {
    return (
      <div className="p-2">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return auth.isAuthenticated ? children : null;
}
