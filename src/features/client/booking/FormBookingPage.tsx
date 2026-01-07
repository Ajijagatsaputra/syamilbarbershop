import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Scissors,
  Calendar,
  Clock,
  User,
  Phone,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookingSchema,
  BookingFormData,
} from "./bookingSchema";

const BookingForm = ({
  onNext,
}: {
  onNext: (data: BookingFormData) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
  });

  const onSubmit = (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      onNext(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card p-8 rounded-2xl border shadow-sm max-w-xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
          <Scissors className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Booking Appointment</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Pilih layanan dan waktu yang paling nyaman untuk Anda
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Service */}
        <div>
          <label className="text-sm font-medium">Layanan</label>
          <select
            {...register("service")}
            className="w-full mt-1 border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-primary"
          >
            <option value="">Pilih layanan</option>
            <option value="classic">Classic Haircut</option>
            <option value="premium">Premium Haircut</option>
            <option value="beard">Beard Grooming</option>
            <option value="coloring">Hair Coloring</option>
          </select>
          {errors.service && (
            <p className="text-xs text-red-500 mt-1">
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Date & Time */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Tanggal
            </label>
            <Input type="date" {...register("date")} />
            {errors.date && (
              <p className="text-xs text-red-500">
                {errors.date.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" /> Jam
            </label>
            <Input type="time" {...register("time")} />
            {errors.time && (
              <p className="text-xs text-red-500">
                {errors.time.message}
              </p>
            )}
          </div>
        </div>

        {/* Customer */}
        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <User className="h-4 w-4" /> Nama Lengkap
          </label>
          <Input placeholder="Nama Anda" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-1">
            <Phone className="h-4 w-4" /> Nomor WhatsApp
          </label>
          <Input placeholder="08xxxxxxxxxx" {...register("phone")} />
          {errors.phone && (
            <p className="text-xs text-red-500">
              {errors.phone.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Digunakan untuk konfirmasi booking
          </p>
        </div>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        type="submit"
        className="mt-8 w-full text-lg"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        🔒 Data Anda aman dan hanya digunakan untuk keperluan booking
      </p>
    </form>
  );
};

const FormBookingPage = () => {
  const handleNext = (data: BookingFormData) => {
    console.log("Booking data:", data);
    // TODO: Implement payment flow or next step
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <BookingForm onNext={handleNext} />
    </div>
  );
};

export default FormBookingPage;
