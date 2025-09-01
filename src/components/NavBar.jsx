export default function NavBar({ current, onChange }) {
  return (
    <nav className="nav-bar">
      <button
        className={current === "browse" ? "active" : ""}
        onClick={() => onChange("browse")}
      >
        Browse
      </button>
      <button
        className={current === "admin" ? "active" : ""}
        onClick={() => onChange("admin")}
      >
        Admin Panel
      </button>
    </nav>
  );
}