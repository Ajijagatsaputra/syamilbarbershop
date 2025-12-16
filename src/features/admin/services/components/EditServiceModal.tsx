import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Service, ServiceCategory, ServiceStatus } from "../types";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSubmit: (data: Service) => void;
};

export default function EditServiceModal({
  open,
  service,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Service | null>(null);

  useEffect(() => {
    if (service) setForm(service);
  }, [service]);

  if (!form) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "price" || name === "duration"
                ? Number(value)
                : value,
          }
        : prev
    );
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Service Name"
          />

          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <Input
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (minutes)"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 bg-background"
          >
            <option value="Haircut">Haircut</option>
            <option value="Grooming">Grooming</option>
            <option value="Styling">Styling</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 bg-background"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
