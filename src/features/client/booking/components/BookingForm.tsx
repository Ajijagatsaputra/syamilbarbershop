import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingFormData } from "../bookingSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BookingForm = ({ onNext }: { onNext: (data: BookingFormData) => void }) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
  });

  const onSubmit = (data: BookingFormData) => {
    setSubmitting(true);
    setTimeout(() => {
      onNext(data);
      setSubmitting(false);
    }, 500);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card p-8 rounded-2xl border max-w-xl mx-auto space-y-5"
    >
      <div>
        <label>Layanan</label>
        <select {...register("service")} className="w-full border p-3 rounded-lg">
          <option value="">Pilih layanan</option>
          <option value="Classic Haircut">Classic Haircut</option>
          <option value="Premium Haircut">Premium Haircut</option>
        </select>
        {errors.service && (
          <p className="text-red-500 text-sm">{errors.service.message}</p>
        )}
      </div>

      <Input type="date" {...register("date")} />
      {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

      <Input type="time" {...register("time")} />
      {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}

      <Input placeholder="Nama Lengkap" {...register("name")} />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <Input placeholder="08xxxxxxxxxx" {...register("phone")} />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!isValid || submitting}
      >
        {submitting ? "Memproses..." : "Lanjut ke Pembayaran"}
      </Button>
    </form>
  );
};

export default BookingForm;
