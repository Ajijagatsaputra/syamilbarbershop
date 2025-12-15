import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Appointment } from "../types";

type Props = {
  open: boolean;
  appointment: Appointment | null;
  onClose: () => void;
};

export default function ViewAppointmentModal({
  open,
  appointment,
  onClose,
}: Props) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appointment Detail</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p><b>Customer:</b> {appointment.customer}</p>
          <p><b>Service:</b> {appointment.service}</p>
          <p><b>Date:</b> {appointment.date}</p>
          <p><b>Time:</b> {appointment.time}</p>
          <p><b>Status:</b> {appointment.status}</p>
          <p><b>Price:</b> {appointment.price}</p>
        </div>

        <Button className="mt-4" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
