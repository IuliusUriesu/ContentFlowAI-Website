import { Outlet } from "react-router";
import TopNavigationBar from "../components/TopNavigationBar";

export default function AppLayout() {
  return (
    <div className="app-container">
      <TopNavigationBar />

      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
}
