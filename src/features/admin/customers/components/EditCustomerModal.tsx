import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Customer, CustomerStatus } from "../types";

type Props = {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSubmit?: (data: Customer) => void;
};

export default function EditCustomerModal({
  open,
  customer,
  onClose,
  onSubmit,
}: Props) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input defaultValue={customer.name} placeholder="Name" />
          <Input defaultValue={customer.email} placeholder="Email" />
          <Input defaultValue={customer.phone} placeholder="Phone" />

          {/* status */}
          <select
            defaultValue={customer.status}
            className="w-full border rounded-md px-3 py-2 bg-background"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
