import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Clock, User, Phone, CreditCard, ArrowLeft, Sparkles, Copy, Home } from "lucide-react";

const services = [
  { id: "haircut", name: "Potong Rambut", price: 50000, duration: "30 menit" },
  { id: "styling", name: "Hair Styling", price: 75000, duration: "45 menit" },
  { id: "coloring", name: "Pewarnaan", price: 150000, duration: "90 menit" },
  { id: "treatment", name: "Hair Treatment", price: 100000, duration: "60 menit" }
];

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const paymentMethods = [
  { 
    id: "dana", 
    name: "DANA", 
    icon: "💳",
    account: "0812-3456-7890",
    accountName: "Barbershop Elite"
  },
  { 
    id: "gopay", 
    name: "GoPay", 
    icon: "🏍️",
    account: "0812-3456-7890",
    accountName: "Barbershop Elite"
  },
  { 
    id: "ovo", 
    name: "OVO", 
    icon: "💜",
    account: "0812-3456-7890",
    accountName: "Barbershop Elite"
  },
  { 
    id: "transfer", 
    name: "Transfer Bank BCA", 
    icon: "🏦",
    account: "1234567890",
    accountName: "PT Barbershop Elite"
  },
  { 
    id: "qris", 
    name: "QRIS", 
    icon: "📱",
    qrCode: true
  }
];

const FormBookingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    payment: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const selectedService = services.find(s => s.id === formData.service);
  const selectedPayment = paymentMethods.find(p => p.id === formData.payment);

  const validateStep = (currentStep) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.service) newErrors.service = "Pilih layanan terlebih dahulu";
      if (!formData.date) newErrors.date = "Pilih tanggal booking";
      if (!formData.time) newErrors.time = "Pilih waktu booking";
    } else if (currentStep === 2) {
      if (!formData.name) newErrors.name = "Nama harus diisi";
      if (!formData.phone) newErrors.phone = "Nomor WhatsApp harus diisi";
      else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = "Nomor WhatsApp tidak valid";
      }
    } else if (currentStep === 3) {
      if (!formData.payment) newErrors.payment = "Pilih metode pembayaran";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
      }, 2000);
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(""), 2000);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all border-2 ${
                  step > s ? "bg-emerald-500 border-emerald-500 text-white" :
                  step === s ? "bg-yellow-500 border-yellow-500 text-black shadow-lg shadow-yellow-500/50 scale-105 sm:scale-110" :
                  "bg-transparent border-zinc-700 text-zinc-600"
                }`}>
                  {step > s ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 sm:w-24 md:w-32 h-0.5 mx-2 rounded transition-all ${
                    step > s ? "bg-emerald-500" : "bg-zinc-800"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8 sm:gap-16 md:gap-24 text-[10px] sm:text-xs text-zinc-500">
            <span className={step === 1 ? "text-yellow-500 font-semibold" : ""}>Layanan</span>
            <span className={step === 2 ? "text-yellow-500 font-semibold" : ""}>Data Diri</span>
            <span className={step === 3 ? "text-yellow-500 font-semibold" : ""}>Pembayaran</span>
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Pilih Layanan</h2>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => updateField("service", service.id)}
                  className={`w-full p-3 sm:p-4 rounded-lg border transition-all ${
                    formData.service === service.id
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-zinc-800 hover:border-zinc-700 bg-zinc-800/50"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-left">
                      <h3 className="font-semibold text-white text-sm sm:text-base">{service.name}</h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1">⏱️ {service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-500 text-sm sm:text-base">Rp {service.price.toLocaleString()}</p>
                    </div>
                  </div>
                </button>
              ))}
              {errors.service && <p className="text-red-400 text-xs sm:text-sm">{errors.service}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300 mb-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  Tanggal
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-zinc-800 text-white text-sm sm:text-base focus:outline-none focus:border-yellow-500 transition-all ${
                    errors.date ? "border-red-500" : "border-zinc-700"
                  }`}
                />
                {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300 mb-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  Waktu
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-zinc-800 text-white text-sm sm:text-base focus:outline-none focus:border-yellow-500 transition-all ${
                    errors.time ? "border-red-500" : "border-zinc-700"
                  }`}
                >
                  <option value="">Pilih waktu</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full py-4 sm:py-6 text-base sm:text-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Lanjutkan
            </Button>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Data Diri</h2>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300 mb-2">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-zinc-800 text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none focus:border-yellow-500 transition-all ${
                    errors.name ? "border-red-500" : "border-zinc-700"
                  }`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300 mb-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="08123456789"
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-zinc-800 text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none focus:border-yellow-500 transition-all ${
                    errors.phone ? "border-red-500" : "border-zinc-700"
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Summary Preview */}
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-medium text-zinc-300 mb-2">Ringkasan Booking:</p>
              <div className="space-y-1 text-xs sm:text-sm text-zinc-400">
                <p>✨ {selectedService?.name}</p>
                <p>📅 {formData.date} • {formData.time}</p>
                <p className="font-semibold text-yellow-500">💰 Rp {selectedService?.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <Button onClick={handleBack} variant="outline" className="flex-1 py-4 sm:py-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm sm:text-base">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Kembali
              </Button>
              <Button onClick={handleNext} className="flex-1 py-4 sm:py-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm sm:text-base">
                Lanjutkan
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 sm:p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Metode Pembayaran</h2>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {paymentMethods.map((method) => (
                <div key={method.id}>
                  <button
                    onClick={() => updateField("payment", method.id)}
                    className={`w-full p-3 sm:p-4 rounded-lg border text-left transition-all flex items-center gap-2 sm:gap-3 ${
                      formData.payment === method.id
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-zinc-800 hover:border-zinc-700 bg-zinc-800/50"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{method.icon}</span>
                    <span className="font-semibold text-white text-sm sm:text-base">{method.name}</span>
                  </button>

                  {/* Dropdown Payment Details */}
                  {formData.payment === method.id && (
                    <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-zinc-800 border border-zinc-700 rounded-lg animate-in slide-in-from-top-2 duration-300">
                      {method.qrCode ? (
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-zinc-400 mb-3">Scan QR Code untuk pembayaran</p>
                          <div className="bg-white p-3 sm:p-4 rounded-lg inline-block">
                            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded flex items-center justify-center">
                              <p className="text-zinc-600 text-xs">QR Code QRIS</p>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-500 mt-3">
                            Total: <span className="font-bold text-yellow-500">Rp {selectedService?.price.toLocaleString()}</span>
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 sm:space-y-3">
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Nomor Rekening / Akun</p>
                            <div className="flex items-center justify-between bg-zinc-900 p-2 sm:p-3 rounded border border-zinc-700">
                              <span className="text-white font-mono text-sm sm:text-base">{method.account}</span>
                              <button
                                onClick={() => copyToClipboard(method.account)}
                                className="text-yellow-500 hover:text-yellow-400 transition-colors p-1"
                              >
                                {copiedText === method.account ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Atas Nama</p>
                            <div className="bg-zinc-900 p-2 sm:p-3 rounded border border-zinc-700">
                              <span className="text-white text-sm sm:text-base">{method.accountName}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Jumlah Transfer</p>
                            <div className="flex items-center justify-between bg-zinc-900 p-2 sm:p-3 rounded border border-zinc-700">
                              <span className="text-yellow-500 font-bold text-sm sm:text-base">Rp {selectedService?.price.toLocaleString()}</span>
                              <button
                                onClick={() => copyToClipboard(selectedService?.price.toString())}
                                className="text-yellow-500 hover:text-yellow-400 transition-colors p-1"
                              >
                                {copiedText === selectedService?.price.toString() ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-zinc-500 italic">
                            💡 Transfer sesuai nominal yang tertera untuk verifikasi otomatis
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {errors.payment && <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.payment}</p>}
            </div>

            {/* Total Summary */}
            <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 text-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                <span className="text-xs sm:text-sm text-zinc-400">Total Pembayaran</span>
                <span className="text-2xl sm:text-3xl font-bold text-yellow-500">Rp {selectedService?.price.toLocaleString()}</span>
              </div>
              <div className="text-xs text-zinc-500 space-y-1 border-t border-zinc-700 pt-3 mt-3">
                <p className="break-words">{selectedService?.name} • {formData.date} • {formData.time}</p>
                <p className="break-words">{formData.name} • {formData.phone}</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <Button onClick={handleBack} variant="outline" className="flex-1 py-4 sm:py-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm sm:text-base">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Kembali
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isProcessing}
                className="flex-1 py-4 sm:py-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Memproses..." : "Konfirmasi & Bayar"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 sm:p-6 md:p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Booking Berhasil! 🎉</h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6">Terima kasih telah melakukan booking. Silakan lakukan pembayaran dan kami akan menghubungi Anda melalui WhatsApp.</p>
            
            <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-left space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Detail Booking:</h3>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-zinc-400">
                <p className="break-words">🎯 <strong className="text-zinc-300">Layanan:</strong> {selectedService?.name}</p>
                <p>📅 <strong className="text-zinc-300">Tanggal:</strong> {formData.date}</p>
                <p>⏰ <strong className="text-zinc-300">Waktu:</strong> {formData.time}</p>
                <p className="break-words">👤 <strong className="text-zinc-300">Nama:</strong> {formData.name}</p>
                <p className="break-words">📱 <strong className="text-zinc-300">WhatsApp:</strong> {formData.phone}</p>
                <p className="break-words">💳 <strong className="text-zinc-300">Pembayaran:</strong> {selectedPayment?.name}</p>
                <p className="text-base sm:text-lg font-bold text-yellow-500 pt-2 border-t border-zinc-700">💰 Total: Rp {selectedService?.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Button 
                onClick={() => {
                  setStep(1);
                  setFormData({ service: "", date: "", time: "", name: "", phone: "", payment: "" });
                  setErrors({});
                  setCopiedText("");
                }}
                className="w-full py-4 sm:py-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm sm:text-base"
              >
                Buat Booking Baru
              </Button>
              
              <Button 
                onClick={goToHome}
                variant="outline"
                className="w-full py-4 sm:py-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm sm:text-base"
              >
                <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Kembali ke Halaman Utama
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBookingPage;