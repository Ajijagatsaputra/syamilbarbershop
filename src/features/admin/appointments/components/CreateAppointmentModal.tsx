import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
};

export default function CreateAppointmentModal({ open, onClose, onSuccess }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    service_id: "",
    date: "",
    time: "",
    payment_method: "Cash",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      api.get("/services")
        .then((res) => {
          setServices(res.data || []);
          if (res.data && res.data.length > 0) {
            setFormData((prev) => ({ ...prev, service_id: res.data[0].id.toString() }));
          }
        })
        .catch((err) => {
          console.error("Error fetching services:", err);
          toast.error("Gagal memuat daftar layanan");
        });
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_phone || !formData.service_id || !formData.date || !formData.time) {
      toast.error("Harap isi semua kolom yang wajib!");
      return;
    }

    setIsSubmitting(true);
    api.post("/appointments", {
      service_id: parseInt(formData.service_id),
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      date: formData.date,
      time: formData.time,
      payment_method: formData.payment_method,
    })
      .then(() => {
        toast.success("Janji temu berhasil dibuat!");
        setFormData({
          customer_name: "",
          customer_phone: "",
          service_id: services[0]?.id.toString() || "",
          date: "",
          time: "",
          payment_method: "Cash",
        });
        if (onSuccess) onSuccess();
        onClose();
      })
      .catch((err) => {
        console.error("Error creating appointment:", err);
        const errMsg = err.response?.data?.error || "Gagal membuat janji temu";
        toast.error(errMsg);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Appointment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div>
              <label className="text-sm font-medium">Customer Name</label>
              <Input
                placeholder="Ahmad Rizki"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Customer Phone</label>
              <Input
                placeholder="0812XXXXXXXX"
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Service</label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-background text-sm outline-none focus:border-amber-500"
                value={formData.service_id}
                onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                required
              >
                {services.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name} - Rp {svc.price.toLocaleString("id-ID")}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Payment Method</label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-background text-sm outline-none focus:border-amber-500"
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              >
                <option value="Cash">Cash</option>
                <option value="DANA">DANA</option>
                <option value="OVO">OVO</option>
                <option value="GoPay">GoPay</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
