import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDataProvider } from "../../state/adminContext.jsx";
import AdminLayout from "./AdminLayout.jsx";
import Overview from "./sections/Overview.jsx";
import ServicesManager from "./sections/ServicesManager.jsx";
import AuditLog from "./sections/AuditLog.jsx";
import Settings from "./sections/Settings.jsx";
import { ToastProvider } from "../../components/toast/ToastContext.jsx";
import "../../styles/admin.css";

export default function AdminApp() {
  return (
    <ToastProvider>
      <AdminDataProvider>
        <AdminLayout>
          <Routes>
            {/* Redirect only for the bare /admin */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Overview />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="audit" element={<AuditLog />} />
            <Route path="settings" element={<Settings />} />

            {/* Fallback uses ABSOLUTE path to stop compounding */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </AdminLayout>
      </AdminDataProvider>
    </ToastProvider>
  );
}