import { Navigate, Outlet } from "react-router";
import { useUserProfileCheckExistence } from "../../hooks/useUserProfileCheckExistence";
import ErrorWithRetry from "../components/ErrorWithRetry";
import SpinningLoader from "../components/SpinningLoader";
import { config } from "../../config/config";

export default function RequireProfile() {
  const { profileExists, isLoading, error, retry } = useUserProfileCheckExistence();

  return (
    <div className="h-screen">
      <title>{config.appTitle}</title>

      {isLoading ? (
        <SpinningLoader />
      ) : error ? (
        <ErrorWithRetry errorMessage={error} onRetry={retry} />
      ) : profileExists ? (
        <Outlet />
      ) : (
        <Navigate to="/profile-setup/1" replace />
      )}
    </div>
  );
}
