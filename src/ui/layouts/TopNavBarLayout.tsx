import { Outlet } from "react-router";
import TopNavigationBar from "../components/TopNavigationBar";

export default function TopNavBarLayout() {
  return (
    <div className="app-container">
      <TopNavigationBar />

      <main className="flex-grow p-6 overflow-y-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
