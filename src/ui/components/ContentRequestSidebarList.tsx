import { Link, useLocation } from "react-router";
import { useContentRequestsStore } from "../../hooks/useContentRequestsStore";
import { Loader, RefreshCw } from "lucide-react";

export default function ContentRequestSidebarList() {
  const location = useLocation();
  const { state, fetchContentRequests } = useContentRequestsStore();
  const { items, loading, error } = state;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="animate-spin" size={24} />
      </div>
    );
  }

  if (error) {
    const handleRetry = () => {
      fetchContentRequests();
    };

    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-2 px-4 text-center">
        <span className="text-[var(--color-error)]">{error}</span>
        <button onClick={handleRetry} className="retry-button" title="Retry">
          <RefreshCw className="w-6 h-6 text-[var(--color-error)]" />
        </button>
      </div>
    );
  }

  return (
    <ul className="sidebar-list">
      {items.map((cr) => {
        const parts = cr.id.split("#");
        const uuid = parts[parts.length - 1];
        const to = `/cr/${uuid}`;
        const isActive = location.pathname === to;
        return (
          <li key={cr.id}>
            <Link
              to={to}
              className={`sidebar-item ${
                isActive ? "sidebar-item-active" : ""
              }`}
              title={cr.conciseIdeaContext}
            >
              {cr.conciseIdeaContext}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
