import { Link, useLocation } from "react-router";
import ContentRequestSidebarList from "./ContentRequestSidebarList";
import { Pencil } from "lucide-react";

export default function ContentRequestSidebar() {
  const location = useLocation();
  const isCreateLinkActive = location.pathname === "/create";

  return (
    <nav className="sidebar">
      <Link
        to="/create"
        className={`flex items-center space-x-2  sidebar-item ${
          isCreateLinkActive ? "sidebar-item-active" : ""
        }`}
        title="Create new content"
      >
        <Pencil className="w-5 h-5 text-[var(--color-text)]" />
        <span className="font-semibold">Create...</span>
      </Link>

      <hr className="border-t-2 border-[var(--color-border)] my-2" />

      <ContentRequestSidebarList />
    </nav>
  );
}
