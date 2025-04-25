import { Link, useLocation } from "react-router";
import { useContentRequestsStore } from "../../hooks/useContentRequestsStore";
import ErrorWithRetry from "./ErrorWithRetry";
import SpinningLoader from "./SpinningLoader";

export default function ContentRequestSidebarList() {
  const location = useLocation();
  const { state, fetchContentRequests } = useContentRequestsStore();
  const { contentRequests, fetchLoading, fetchError } = state;

  if (fetchLoading) {
    return <SpinningLoader />;
  }

  if (fetchError) {
    return (
      <ErrorWithRetry
        errorMessage={fetchError}
        handleRetry={() => fetchContentRequests()}
      />
    );
  }

  return (
    <ul className="sidebar-list custom-scrollbar">
      {contentRequests.map((cr) => {
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
