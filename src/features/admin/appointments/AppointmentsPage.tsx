import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

import { Appointment, AppointmentModal } from "./types";

import CreateAppointmentModal from "./components/CreateAppointmentModal";
import ViewAppointmentModal from "./components/ViewAppointmentModal";
import EditAppointmentModal from "./components/EditAppointmentModal";
import DeleteAppointmentModal from "./components/DeleteAppointmentModal";

const AppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [modal, setModal] = useState<AppointmentModal>(null);
  const [selected, setSelected] = useState<Appointment | null>(null);

  const appointments: Appointment[] = [
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

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ================= MAIN CONTENT ================= */}
      <div className="space-y-4">
        <Card className="p-4 lg:p-6 bg-card border-border/40">
          {/* HEADER */}
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

              <Button
                onClick={() => setModal("create")}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto -mx-4 lg:mx-0">
            <table className="min-w-full divide-y divide-border/40">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/40">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-muted/50">
                    <td className="px-4 py-4">#{apt.id}</td>

                    <td className="px-4 py-4">{apt.customer}</td>

                    <td className="px-4 py-4">{apt.service}</td>

                    <td className="px-4 py-4">
                      {apt.date} <br />
                      <span className="text-muted-foreground">{apt.time}</span>
                    </td>

                    <td className="px-4 py-4 font-semibold text-green-600">
                      {apt.price}
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-muted">
                        {apt.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelected(apt);
                            setModal("view");
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelected(apt);
                            setModal("edit");
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelected(apt);
                            setModal("delete");
                          }}
                          className="hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* ================= MODALS ================= */}
      <CreateAppointmentModal
        open={modal === "create"}
        onClose={() => setModal(null)}
      />

      <ViewAppointmentModal
        open={modal === "view"}
        appointment={selected}
        onClose={() => setModal(null)}
      />

      <EditAppointmentModal
        open={modal === "edit"}
        appointment={selected}
        onClose={() => setModal(null)}
      />

      <DeleteAppointmentModal
        open={modal === "delete"}
        onClose={() => setModal(null)}
        onConfirm={() => {
          console.log("DELETE:", selected?.id);
          setModal(null);
        }}
      />
    </>
  );
};

export default AppointmentsPage;
