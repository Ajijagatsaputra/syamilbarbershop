import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Scissors,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import bgImage from "@/assets/bg-syamil-barber.png";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password tidak cocok ⚠️", {
        description: "Pastikan password dan konfirmasi password sama.",
        duration: 4000,
      });
      return;
    }
    if (!agreedToTerms) {
      toast.error("Syarat belum disetujui", {
        description:
          "Harap centang persetujuan syarat & ketentuan untuk melanjutkan.",
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    const toastId = toast.loading("Membuat akun...", {
      description: "Mohon tunggu, sedang memproses data Anda.",
    });

    import("@/services/api").then((apiModule) => {
      const api = apiModule.default;
      api
        .post("/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          setIsLoading(false);
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Akun Berhasil Dibuat! 🎊", {
            id: toastId,
            description: `Selamat bergabung, ${user.name}! Kami senang Anda ada di sini.`,
            duration: 4000,
          });

          setTimeout(() => {
            window.location.href = "/client/booking";
          }, 1500);
        })
        .catch((error) => {
          setIsLoading(false);
          const message =
            error.response?.data?.error || "Terjadi kesalahan saat registrasi.";

          toast.error("Registrasi Gagal ❌", {
            id: toastId,
            description: message,
            duration: 5000,
          });
        });
    });
  };

  const getPasswordStrength = () => {
    const pass = formData.password;
    if (!pass) return { strength: 0, text: "", color: "" };
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z0-9]/)) strength++;
    const levels = [
      { strength: 1, text: "Lemah", color: "bg-red-500" },
      { strength: 2, text: "Sedang", color: "bg-yellow-500" },
      { strength: 3, text: "Baik", color: "bg-blue-500" },
      { strength: 4, text: "Kuat", color: "bg-green-500" },
    ];
    return levels[strength - 1] || { strength: 0, text: "", color: "" };
  };

  const passwordMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;
  const passwordMismatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword;
  const strengthInfo = getPasswordStrength();

  const inputBase =
    "w-full py-3.5 bg-neutral-800 border-2 rounded-xl outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── LEFT PANEL: Background Image ── */}
      <div
        className="hidden md:flex md:w-1/2 lg:w-3/5 relative flex-col justify-end"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="relative z-10 p-10 lg:p-14">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <Scissors className="w-6 h-6 text-neutral-900" />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-none">
                SYAMIL
              </p>
              <p className="text-amber-400 text-xs tracking-widest">
                BARBERSHOP
              </p>
            </div>
          </div>

          <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Bergabung &<br />
            <span className="text-amber-400">Dapatkan Layanan</span>
            <br />
            Terbaik Kami.
          </h2>
          <p className="text-neutral-300 text-base max-w-xs">
            Daftar sekarang dan nikmati kemudahan booking, notifikasi, serta
            promo eksklusif.
          </p>

          {/* Benefits */}
          <ul className="mt-8 space-y-3">
            {[
              "Booking online 24/7",
              "Notifikasi jadwal otomatis",
              "Akses promo & diskon member",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-neutral-300 text-sm"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── RIGHT PANEL: Register Form ── */}
      <div className="flex-1 flex flex-col min-h-screen bg-neutral-900 relative overflow-y-auto">
        {/* Mobile background */}
        <div
          className="md:hidden absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="md:hidden absolute inset-0 bg-neutral-900/80" />

        {/* Back button */}
        <div className="relative z-10 p-4 md:p-6 flex-shrink-0">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-all duration-300 group border border-amber-500/20 w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Kembali</span>
          </button>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-start justify-center px-6 md:px-10 lg:px-16 pb-8 relative z-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="md:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <Scissors className="w-5 h-5 text-neutral-900" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">
                  SYAMIL
                </p>
                <p className="text-amber-400 text-xs tracking-widest">
                  BARBERSHOP
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Buat Akun Baru ✂️
              </h1>
              <p className="text-neutral-400 text-sm">
                Lengkapi data diri Anda untuk memulai
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User
                      className={`h-5 w-5 transition-colors ${focusedField === "name" ? "text-amber-500" : "text-neutral-500"}`}
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    className={`${inputBase} pl-12 pr-10 border-neutral-700`}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                  {formData.name && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail
                      className={`h-5 w-5 transition-colors ${focusedField === "email" ? "text-amber-500" : "text-neutral-500"}`}
                    />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className={`${inputBase} pl-12 pr-10 border-neutral-700`}
                    placeholder="nama@email.com"
                    required
                  />
                  {formData.email && formData.email.includes("@") && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  No. Telepon <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone
                      className={`h-5 w-5 transition-colors ${focusedField === "phone" ? "text-amber-500" : "text-neutral-500"}`}
                    />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField("")}
                    className={`${inputBase} pl-12 pr-10 border-neutral-700`}
                    placeholder="08123456789"
                    required
                  />
                  {formData.phone && formData.phone.length >= 10 && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 transition-colors ${focusedField === "password" ? "text-amber-500" : "text-neutral-500"}`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className={`${inputBase} pl-12 pr-12 border-neutral-700`}
                    placeholder="Minimal 8 karakter"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${level <= strengthInfo.strength ? strengthInfo.color : "bg-neutral-700"}`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${strengthInfo.color.replace("bg-", "text-")}`}
                    >
                      Password {strengthInfo.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Konfirmasi Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 transition-colors ${focusedField === "confirmPassword" ? "text-amber-500" : "text-neutral-500"}`}
                    />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField("")}
                    className={`${inputBase} pl-12 pr-12 ${passwordMismatch ? "border-red-500" : passwordMatch ? "border-green-500" : "border-neutral-700"}`}
                    placeholder="Ulangi password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-amber-500 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {passwordMatch ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <p className="text-xs text-green-500">Password cocok</p>
                      </>
                    ) : (
                      <>
                        <X className="h-3.5 w-3.5 text-red-500" />
                        <p className="text-xs text-red-500">
                          Password tidak cocok
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 bg-neutral-800/60 p-3.5 rounded-xl border border-neutral-700">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded border-neutral-600 bg-neutral-700 accent-amber-500 cursor-pointer flex-shrink-0"
                />
                <label className="text-xs text-neutral-400 cursor-pointer leading-relaxed">
                  Saya setuju dengan{" "}
                  <a
                    href="#"
                    className="text-amber-500 hover:text-amber-400 transition-colors font-medium"
                  >
                    Syarat & Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a
                    href="#"
                    className="text-amber-500 hover:text-amber-400 transition-colors font-medium"
                  >
                    Kebijakan Privasi
                  </a>{" "}
                  yang berlaku
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !agreedToTerms}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-amber-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group uppercase tracking-wider text-sm mt-1"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Scissors className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Daftar Sekarang</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-neutral-900 text-neutral-500">
                  atau daftar dengan
                </span>
              </div>
            </div>

            {/* Social Register */}
            {/* <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl hover:border-amber-500/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium text-neutral-300 group-hover:text-amber-500 transition-colors">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl hover:border-amber-500/50 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-neutral-300 group-hover:text-amber-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-medium text-neutral-300 group-hover:text-amber-500 transition-colors">GitHub</span>
              </button>
            </div> */}

            {/* Login link */}
            <p className="text-center text-sm text-neutral-500 mt-6 mb-4">
              Sudah punya akun?{" "}
              <a
                href="/auth/login"
                className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
              >
                Login di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
