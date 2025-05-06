import { Outlet } from "react-router";

export default function SimplePageLayout() {
  return (
    <div className="app-container">
      <main className="flex-grow p-6 overflow-y-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
