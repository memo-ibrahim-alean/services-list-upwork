import { useAuthContext } from "../auth/authContext.jsx";

export default function AdminDashboard() {
  const { user, logout } = useAuthContext();
  return (
    <div className="view admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome {user?.name}. You are now authenticated.</p>
      <button className="btn tiny outline" onClick={logout}>Logout</button>
    </div>
  );
}