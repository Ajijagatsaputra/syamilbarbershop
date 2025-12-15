import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Appointment } from "../types";

type Props = {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
};

export default function EditAppointmentModal({
  open,
  appointment,
  onClose,
}: Props) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input defaultValue={appointment.customer} />
          <Input defaultValue={appointment.service} />
          <Input type="date" defaultValue={appointment.date} />
          <Input type="time" defaultValue={appointment.time} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
