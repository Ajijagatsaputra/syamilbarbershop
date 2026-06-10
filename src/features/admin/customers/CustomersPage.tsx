import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Plus, Edit, Eye, Trash2 } from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";

import { Customer, CustomerModal } from "./types";
import CreateCustomerModal from "./components/CreateCustomerModal";
import ViewCustomerModal from "./components/ViewCustomerModal";
import EditCustomerModal from "./components/EditCustomerModal";
import DeleteCustomerModal from "./components/DeleteCustomerModal";

const CustomersPage = () => {
  const [modal, setModal] = useState<CustomerModal>(null);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      api.get("/customers"),
      api.get("/appointments")
    ])
      .then(([customersRes, appointmentsRes]) => {
        setCustomers(customersRes.data || []);
        setAppointments(appointmentsRes.data || []);
      })
      .catch((err) => {
        console.error("Error loading customer data:", err);
        toast.error("Gagal memuat data pelanggan");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = () => {
    if (!selected) return;
    api.delete(`/customers/${selected.id}`)
      .then(() => {
        toast.success("Pelanggan berhasil dihapus");
        setModal(null);
        fetchData();
      })
      .catch((err) => {
        console.error("Error deleting customer:", err);
        toast.error("Gagal menghapus pelanggan");
      });
  };

  // Compute visits, totalSpent, lastVisit, and status for each customer
  const computedCustomers: Customer[] = customers.map((c) => {
    const customerAppointments = appointments.filter((apt) => apt.customer_id === c.id);
    const validAppointments = customerAppointments.filter(
      (apt) => apt.status === "completed" || apt.status === "confirmed"
    );

    const visits = validAppointments.length;
    const totalSpent = validAppointments.reduce((sum, apt) => sum + (apt.price || 0), 0);

    // Get last visit date
    let lastVisit = "-";
    if (validAppointments.length > 0) {
      const dates = validAppointments.map((apt) => new Date(apt.date));
      const latestDate = new Date(Math.max(...dates.map(d => d.getTime())));
      lastVisit = latestDate.toISOString().split("T")[0];
    }

    return {
      id: c.id,
      name: c.name,
      email: c.email || "-",
      phone: c.phone || "-",
      visits,
      totalSpent,
      lastVisit,
      status: visits > 0 ? "active" : "inactive",
      createdAt: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-",
    };
  });

  const filteredCustomers = computedCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 bg-background border border-border/40 rounded-md text-sm outline-none focus:border-purple-500 w-full sm:w-64"
              />

              <Button
                onClick={() => setModal("create")}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shrink-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          </div>

          {/* LIST */}
          <div className="grid gap-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Memuat data pelanggan...</div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Tidak ada data pelanggan.</div>
            ) : (
              filteredCustomers.map((customer) => (
                <Card
                  key={customer.id}
                  className="p-4 bg-muted/30 border-border/40 hover:shadow-md transition"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold">{customer.name}</h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
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

                    <div className="flex items-center justify-between lg:justify-end gap-6">
                      <div className="text-center min-w-[60px]">
                        <p className="text-xl font-bold text-purple-600">
                          {customer.visits}
                        </p>
                        <p className="text-xs text-muted-foreground">Visits</p>
                      </div>

                      <div className="text-center min-w-[100px]">
                        <p className="text-lg font-bold text-green-600">
                          Rp {customer.totalSpent.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
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

                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:bg-red-500/10 hover:text-red-700"
                          onClick={() => {
                            setSelected(customer);
                            setModal("delete");
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* MODALS */}
      <CreateCustomerModal
        open={modal === "create"}
        onClose={() => setModal(null)}
        onSuccess={fetchData}
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
        onSuccess={fetchData}
      />

      <DeleteCustomerModal
        open={modal === "delete"}
        onClose={() => setModal(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CustomersPage;
