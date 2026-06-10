import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";

const DashboardPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.get("/appointments"),
      api.get("/customers")
    ])
      .then(([appointmentsRes, customersRes]) => {
        setAppointments(appointmentsRes.data || []);
        setCustomers(customersRes.data || []);
      })
      .catch((err) => {
        console.error("Error loading dashboard data:", err);
        toast.error("Gagal memuat data dashboard");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Format today's date as YYYY-MM-DD in local time
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayString = `${year}-${month}-${day}`;

  const todayAppointments = appointments
    .filter((a) => a.date === todayString)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Compute customer metrics (visits and total spent)
  const computedCustomers = customers.map((c) => {
    const customerAppointments = appointments.filter((apt) => apt.customer_id === c.id);
    const validAppointments = customerAppointments.filter(
      (apt) => apt.status === "completed" || apt.status === "confirmed"
    );

    const visits = validAppointments.length;
    const totalSpent = validAppointments.reduce((sum, apt) => sum + (apt.price || 0), 0);

    return {
      id: c.id,
      name: c.name,
      visits,
      totalSpent,
    };
  });

  // Sort by totalSpent descending to find top customers
  const topCustomers = computedCustomers
    .filter((c) => c.visits > 0)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Memuat dashboard...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* TODAY SCHEDULE */}
          <Card className="p-6 bg-card border-border/40">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Today's Schedule ({todayAppointments.length})
            </h3>

            <div className="space-y-3">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Tidak ada jadwal janji temu untuk hari ini.
                </div>
              ) : (
                todayAppointments.slice(0, 5).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>

                      <div>
                        <p className="font-medium text-sm">{apt.customer?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {apt.service?.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">{apt.time}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                          apt.status === "confirmed" ? "bg-green-500/20 text-green-500" :
                          apt.status === "completed" ? "bg-blue-500/20 text-blue-500" :
                          apt.status === "cancelled" ? "bg-red-500/20 text-red-500" :
                          "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* TOP CUSTOMERS */}
          <Card className="p-6 bg-card border-border/40">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Top Customers
            </h3>

            <div className="space-y-3">
              {topCustomers.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Belum ada transaksi selesai dari pelanggan.
                </div>
              ) : (
                topCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {customer.visits} visits
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-green-600">
                        Rp {customer.totalSpent.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
