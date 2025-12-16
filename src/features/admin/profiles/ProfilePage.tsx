import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow">
          <User className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal information
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ================= LEFT - PROFILE CARD ================= */}
        <Card className="p-6 lg:col-span-1 flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className="w-28 h-28">
              <AvatarImage src="https://i.pravatar.cc/300" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>

            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full shadow"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="mt-4 text-lg font-bold">Admin Syamil</h2>
          <p className="text-sm text-muted-foreground">
            Super Administrator
          </p>

          <div className="w-full mt-6 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium">Admin</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 text-xs">
                Active
              </span>
            </div>
          </div>
        </Card>

        {/* ================= RIGHT - FORM ================= */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">
            Personal Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium flex items-center gap-1">
                <User className="h-4 w-4" />
                Full Name
              </label>
              <Input defaultValue="Admin Syamil" />
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input type="email" defaultValue="admin@syamil.com" />
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Phone
              </label>
              <Input defaultValue="+62 812 3456 7890" />
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Role
              </label>
              <Input defaultValue="Administrator" disabled />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
