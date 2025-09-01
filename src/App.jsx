import { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import AuthButton from "./components/AuthButton.jsx";
import Browse from "./views/Browse.jsx";
import AdminPanel from "./views/AdminPanel.jsx";

export default function App() {
  const [view, setView] = useState("browse"); // 'browse' | 'admin'
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <h1 className="logo">Services List Colombia</h1>
        <NavBar current={view} onChange={setView} />
        <AuthButton
          loggedIn={loggedIn}
            onLogin={() => setLoggedIn(true)}
            onLogout={() => setLoggedIn(false)}
        />
      </header>

      <main className="main-area">
        {view === "browse" && <Browse />}
        {view === "admin" && (
          loggedIn ? (
            <AdminPanel />
          ) : (
            <div className="locked">
              <p>You must sign in to access the Admin Panel.</p>
            </div>
          )
        )}
      </main>

      <footer className="site-footer">
        <small>&copy; {new Date().getFullYear()} Services List MVP</small>
      </footer>
    </div>
  );
}