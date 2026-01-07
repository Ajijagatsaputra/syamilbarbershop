import { z } from "zod";

export const bookingSchema = z.object({
  service: z.string().min(1, "Pilih layanan"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  time: z.string().min(1, "Jam wajib diisi"),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  phone: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .regex(/^08\d+$/, "Gunakan nomor Indonesia"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
