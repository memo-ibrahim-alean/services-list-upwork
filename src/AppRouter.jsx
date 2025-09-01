import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/authContext.jsx";
import Layout from "./layout/Layout.jsx";
import Browse from "./views/Browse.jsx";
import AdminGate from "./pages/AdminGate.jsx";
import Overview from "./pages/admin/sections/Overview.jsx";
import ServicesManager from "./pages/admin/sections/ServicesManager.jsx";
import AuditLog from "./pages/admin/sections/AuditLog.jsx";
import Settings from "./pages/admin/sections/Settings.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Browse />} />
            <Route path="/admin/*" element={<AdminGate />}>
              {/* AdminGate returns either login form OR an <Outlet /> (if you adjust it).
                  If you keep AdminGate returning AdminApp, skip this nested form. */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}