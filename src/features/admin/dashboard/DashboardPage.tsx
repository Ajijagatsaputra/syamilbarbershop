import { Card } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";

const DashboardPage = () => {
  const appointments = [
    {
      id: 1,
      customer: "Ahmad Rizki",
      service: "Classic Haircut",
      time: "10:00",
      date: "2024-01-20",
      status: "confirmed",
      price: "Rp 50.000",
    },
    {
      id: 2,
      customer: "Budi Santoso",
      service: "Beard Grooming",
      time: "11:30",
      date: "2024-01-20",
      status: "pending",
      price: "Rp 35.000",
    },
    {
      id: 3,
      customer: "Candra Wijaya",
      service: "Premium Package",
      time: "14:00",
      date: "2024-01-20",
      status: "confirmed",
      price: "Rp 150.000",
    },
    {
      id: 4,
      customer: "Doni Prakoso",
      service: "Hair Styling",
      time: "16:00",
      date: "2024-01-19",
      status: "completed",
      price: "Rp 75.000",
    },
    {
      id: 5,
      customer: "Eko Prasetyo",
      service: "Kids Haircut",
      time: "09:00",
      date: "2024-01-20",
      status: "confirmed",
      price: "Rp 40.000",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Ahmad Rizki",
      email: "ahmad@email.com",
      phone: "+62 812 3456 7890",
      visits: 12,
      lastVisit: "2024-01-15",
      totalSpent: "Rp 600.000",
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi@email.com",
      phone: "+62 821 9876 5432",
      visits: 8,
      lastVisit: "2024-01-10",
      totalSpent: "Rp 400.000",
    },
    {
      id: 3,
      name: "Candra Wijaya",
      email: "candra@email.com",
      phone: "+62 813 5678 9012",
      visits: 15,
      lastVisit: "2024-01-14",
      totalSpent: "Rp 750.000",
    },
    {
      id: 4,
      name: "Doni Prakoso",
      email: "doni@email.com",
      phone: "+62 856 1234 5678",
      visits: 5,
      lastVisit: "2024-01-12",
      totalSpent: "Rp 250.000",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* TODAY SCHEDULE */}
        <Card className="p-6 bg-card border-border/40">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Today's Schedule
          </h3>

          <div className="space-y-3">
            {appointments
              .filter((a) => a.date === "2024-01-20")
              .slice(0, 4)
              .map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>

                    <div>
                      <p className="font-medium text-sm">{apt.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.service}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">{apt.time}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        apt.status === "confirmed"
                          ? "bg-green-500/20 text-green-600"
                          : "bg-yellow-500/20 text-yellow-600"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* TOP CUSTOMERS */}
        <Card className="p-6 bg-card border-border/40">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Top Customers
          </h3>

          <div className="space-y-3">
            {customers.slice(0, 4).map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {customer.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-sm">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {customer.visits} visits
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">
                    {customer.totalSpent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
