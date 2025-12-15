import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Plus, Edit, Eye } from "lucide-react";

const CustomersPage = () => {
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
    <div className="space-y-4">
      <Card className="p-4 lg:p-6 bg-card border-border/40">
        {/* HEADER */}
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

        {/* CUSTOMER LIST */}
        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card
              key={customer.id}
              className="p-4 bg-muted/30 border-border/40 hover:shadow-md transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {customer.name.charAt(0)}
                  </div>

                  <div>
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
                    <p className="text-2xl font-bold text-purple-600">
                      {customer.visits}
                    </p>
                    <p className="text-xs text-muted-foreground">Visits</p>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">
                      {customer.totalSpent}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total Spent
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {customer.lastVisit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last Visit
                    </p>
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
    </div>
  );
};

export default CustomersPage;
