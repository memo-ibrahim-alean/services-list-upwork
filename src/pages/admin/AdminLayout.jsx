import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth/authContext.jsx";

export default function AdminLayout({ children }) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Admin</div>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className="a-nav" end>Dashboard</NavLink>
          <NavLink to="/admin/services" className="a-nav">Services</NavLink>
            <NavLink to="/admin/audit" className="a-nav">Audit Log</NavLink>
          <NavLink to="/admin/settings" className="a-nav">Settings</NavLink>
        </nav>
        <div className="admin-side-bottom">
          <button className="btn tiny outline" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}