import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Plus, Edit, Trash2 } from "lucide-react";
import api from "@/services/api";

import { Service, ServiceModal } from "./types";
import CreateServiceModal from "./components/CreateServiceModal";
import EditServiceModal from "./components/EditServiceModal";
import DeleteServiceModal from "./components/DeleteServiceModal";
import { useToast } from "@/hooks/use-toast";

const ServicesPage = () => {
  const [modal, setModal] = useState<ServiceModal>(null);
  const [selected, setSelected] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const { toast } = useToast();

  const fetchServices = () => {
    api.get("/services")
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = (data: Partial<Service>) => {
    api.post("/services", data)
      .then(() => {
        toast({ title: "Success", description: "Service created successfully" });
        setModal(null);
        fetchServices();
      })
      .catch((error) => {
        toast({ variant: "destructive", title: "Error", description: error.response?.data?.error || "Failed to create service" });
      });
  };

  const handleEdit = (data: Partial<Service>) => {
    if (!selected) return;
    api.put(`/services/${selected.id}`, data)
      .then(() => {
        toast({ title: "Success", description: "Service updated successfully" });
        setModal(null);
        fetchServices();
      })
      .catch((error) => {
        toast({ variant: "destructive", title: "Error", description: error.response?.data?.error || "Failed to update service" });
      });
  };

  const handleDelete = () => {
    if (!selected) return;
    api.delete(`/services/${selected.id}`)
      .then(() => {
        toast({ title: "Success", description: "Service deleted successfully" });
        setModal(null);
        fetchServices();
      })
      .catch((error) => {
        toast({ variant: "destructive", title: "Error", description: error.response?.data?.error || "Failed to delete service" });
      });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 lg:p-6 bg-card border-border/40">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
            <Scissors className="h-6 w-6 text-amber-500" />
            Services Management
          </h2>

          <Button
            onClick={() => setModal("create")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-5 bg-gradient-to-br from-card to-muted/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Scissors className="h-6 w-6 text-white" />
                </div>

                <span className="px-2 py-1 bg-green-500/20 text-green-600 text-xs rounded-full">
                  {service.status}
                </span>
              </div>

              <h3 className="font-bold text-lg mb-2">{service.name}</h3>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold text-green-600">
                    Rp {service.price.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{service.duration} min</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="px-2 bg-amber-500/20 text-amber-600 rounded-full text-xs">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelected(service);
                    setModal("edit");
                  }}
                >
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-red-600"
                  onClick={() => {
                    setSelected(service);
                    setModal("delete");
                  }}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* MODALS */}
      <CreateServiceModal
        open={modal === "create"}
        onClose={() => setModal(null)}
        onSubmit={handleCreate}
      />

      <EditServiceModal
        open={modal === "edit"}
        service={selected}
        onClose={() => setModal(null)}
        onSubmit={handleEdit}
      />

      <DeleteServiceModal
        open={modal === "delete"}
        service={selected}
        onClose={() => setModal(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ServicesPage;
