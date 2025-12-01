import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Users, Calendar, Home, Scissors } from "lucide-react";
import { Link } from "react-router-dom";

const Owner = () => {
  // Mock data
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000000 },
    { month: "Feb", revenue: 52000000 },
    { month: "Mar", revenue: 48000000 },
    { month: "Apr", revenue: 58000000 },
  ];

  const staff = [
    { id: 1, name: "Rizki Pratama", role: "Senior Barber", rating: 4.8, customers: 156 },
    { id: 2, name: "Andi Wijaya", role: "Barber", rating: 4.6, customers: 128 },
    { id: 3, name: "Dedi Suryanto", role: "Junior Barber", rating: 4.5, customers: 95 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-xl font-display">OWNER DASHBOARD</span>
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
        {/* Revenue Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Revenue Bulan Ini</p>
                <p className="text-2xl font-display text-primary">Rp 58jt</p>
                <p className="text-xs text-green-500 mt-1">+12% vs bulan lalu</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Customer</p>
                <p className="text-2xl font-display text-primary">1,245</p>
                <p className="text-xs text-green-500 mt-1">+8% vs bulan lalu</p>
              </div>
              <Users className="h-8 w-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Booking Bulan Ini</p>
                <p className="text-2xl font-display text-primary">432</p>
                <p className="text-xs text-green-500 mt-1">+15% vs bulan lalu</p>
              </div>
              <Calendar className="h-8 w-8 text-primary/30" />
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
                <p className="text-2xl font-display text-primary">4.7</p>
                <p className="text-xs text-green-500 mt-1">+0.2 vs bulan lalu</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/30" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-display mb-6">Revenue Trend</h3>
                <div className="space-y-4">
                  {monthlyRevenue.map((data) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{data.month}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-48 h-8 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${(data.revenue / 60000000) * 100}%` }}
                          />
                        </div>
                        <span className="font-semibold text-primary w-20 text-right">
                          {(data.revenue / 1000000).toFixed(0)}jt
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-xl font-display mb-6">Popular Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span>Classic Haircut</span>
                    <span className="text-primary font-semibold">245 bookings</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span>Premium Package</span>
                    <span className="text-primary font-semibold">189 bookings</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <span>Beard Grooming</span>
                    <span className="text-primary font-semibold">156 bookings</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hair Styling</span>
                    <span className="text-primary font-semibold">98 bookings</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Staff Management Tab */}
          <TabsContent value="staff" className="space-y-4">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display">Staff Performance</h2>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Tambah Staff
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold">Nama</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Posisi</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Total Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((member) => (
                      <tr key={member.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">{member.name}</td>
                        <td className="py-4 px-4">{member.role}</td>
                        <td className="py-4 px-4">
                          <span className="text-primary font-semibold">⭐ {member.rating}</span>
                        </td>
                        <td className="py-4 px-4">{member.customers}</td>
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

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-2xl font-display mb-6">Business Reports</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span>Monthly Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <span>Revenue Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Customer Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span>Performance Report</span>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Owner;
