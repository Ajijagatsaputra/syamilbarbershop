import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "../types";

type Props = {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
};

export default function ViewCustomerModal({
  open,
  customer,
  onClose,
}: Props) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customer Detail</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            <b>Name:</b> {customer.name}
          </p>
          <p>
            <b>Email:</b> {customer.email}
          </p>
          <p>
            <b>Phone:</b> {customer.phone}
          </p>
          <p>
            <b>Status:</b> {customer.status}
          </p>
          <p>
            <b>Visits:</b> {customer.visits}
          </p>
          <p>
            <b>Total Spent:</b> Rp{" "}
            {customer.totalSpent.toLocaleString("id-ID")}
          </p>
          <p>
            <b>Last Visit:</b> {customer.lastVisit}
          </p>
          <p>
            <b>Created At:</b> {customer.createdAt}
          </p>
        </div>

        <Button className="mt-4" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
