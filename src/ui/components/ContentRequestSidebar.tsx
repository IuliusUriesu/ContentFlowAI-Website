import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { ContentRequest } from "../../model/app/ContentRequest";

const contentRequests: ContentRequest[] = [
  {
    id: "abcd-1234",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Focused work",
    conciseIdeaContext: "Focused work",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1235",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Real world business insights",
    conciseIdeaContext:
      "Real world business insights from a million dollar man",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1236",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "$100M Lessons",
    conciseIdeaContext: "$100M Lessons",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1237",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Focused work",
    conciseIdeaContext: "Focused work",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1238",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Real world business insights",
    conciseIdeaContext:
      "Real world business insights from a million dollar man",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1239",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "$100M Lessons",
    conciseIdeaContext: "$100M Lessons",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1240",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Focused work",
    conciseIdeaContext: "Focused work",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1241",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Real world business insights",
    conciseIdeaContext:
      "Real world business insights from a million dollar man",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1242",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "$100M Lessons",
    conciseIdeaContext: "$100M Lessons",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1243",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Focused work",
    conciseIdeaContext: "Focused work",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1244",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Real world business insights",
    conciseIdeaContext:
      "Real world business insights from a million dollar man",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1245",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "$100M Lessons",
    conciseIdeaContext: "$100M Lessons",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1246",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Focused work",
    conciseIdeaContext: "Focused work",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1247",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "Real world business insights",
    conciseIdeaContext:
      "Real world business insights from a million dollar man",
    isRequestProcessed: true,
  },
  {
    id: "abcd-1248",
    contentFormat: "X (formerly Twitter) tweet",
    contentPiecesCount: 5,
    ideaContext: "$100M Lessons",
    conciseIdeaContext: "$100M Lessons",
    isRequestProcessed: true,
  },
];

export default function ContentRequestSidebar() {
  const [requests, setRequests] = useState<ContentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setRequests(contentRequests);
    setLoading(false);
  }, []);

  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        {loading ? (
          <li className="sidebar-loading">Loading…</li>
        ) : (
          requests.map((req) => {
            const to = `/cr/${req.id}`;
            const isActive = location.pathname === to;
            return (
              <li key={req.id}>
                <Link
                  to={to}
                  className={`sidebar-item ${
                    isActive ? "sidebar-item-active" : ""
                  }`}
                  title={req.conciseIdeaContext}
                >
                  {req.conciseIdeaContext}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
}
