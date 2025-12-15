export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed";

export type Appointment = {
  id: number;
  customer: string;
  service: string;
  date: string;
  time: string;
  price: string;
  status: AppointmentStatus;
};

export type AppointmentModal =
  | "create"
  | "view"
  | "edit"
  | "delete"
  | null;
