import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Calendar,
  Users,
  Scissors,
  Home,
  Search,
  LayoutDashboard,
  Settings,
  LogOut,
  BarChart3,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { toast } = useToast();

  // Mock data
  const appointments = [
    { id: 1, customer: "Ahmad Rizki", service: "Classic Haircut", time: "10:00", date: "2024-01-20", status: "confirmed", price: "Rp 50.000" },
    { id: 2, customer: "Budi Santoso", service: "Beard Grooming", time: "11:30", date: "2024-01-20", status: "pending", price: "Rp 35.000" },
    { id: 3, customer: "Candra Wijaya", service: "Premium Package", time: "14:00", date: "2024-01-20", status: "confirmed", price: "Rp 150.000" },
    { id: 4, customer: "Doni Prakoso", service: "Hair Styling", time: "16:00", date: "2024-01-19", status: "completed", price: "Rp 75.000" },
    { id: 5, customer: "Eko Prasetyo", service: "Kids Haircut", time: "09:00", date: "2024-01-20", status: "confirmed", price: "Rp 40.000" },
  ];

  const customers = [
    { id: 1, name: "Ahmad Rizki", email: "ahmad@email.com", phone: "+62 812 3456 7890", visits: 12, lastVisit: "2024-01-15", totalSpent: "Rp 600.000" },
    { id: 2, name: "Budi Santoso", email: "budi@email.com", phone: "+62 821 9876 5432", visits: 8, lastVisit: "2024-01-10", totalSpent: "Rp 400.000" },
    { id: 3, name: "Candra Wijaya", email: "candra@email.com", phone: "+62 813 5678 9012", visits: 15, lastVisit: "2024-01-14", totalSpent: "Rp 750.000" },
    { id: 4, name: "Doni Prakoso", email: "doni@email.com", phone: "+62 856 1234 5678", visits: 5, lastVisit: "2024-01-12", totalSpent: "Rp 250.000" },
  ];

  const services = [
    { id: 1, name: "Classic Haircut", price: "Rp 50.000", duration: "30 min", category: "Haircut", status: "active" },
    { id: 2, name: "Premium Haircut", price: "Rp 75.000", duration: "45 min", category: "Haircut", status: "active" },
    { id: 3, name: "Beard Grooming", price: "Rp 35.000", duration: "20 min", category: "Grooming", status: "active" },
    { id: 4, name: "Hair Coloring", price: "Rp 200.000", duration: "90 min", category: "Styling", status: "active" },
    { id: 5, name: "Kids Haircut", price: "Rp 40.000", duration: "25 min", category: "Haircut", status: "active" },
  ];

  const stats = [
    { label: "Total Revenue", value: "Rp 12.5M", change: "+12.5%", icon: DollarSign, color: "text-green-500" },
    { label: "Total Appointments", value: "248", change: "+8.2%", icon: Calendar, color: "text-blue-500" },
    { label: "Active Customers", value: "156", change: "+15.3%", icon: Users, color: "text-purple-500" },
    { label: "Completion Rate", value: "94%", change: "+2.1%", icon: CheckCircle2, color: "text-amber-500" },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
    { icon: Calendar, label: "Appointments", value: "appointments" },
    { icon: Users, label: "Customers", value: "customers" },
    { icon: Package, label: "Services", value: "services" },
    { icon: BarChart3, label: "Analytics", value: "analytics" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logout Berhasil! 👋",
      description: "Sampai jumpa lagi, Admin!",
      duration: 2000,
      className: "bg-amber-600 text-white border-amber-700",
    });

    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
          {/* Sidebar */}
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
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 hover:bg-amber-500/20' 
                              : 'hover:bg-muted'
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
                        onClick={() => window.location.href = '/'}
                        className="hover:bg-muted"
                      >
                        <Home className="h-4 w-4" />
                        <span className="font-medium">Back to Home</span>
                      </SidebarMenuButton>
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
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-card/95 backdrop-blur border-b border-border/40 sticky top-0 z-10 shadow-sm">
              <div className="px-4 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="hover:bg-muted rounded-lg transition-colors" />
                    <div className="hidden md:block">
                      <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                        Admin Dashboard
                      </h1>
                      <p className="text-xs text-muted-foreground mt-0.5">Manage your barbershop operations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = '/'}
                      className="hidden lg:flex gap-2"
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </Button>
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                      A
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
              <div className="px-4 lg:px-8 py-6 lg:py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                  {stats.map((stat, index) => (
                    <Card key={index} className="p-4 lg:p-6 bg-card border-border/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-xs lg:text-sm text-muted-foreground mb-2">{stat.label}</p>
                          <p className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</p>
                          <div className="flex items-center gap-1 text-xs">
                            <TrendingUp className={`h-3 w-3 ${stat.color}`} />
                            <span className={stat.color}>{stat.change}</span>
                            <span className="text-muted-foreground">vs last month</span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                          index === 0 ? 'from-green-500/20 to-green-600/20' :
                          index === 1 ? 'from-blue-500/20 to-blue-600/20' :
                          index === 2 ? 'from-purple-500/20 to-purple-600/20' :
                          'from-amber-500/20 to-amber-600/20'
                        } flex items-center justify-center`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Tabs Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="bg-card border border-border/40 p-1 h-auto flex-wrap gap-1">
                    <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="appointments" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Appointments
                    </TabsTrigger>
                    <TabsTrigger value="customers" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600">
                      <Users className="h-4 w-4 mr-2" />
                      Customers
                    </TabsTrigger>
                    <TabsTrigger value="services" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600">
                      <Package className="h-4 w-4 mr-2" />
                      Services
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                  </TabsList>

                  {/* Dashboard Tab */}
                  <TabsContent value="dashboard" className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <Card className="p-6 bg-card border-border/40">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Clock className="h-5 w-5 text-amber-500" />
                          Today's Schedule
                        </h3>
                        <div className="space-y-3">
                          {appointments.filter(a => a.date === "2024-01-20").slice(0, 4).map((apt) => (
                            <div key={apt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                                  <Clock className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{apt.customer}</p>
                                  <p className="text-xs text-muted-foreground">{apt.service}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">{apt.time}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  apt.status === 'confirmed' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'
                                }`}>
                                  {apt.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-6 bg-card border-border/40">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Users className="h-5 w-5 text-purple-500" />
                          Top Customers
                        </h3>
                        <div className="space-y-3">
                          {customers.slice(0, 4).map((customer) => (
                            <div key={customer.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                  {customer.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{customer.name}</p>
                                  <p className="text-xs text-muted-foreground">{customer.visits} visits</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-green-600">{customer.totalSpent}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Appointments Tab */}
                  <TabsContent value="appointments" className="space-y-4">
                    <Card className="p-4 lg:p-6 bg-card border-border/40">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
                          <Calendar className="h-6 w-6 text-amber-500" />
                          Appointments Management
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search appointments..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10 bg-background border-border/40"
                            />
                          </div>
                          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New
                          </Button>
                        </div>
                      </div>

                      <div className="overflow-x-auto -mx-4 lg:mx-0">
                        <div className="inline-block min-w-full align-middle">
                          <table className="min-w-full divide-y divide-border/40">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date & Time</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-card divide-y divide-border/40">
                              {filteredAppointments.map((apt) => (
                                <tr key={apt.id} className="hover:bg-muted/50 transition-colors">
                                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">#{apt.id}</td>
                                  <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                        {apt.customer.charAt(0)}
                                      </div>
                                      <span className="text-sm font-medium">{apt.customer}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm">{apt.service}</td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                                    <div>{apt.date}</div>
                                    <div className="text-muted-foreground">{apt.time}</div>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{apt.price}</td>
                                  <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      apt.status === 'confirmed' 
                                        ? 'bg-green-500/20 text-green-600' 
                                        : apt.status === 'pending'
                                        ? 'bg-yellow-500/20 text-yellow-600'
                                        : 'bg-blue-500/20 text-blue-600'
                                    }`}>
                                      {apt.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center gap-2">
                                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Customers Tab */}
                  <TabsContent value="customers" className="space-y-4">
                    <Card className="p-4 lg:p-6 bg-card border-border/40">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
                          <Users className="h-6 w-6 text-purple-500" />
                          Customer Management
                        </h2>
                        <Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg w-full sm:w-auto">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Customer
                        </Button>
                      </div>

                      <div className="grid gap-4">
                        {customers.map((customer) => (
                          <Card key={customer.id} className="p-4 bg-muted/30 border-border/40 hover:shadow-md transition-all">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                  {customer.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg">{customer.name}</h3>
                                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      {customer.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {customer.phone}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-purple-600">{customer.visits}</p>
                                  <p className="text-xs text-muted-foreground">Visits</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-lg font-bold text-green-600">{customer.totalSpent}</p>
                                  <p className="text-xs text-muted-foreground">Total Spent</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm font-medium">{customer.lastVisit}</p>
                                  <p className="text-xs text-muted-foreground">Last Visit</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Services Tab */}
                  <TabsContent value="services" className="space-y-4">
                    <Card className="p-4 lg:p-6 bg-card border-border/40">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
                          <Scissors className="h-6 w-6 text-amber-500" />
                          Services Management
                        </h2>
                        <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg w-full sm:w-auto">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Service
                        </Button>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service) => (
                          <Card key={service.id} className="p-5 bg-gradient-to-br from-card to-muted/30 border-border/40 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Scissors className="h-6 w-6 text-white" />
                              </div>
                              <span className="px-2 py-1 bg-green-500/20 text-green-600 text-xs font-medium rounded-full">
                                {service.status}
                              </span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Price</span>
                                <span className="font-bold text-green-600">{service.price}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Duration</span>
                                <span className="font-semibold">{service.duration}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Category</span>
                                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-600 text-xs rounded-full">{service.category}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 pt-3 border-t border-border/40">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/20">
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Analytics Tab */}
                  <TabsContent value="analytics" className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <Card className="p-6 bg-card border-border/40">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-500" />
                          Monthly Revenue
                        </h3>
                        <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                          <p className="text-muted-foreground">Chart visualization here</p>
                        </div>
                      </Card>

                      <Card className="p-6 bg-card border-border/40">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                          Service Popularity
                        </h3>
                        <div className="space-y-3">
                          {services.slice(0, 5).map((service, index) => (
                            <div key={service.id} className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">{service.name}</span>
                                  <span className="text-xs text-muted-foreground">{85 - index * 10}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all"
                                    style={{ width: `${85 - index * 10}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-6 bg-card border-border/40 lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-purple-500" />
                            Recent Activity
                          </h3>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {[
                            { action: "New appointment created", user: "Ahmad Rizki", time: "5 min ago", type: "success" },
                            { action: "Service completed", user: "Budi Santoso", time: "15 min ago", type: "info" },
                            { action: "Customer registered", user: "Candra Wijaya", time: "1 hour ago", type: "success" },
                            { action: "Appointment cancelled", user: "Doni Prakoso", time: "2 hours ago", type: "warning" },
                          ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <div className={`w-2 h-2 rounded-full ${
                                activity.type === 'success' ? 'bg-green-500' :
                                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{activity.action}</p>
                                <p className="text-xs text-muted-foreground">{activity.user}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>

      {/* Logout Confirmation Dialog */}
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
              Apakah Anda yakin ingin keluar dari dashboard admin? Anda harus login kembali untuk mengakses halaman ini.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setShowLogoutDialog(false)}
            >
              Batal
            </Button>
            <Button 
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Ya, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
};

export default Admin;