import { Outlet } from "react-router";
import TopNavigationBar from "../components/TopNavigationBar";

export default function BaseLayout() {
  return (
    <div className="app-container">
      <TopNavigationBar />

      <main className="flex-grow p-6 custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
