import { Outlet } from "react-router-dom";
import { useAuthContext } from "../auth/authContext.jsx";

export default function Layout() {
  const { isAdmin, logout } = useAuthContext();

  return (
    <div className="app-shell">
      <header className="site-header minimalist">
        <div className="logo-text">Services List Colombia</div>
        {isAdmin && (
          <div className="admin-session">
            <button className="btn tiny outline" onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      <main className="main-area">
        <Outlet />
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Services List MVP
      </footer>
    </div>
  );
}