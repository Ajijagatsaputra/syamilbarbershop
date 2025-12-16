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
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Service, "id" | "createdAt">) => void;
};

export default function CreateServiceModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    duration: 0,
    category: "Haircut" as ServiceCategory,
    status: "active" as ServiceStatus,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "duration"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            name="name"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <Input
            name="duration"
            type="number"
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={handleChange}
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
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
