import { BrowserRouter, Routes, Route } from "react-router";
import NavigateToCreate from "../components/NavigateToCreate";
import SidebarLayout from "../layouts/SidebarLayout";
import SimplePageLayout from "../layouts/SimplePageLayout";
import TopNavBarLayout from "../layouts/TopNavBarLayout";
import ContentRequestPage from "../pages/ContentRequestPage";
import CreateContentRequestPage from "../pages/CreateContentRequestPage";
import GeneratedContentPage from "../pages/GeneratedContentPage";
import LandingPage from "../pages/LandingPage";
import ProfileSetupPage from "../pages/ProfileSetupPage";
import RequireAuth from "./RequireAuth";
import SigninCallback from "./SigninCallback";
import RequireProfile from "./RequireProfile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<RequireAuth />}>
          <Route path="signin-callback" element={<SigninCallback />} />

          <Route element={<SimplePageLayout />}>
            <Route path="profile-setup/:step" element={<ProfileSetupPage />} />
          </Route>

          <Route element={<RequireProfile />}>
            <Route element={<TopNavBarLayout />}>
              <Route path="gc/:id" element={<GeneratedContentPage />} />
            </Route>

            <Route element={<SidebarLayout />}>
              <Route path="create" element={<CreateContentRequestPage />} />
              <Route path="cr/:id" element={<ContentRequestPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NavigateToCreate />} />
      </Routes>
    </BrowserRouter>
  );
}
