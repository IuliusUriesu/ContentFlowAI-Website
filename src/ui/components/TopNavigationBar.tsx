import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useCognitoAuth } from "../../hooks/useCognitoAuth";

export default function TopNavigationBar() {
  const auth = useCognitoAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const userName = auth.user?.profile.name;

  const initials =
    userName
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "";

  return (
    <nav className="nav-bar">
      <Link to="/" target="_blank" className="app-title">
        ContentFlowAI
      </Link>

      <div className="relative">
        {auth.isAuthenticated ? (
          <>
            <button onClick={toggleMenu} className="user-button">
              <div className="user-avatar">{initials}</div>
              <span>{userName}</span>
              <ChevronDown className="user-dropdown-icon" />
            </button>

            {isMenuOpen && (
              <div className="user-dropdown-menu">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    auth.customSignOutRedirect();
                  }}
                  className="user-dropdown-item signout-button"
                >
                  <span>Sign Out</span>
                  <LogOut className="signout-icon" />
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => auth.signinRedirect()}
            className="primary-button"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
