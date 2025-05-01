import { Outlet } from "react-router";
import TopNavigationBar from "../components/TopNavigationBar";
import ContentRequestSidebar from "../components/ContentRequestSidebar";

export default function SidebarLayout() {
  return (
    <div className="app-container">
      <TopNavigationBar />

      <div className="flex flex-1 overflow-hidden">
        <ContentRequestSidebar />

        <main className="flex-grow p-6 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
