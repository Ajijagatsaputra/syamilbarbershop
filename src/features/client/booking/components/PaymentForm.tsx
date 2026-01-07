import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  QrCode,
  Wallet,
  Building2,
  Copy,
  CheckCircle2,
} from "lucide-react";

type PaymentMethod = "qris" | "ewallet" | "bank";
type EwalletType = "gopay" | "dana" | "ovo";

const DANA_NUMBER = "0855664792383";
const DANA_NAME = "Syamil Barbershop";

const PaymentForm = ({ onPay }: { onPay: (data: any) => void }) => {
  const [method, setMethod] = useState<PaymentMethod>("qris");
  const [ewallet, setEwallet] = useState<EwalletType>("gopay");
  const [copied, setCopied] = useState(false);

  const copyDana = () => {
    navigator.clipboard.writeText(DANA_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-card p-8 rounded-2xl border shadow-sm max-w-xl mx-auto">
      <h3 className="text-xl font-bold mb-6">Metode Pembayaran</h3>

      <div className="space-y-4">
        {/* QRIS */}
        <div
          className={`border rounded-xl p-4 cursor-pointer ${
            method === "qris" ? "border-primary bg-primary/5" : ""
          }`}
          onClick={() => setMethod("qris")}
        >
          <div className="flex items-center gap-3">
            <QrCode className="h-5 w-5 text-primary" />
            <span className="font-medium">QRIS</span>
          </div>
        </div>

        {/* E-WALLET */}
        <div
          className={`border rounded-xl p-4 cursor-pointer ${
            method === "ewallet" ? "border-primary bg-primary/5" : ""
          }`}
          onClick={() => setMethod("ewallet")}
        >
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="font-medium">E-Wallet</span>
          </div>

          {method === "ewallet" && (
            <div className="mt-4 space-y-3">
              {(["gopay", "dana", "ovo"] as EwalletType[]).map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${
                    ewallet === item ? "border-primary" : ""
                  }`}
                >
                  <input
                    type="radio"
                    checked={ewallet === item}
                    onChange={() => setEwallet(item)}
                  />
                  <span className="uppercase font-medium">{item}</span>
                </label>
              ))}

              {/* DANA NUMBER */}
              {ewallet === "dana" && (
                <div className="mt-4 border rounded-xl p-4 bg-muted/40">
                  <p className="text-sm text-muted-foreground mb-1">
                    Transfer ke DANA
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{DANA_NUMBER}</p>
                      <p className="text-xs text-muted-foreground">
                        a.n {DANA_NAME}
                      </p>
                    </div>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={copyDana}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    Setelah transfer, klik “Konfirmasi & Bayar”
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BANK (MIDTRANS) */}
        <div
          className={`border rounded-xl p-4 cursor-pointer ${
            method === "bank" ? "border-primary bg-primary/5" : ""
          }`}
          onClick={() => setMethod("bank")}
        >
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="font-medium">Transfer Bank (Midtrans)</span>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-8 w-full"
        onClick={() =>
          onPay({
            method,
            ewallet: method === "ewallet" ? ewallet : null,
          })
        }
      >
        Konfirmasi & Bayar
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        🔒 Pembayaran aman & diverifikasi admin
      </p>
    </div>
  );
};

export default PaymentForm;
