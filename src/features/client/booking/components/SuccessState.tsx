import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessState = () => {
  return (
    <div className="text-center py-20">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Booking Berhasil 🎉</h2>
      <p className="text-muted-foreground mb-6">
        Terima kasih! Tim kami akan menghubungi Anda via WhatsApp.
      </p>

      <Button asChild>
        <a href="https://wa.me/628xxxxxxxxx">Hubungi WhatsApp</a>
      </Button>
    </div>
  );
};

export default SuccessState;
