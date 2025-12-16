import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Settings,
  Moon,
  Bell,
  Shield,
  User,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow">
          <Settings className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your application preferences
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ================= GENERAL ================= */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-500" />
            <h2 className="font-semibold text-lg">General</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Application Name</label>
              <Input defaultValue="Syamil Barbershop" />
            </div>

            <div>
              <label className="text-sm font-medium">Admin Email</label>
              <Input type="email" defaultValue="admin@syamil.com" />
            </div>

            <Button className="mt-2">Save Changes</Button>
          </div>
        </Card>

        {/* ================= APPEARANCE ================= */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="h-5 w-5 text-purple-500" />
            <h2 className="font-semibold text-lg">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Toggle dark or light theme
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compact Sidebar</p>
                <p className="text-xs text-muted-foreground">
                  Reduce sidebar width
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* ================= NOTIFICATIONS ================= */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-green-500" />
            <h2 className="font-semibold text-lg">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">New Appointment</p>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <p className="font-medium">Cancelled Appointment</p>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <p className="font-medium">Daily Summary</p>
              <Switch />
            </div>
          </div>
        </Card>

        {/* ================= SECURITY ================= */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-red-500" />
            <h2 className="font-semibold text-lg">Security</h2>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>

            <Button
              variant="outline"
              className="w-full hover:bg-red-500/10 hover:text-red-600"
            >
              Logout All Sessions
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
