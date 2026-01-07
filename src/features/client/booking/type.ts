export type PaymentMethod = "qris" | "ewallet" | "transfer";

export type BookingData = {
  service: string;
  barber?: string;
  date: string;
  time: string;
  name: string;
  phone: string;
};

export type PaymentData = {
    method: PaymentMethod;
}