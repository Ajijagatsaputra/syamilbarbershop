const BookingSummary = ({ booking }: any) => {
  return (
    <div className="bg-muted/40 p-6 rounded-xl border">
      <h3 className="font-bold mb-4">Ringkasan Booking</h3>

      <div className="space-y-2 text-sm">
        <p>Service: {booking?.service}</p>
        <p>Tanggal: {booking?.date}</p>
        <p>Jam: {booking?.time}</p>

        <div className="border-t pt-3 mt-3">
          <p className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rp 50.000</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
