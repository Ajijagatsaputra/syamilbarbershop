import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Scissors } from "lucide-react";

<Sidebar className="border-r border-border/40 bg-card/95 backdrop-blur">
  <SidebarHeader className="border-b border-border/40 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
    <div className="flex items-center gap-3 px-4 py-4">
      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
        <Scissors className="h-5 w-5 text-white" />
      </div>
      <div>
        <h2 className="font-bold text-sm tracking-wide">SYAMIL</h2>
        <p className="text-xs text-muted-foreground">Admin Panel</p>
      </div>
    </div>
  </SidebarHeader>

  <SidebarContent className="px-2">
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3">
        MAIN MENU
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.value}>
              <SidebarMenuButton
                onClick={() => setActiveTab(item.value)}
                isActive={activeTab === item.value}
                className={`transition-all duration-200 ${
                  activeTab === item.value
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 hover:bg-amber-500/20"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    <SidebarGroup className="mt-4">
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3">
        SETTINGS
      </SidebarGroupLabel>
      <SidebarGroupContent className="mt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-muted">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => (window.location.href = "/")}
              className="hover:bg-muted"
            ></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>

  <SidebarFooter className="border-t border-border/40 p-2">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setShowLogoutDialog(true)}
          className="hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-500 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Logout</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>;
