import { Link, useLocation } from "react-router";
import ErrorWithRetry from "./ErrorWithRetry";
import SpinningLoader from "./SpinningLoader";
import { useContentRequests } from "../../hooks/useContentRequests";

export default function ContentRequestSidebarList() {
  const location = useLocation();

  const { contentRequests, isLoading, error, retry } = useContentRequests();

  if (isLoading) {
    return <SpinningLoader />;
  }

  if (error) {
    return <ErrorWithRetry errorMessage={error} onRetry={retry} />;
  }

  return (
    <ul className="sidebar-list custom-scrollbar">
      {contentRequests.map((cr) => {
        const to = `/cr/${cr.id}`;
        const isActive = location.pathname === to;
        return (
          <li key={cr.id}>
            <Link
              to={to}
              className={`sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
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
