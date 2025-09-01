import { useAuthContext } from "../auth/authContext.jsx";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminApp from "./admin/AdminApp.jsx";

export default function AdminGate() {
  const { isAdmin, loginWithCredentials, loading } = useAuthContext();
  const [form, setForm] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return <div className="view"><p>Loading…</p></div>;
  if (isAdmin) return <AdminApp />;

  function submit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    setTimeout(() => {
      const res = loginWithCredentials(form.user.trim(), form.pass);
      if (!res.ok) {
        setError("Invalid credentials");
        setSubmitting(false);
      } else {
        // Only redirect if exactly /admin; if user requested deeper path keep it
        if (location.pathname === "/admin") {
          navigate("/admin/dashboard", { replace: true });
        }
      }
    }, 200);
  }

  return (
    <div className="view admin-login-view">
      <h2>Admin Access</h2>
      <form onSubmit={submit} className="auth-form">
        <label className="field">
          <span>Username</span>
          <input
            value={form.user}
            onChange={e => setForm(f => ({ ...f, user: e.target.value }))}
            placeholder="admin"
            autoFocus
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={form.pass}
            onChange={e => setForm(f => ({ ...f, pass: e.target.value }))}
            placeholder="admin"
          />
        </label>
        {error && <p className="error-msg">{error}</p>}
        <button className="btn tiny" disabled={submitting}>
          {submitting ? "Checking…" : "Login"}
        </button>
        <p className="hint">Use admin / admin</p>
      </form>
    </div>
  );
}