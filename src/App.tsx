import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CognitoAuthProvider } from "./context/CognitoAuthContext";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import CreateContentRequestPage from "./pages/CreateContentRequestPage";

function App() {
  return (
    <CognitoAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="create" element={<CreateContentRequestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CognitoAuthProvider>
  );
}

export default App;
