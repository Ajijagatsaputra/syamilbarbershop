import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { toast } from "sonner";

import { Appointment, AppointmentModal } from "./types";

import CreateAppointmentModal from "./components/CreateAppointmentModal";
import ViewAppointmentModal from "./components/ViewAppointmentModal";
import EditAppointmentModal from "./components/EditAppointmentModal";
import DeleteAppointmentModal from "./components/DeleteAppointmentModal";

const AppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modal, setModal] = useState<AppointmentModal>(null);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = () => {
    setIsLoading(true);
    api.get("/appointments")
      .then((res) => {
        setAppointments(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        toast.error("Gagal memuat data janji temu");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = () => {
    if (!selected) return;
    api.delete(`/appointments/${selected.id}`)
      .then(() => {
        toast.success("Janji temu berhasil dihapus");
        setModal(null);
        fetchAppointments();
      })
      .catch((err) => {
        console.error("Error deleting appointment:", err);
        toast.error("Gagal menghapus janji temu");
      });
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service?.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Memuat data...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Tidak ada janji temu ditemukan.</div>
            ) : (
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

                      <td className="px-4 py-4">
                        <div className="font-medium">{apt.customer?.name}</div>
                        <div className="text-xs text-muted-foreground">{apt.customer?.phone}</div>
                      </td>

                      <td className="px-4 py-4">{apt.service?.name}</td>

                      <td className="px-4 py-4">
                        {apt.date ? apt.date.split("T")[0] : ""} <br />
                        <span className="text-muted-foreground">{apt.time}</span>
                      </td>

                      <td className="px-4 py-4 font-semibold text-green-600">
                        Rp {apt.price?.toLocaleString("id-ID")}
                      </td>

                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          apt.status === "confirmed" ? "bg-green-500/20 text-green-500" :
                          apt.status === "completed" ? "bg-blue-500/20 text-blue-500" :
                          apt.status === "cancelled" ? "bg-red-500/20 text-red-500" :
                          "bg-yellow-500/20 text-yellow-500"
                        }`}>
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
            )}
          </div>
        </Card>
      </div>

      {/* ================= MODALS ================= */}
      <CreateAppointmentModal
        open={modal === "create"}
        onClose={() => setModal(null)}
        onSuccess={fetchAppointments}
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
        onSuccess={fetchAppointments}
      />

      <DeleteAppointmentModal
        open={modal === "delete"}
        onClose={() => setModal(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AppointmentsPage;
