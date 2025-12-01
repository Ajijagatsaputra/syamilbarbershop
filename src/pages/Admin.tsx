import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Scissors, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const appointments = [
    { id: 1, customer: "Ahmad Rizki", service: "Classic Haircut", time: "10:00", status: "confirmed" },
    { id: 2, customer: "Budi Santoso", service: "Beard Grooming", time: "11:30", status: "pending" },
    { id: 3, customer: "Candra Wijaya", service: "Premium Package", time: "14:00", status: "confirmed" },
    { id: 4, customer: "Doni Prakoso", service: "Hair Styling", time: "16:00", status: "completed" },
  ];

  const customers = [
    { id: 1, name: "Ahmad Rizki", phone: "+62 812 3456 7890", visits: 12, lastVisit: "2024-01-15" },
    { id: 2, name: "Budi Santoso", phone: "+62 821 9876 5432", visits: 8, lastVisit: "2024-01-10" },
    { id: 3, name: "Candra Wijaya", phone: "+62 813 5678 9012", visits: 15, lastVisit: "2024-01-14" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-xl font-display">ADMIN DASHBOARD</span>
            </div>
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Appointment</p>
                <p className="text-3xl font-display text-primary">24</p>
              </div>
              <Calendar className="h-8 w-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer Hari Ini</p>
                <p className="text-3xl font-display text-primary">12</p>
              </div>
              <Users className="h-8 w-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Layanan Aktif</p>
                <p className="text-3xl font-display text-primary">8</p>
              </div>
              <Scissors className="h-8 w-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-display text-primary">4</p>
              </div>
              <Calendar className="h-8 w-8 text-primary/30" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display">Daftar Appointment</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari appointment..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background border-border"
                    />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Tambah Appointment
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Layanan</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Waktu</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">#{apt.id}</td>
                        <td className="py-4 px-4">{apt.customer}</td>
                        <td className="py-4 px-4">{apt.service}</td>
                        <td className="py-4 px-4">{apt.time}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            apt.status === 'confirmed' 
                              ? 'bg-primary/20 text-primary' 
                              : apt.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-green-500/20 text-green-500'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button size="sm" variant="outline">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display">Daftar Customer</h2>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Tambah Customer
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Nama</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Telepon</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Total Kunjungan</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Kunjungan Terakhir</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">#{customer.id}</td>
                        <td className="py-4 px-4">{customer.name}</td>
                        <td className="py-4 px-4">{customer.phone}</td>
                        <td className="py-4 px-4">{customer.visits}x</td>
                        <td className="py-4 px-4">{customer.lastVisit}</td>
                        <td className="py-4 px-4">
                          <Button size="sm" variant="outline">Detail</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display">Manajemen Layanan</h2>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Tambah Layanan
                </Button>
              </div>
              <p className="text-muted-foreground">Kelola layanan barbershop di sini...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
