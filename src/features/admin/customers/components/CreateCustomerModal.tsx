import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomerStatus } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    email: string;
    phone: string;
    status: CustomerStatus;
  }) => void;
};

export default function CreateCustomerModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder="Full Name" />
          <Input type="email" placeholder="Email Address" />
          <Input placeholder="Phone Number" />
          <Input placeholder="visits"/>
          <Input placeholder="totalSpent"/>
          <Input type="date" placeholder="lastVisit"/>

          <select
            className="w-full border rounded-md px-3 py-2 bg-background"
            defaultValue="active"
          >
            <option value="active">Active</option>
            <option value="prospect">Prospect</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
