export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type Appointment = {
  id: number;
  customer_id: number;
  customer: {
    id: number;
    name: string;
    phone: string;
    email?: string;
  };
  service_id: number;
  service: {
    id: number;
    name: string;
    price: number;
    duration: number;
  };
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  price: number;
  status: AppointmentStatus;
  payment_method?: string;
};

export type AppointmentModal =
  | "create"
  | "view"
  | "edit"
  | "delete"
  | null;
