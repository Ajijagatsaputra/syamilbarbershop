import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Plus, Edit, Eye, Trash2 } from "lucide-react";

import { Customer, CustomerModal } from "./types";
import CreateCustomerModal from "./components/CreateCustomerModal";
import ViewCustomerModal from "./components/ViewCustomerModal";
import EditCustomerModal from "./components/EditCustomerModal";

const CustomersPage = () => {
  const [modal, setModal] = useState<CustomerModal>(null);
  const [selected, setSelected] = useState<Customer | null>(null);

  const customers: Customer[] = [
    {
      id: 1,
      name: "Ahmad Rizki",
      email: "ahmad@email.com",
      phone: "+62 812 3456 7890",
      visits: 12,
      totalSpent: 600000,
      lastVisit: "2024-01-15",
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi@email.com",
      phone: "+62 821 9876 5432",
      visits: 8,
      totalSpent: 400000,
      lastVisit: "2024-01-10",
      status: "active",
      createdAt: "2024-01-03",
    },
    {
      id: 3,
      name: "Syamil Maulana",
      email: "syamil@email.com",
      phone: "+62 821 9876 5432",
      visits: 1,
      totalSpent: 900000,
      lastVisit: "2024-01-10",
      status: "active",
      createdAt: "2024-01-03",
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <Card className="p-4 lg:p-6 bg-card border-border/40">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-500" />
              Customer Management
            </h2>

            <Button
              onClick={() => setModal("create")}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          {/* LIST */}
          <div className="grid gap-4">
            {customers.map((customer) => (
              <Card
                key={customer.id}
                className="p-4 bg-muted/30 border-border/40 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {customer.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold">{customer.name}</h3>
                      <div className="flex gap-3 text-sm text-muted-foreground">
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

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-purple-600">
                        {customer.visits}
                      </p>
                      <p className="text-xs">Visits</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">
                        Rp {customer.totalSpent.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs">Total Spent</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelected(customer);
                          setModal("view");
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelected(customer);
                          setModal("edit");
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {/* <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => {
                          setSelected(customer);
                          setModal("delete");
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* MODALS */}
      <CreateCustomerModal
        open={modal === "create"}
        onClose={() => setModal(null)}
      />

      <ViewCustomerModal
        open={modal === "view"}
        customer={selected}
        onClose={() => setModal(null)}
      />

      <EditCustomerModal
        open={modal === "edit"}
        customer={selected}
        onClose={() => setModal(null)}
      />
    </>
  );
};

export default CustomersPage;
