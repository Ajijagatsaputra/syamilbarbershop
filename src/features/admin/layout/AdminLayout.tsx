import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminLayout = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // nanti: clear token / cookie
    // localStorage.removeItem("token");

    setShowLogoutDialog(false);
    navigate("/auth/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/10">
        {/* SIDEBAR */}
        <AdminSidebar onLogout={() => setShowLogoutDialog(true)} />

        {/* MAIN */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <header className="bg-card/95 backdrop-blur border-b sticky top-0 z-10">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                    Syamil Dashboard
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Manage your barbershop operations
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="hidden lg:flex"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto px-6 py-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* LOGOUT DIALOG */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              Konfirmasi Logout
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin keluar dari dashboard admin?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Batal
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Ya, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default AdminLayout;
