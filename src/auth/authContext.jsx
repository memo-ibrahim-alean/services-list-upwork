import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from storage (simple persistence)
  useEffect(() => {
    const stored = localStorage.getItem("demo_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch (_) {}
    }
    setLoading(false);
  }, []);

  function loginAsAdmin() {
    const u = { id: "A1", name: "Admin User", roles: ["admin"] };
    localStorage.setItem("demo_user", JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem("demo_user");
    setUser(null);
  }

  // New: credential check (hard‑coded)
  function loginWithCredentials(username, password) {
    // For now only accept admin/admin
    if (username === "admin" && password === "admin") {
      loginAsAdmin();
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials" };
  }

  const value = {
    user,
    roles: user?.roles ?? [],
    isAdmin: !!user?.roles?.includes("admin"),
    loading,
    loginWithCredentials,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}