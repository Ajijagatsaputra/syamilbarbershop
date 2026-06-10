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

        <div className="space-y-3 my-2 text-sm">
          <p>
            <b>Customer Name:</b> {appointment.customer?.name}
          </p>
          <p>
            <b>Customer Phone:</b> {appointment.customer?.phone}
          </p>
          <p>
            <b>Customer Email:</b> {appointment.customer?.email || "-"}
          </p>
          <p>
            <b>Service:</b> {appointment.service?.name}
          </p>
          <p>
            <b>Date:</b> {appointment.date}
          </p>
          <p>
            <b>Time:</b> {appointment.time}
          </p>
          <p>
            <b>Payment Method:</b> {appointment.payment_method || "Cash"}
          </p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                appointment.status === "confirmed"
                  ? "bg-green-500/20 text-green-500"
                  : appointment.status === "completed"
                    ? "bg-blue-500/20 text-blue-500"
                    : appointment.status === "cancelled"
                      ? "bg-red-500/20 text-red-500"
                      : "bg-yellow-500/20 text-yellow-500"
              }`}
            >
              {appointment.status}
            </span>
          </p>
          <p>
            <b>Price:</b> Rp {appointment.price?.toLocaleString("id-ID")}
          </p>
        </div>

        <Button className="mt-4" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
