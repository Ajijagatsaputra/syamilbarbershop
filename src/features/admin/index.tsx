import { Navigate, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import DashboardPage from "./dashboard/DashboardPage";
import AppointmentsPage from "./appointments/AppointmentsPage";
import CustomersPage from "./customers/CustomersPage";
import ServicesPage from "./services/ServicesPage";
import AnalyticsPage from "./analytics/AnalyticsPage";
import SettingsPage from "./settings/SettingsPage";
import ProfilePage from "./profiles/ProfilePage";

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="appointments" element={<AppointmentsPage />} />
    <Route path="customers" element={<CustomersPage />} />
    <Route path="services" element={<ServicesPage />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="profile" element={<ProfilePage/>} />
  </Route>
);
