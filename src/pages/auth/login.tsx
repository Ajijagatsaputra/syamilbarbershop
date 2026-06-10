import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Scissors,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import bgImage from "@/assets/bg-syamil-barber.png";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(50, "Password maksimal 50 karakter"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0] as string] = err.message;
      });
      setErrors(formattedErrors);
      toast.error('Form belum lengkap ⚠️', {
        description: 'Mohon periksa kembali email dan password Anda.',
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    const toastId = toast.loading('Memeriksa akun...', {
      description: 'Mohon tunggu sebentar.',
    });

    import("@/services/api").then((apiModule) => {
      const api = apiModule.default;
      api
        .post("/login", { email, password })
        .then((response) => {
          setIsLoading(false);
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.success('Login Berhasil! 🎉', {
            id: toastId,
            description: `Selamat datang kembali, ${user.name}! Anda akan diarahkan segera.`,
            duration: 3000,
          });

          setTimeout(() => {
            window.location.href = user.role === "admin" ? "/admin" : "/";
          }, 1500);
        })
        .catch((error) => {
          setIsLoading(false);
          const message = error.response?.data?.error || 'Email atau password salah.';

          toast.error('Login Gagal ❌', {
            id: toastId,
            description: message,
            duration: 5000,
          });
        });
    });
  };

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
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Content overlay */}
        <div className="relative z-10 p-10 lg:p-16">
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

          <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Tampil Keren,
            <br />
            <span className="text-amber-400">Percaya Diri.</span>
          </h2>
          <p className="text-neutral-300 text-lg max-w-md">
            Layanan potong rambut premium dengan barber berpengalaman untuk
            tampilan terbaik Anda.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[
              { value: "500+", label: "Pelanggan Puas" },
              { value: "5+", label: "Tahun Pengalaman" },
              { value: "10+", label: "Layanan Tersedia" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-amber-400 text-2xl font-bold">
                  {stat.value}
                </p>
                <p className="text-neutral-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div className="flex-1 flex flex-col min-h-screen bg-neutral-900 relative">
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
        <div className="relative z-10 p-4 md:p-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-all duration-300 group border border-amber-500/20 w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Kembali</span>
          </button>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-10 lg:px-16 pb-8 relative z-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="md:hidden flex items-center gap-3 mb-8">
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
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Selamat Datang 👋
              </h1>
              <p className="text-neutral-400">
                Masuk ke akun Anda untuk melanjutkan
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail
                      className={`h-5 w-5 transition-colors ${errors.email ? "text-red-500" : "text-neutral-500 group-focus-within:text-amber-500"}`}
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((p) => {
                          const n = { ...p };
                          delete n.email;
                          return n;
                        });
                    }}
                    className={`w-full pl-12 pr-4 py-3.5 bg-neutral-800 border-2 rounded-xl outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-neutral-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"}`}
                    placeholder="nama@email.com"
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <span>•</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 transition-colors ${errors.password ? "text-red-500" : "text-neutral-500 group-focus-within:text-amber-500"}`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((p) => {
                          const n = { ...p };
                          delete n.password;
                          return n;
                        });
                    }}
                    className={`w-full pl-12 pr-12 py-3.5 bg-neutral-800 border-2 rounded-xl outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm ${errors.password ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-neutral-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"}`}
                    placeholder="••••••••"
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
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <span>•</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer gap-2 group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500"
                  />
                  <span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    Ingat saya
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    toast("Fitur reset password akan segera tersedia")
                  }
                  className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-amber-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group uppercase tracking-wider text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Scissors className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Masuk Sekarang</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-neutral-900 text-neutral-500">
                  atau masuk dengan
                </span>
              </div>
            </div>

            {/* Social Login */}
            {/* <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toast("Integrasi Google akan segera tersedia")}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl hover:border-amber-500/50 hover:bg-neutral-750 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium text-neutral-300 group-hover:text-amber-500 transition-colors">
                  Google
                </span>
              </button>
              <button
                type="button"
                onClick={() => toast("Integrasi GitHub akan segera tersedia")}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 border-2 border-neutral-700 rounded-xl hover:border-amber-500/50 hover:bg-neutral-750 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 text-neutral-300 group-hover:text-amber-500 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-medium text-neutral-300 group-hover:text-amber-500 transition-colors">
                  GitHub
                </span>
              </button>
            </div> */}

            {/* Sign up link */}
            <p className="text-center text-sm text-neutral-500 mt-8">
              Belum punya akun?{" "}
              <a
                href="/auth/register"
                className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>

        {/* Footer tagline */}
        <div className="relative z-10 text-center pb-6">
          <p className="text-neutral-600 text-xs italic">
            "Your Style, Our Passion"
          </p>
        </div>
      </div>
    </div>
  );
}
