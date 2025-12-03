import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Scissors, ArrowLeft, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { z } from 'zod';

// Zod Schema untuk validasi
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(6, 'Password minimal 6 karakter')
    .max(50, 'Password maksimal 50 karakter'),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Validasi dengan Zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      // Format error dari Zod
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);

      // Toast untuk error validasi
      toast({
        variant: "destructive",
        title: "Validasi Gagal",
        description: "Mohon periksa kembali form Anda",
        duration: 3000,
      });
      return;
    }

    // Simulasi proses login
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Cek apakah email adalah admin
      const isAdmin = email === 'admin@gmail.com';
      
      // Toast sukses
      toast({
        title: "Login Berhasil! ✂️",
        description: `Selamat datang kembali${isAdmin ? ', Admin' : ''}!`,
        duration: 3000,
        className: "bg-green-600 text-white border-green-700",
      });

      // Redirect berdasarkan role
      setTimeout(() => {
        if (isAdmin) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      }, 1500);
    }, 1500);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4 relative overflow-hidden">
        {/* Barbershop Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255,215,0,0.1) 35px,
              rgba(255,215,0,0.1) 70px
            )`
          }}></div>
        </div>

        {/* Animated Scissors */}
        <div className="absolute top-20 left-10 text-amber-500/20 animate-pulse">
          <Scissors className="w-16 h-16 rotate-45" />
        </div>
        <div className="absolute bottom-20 right-10 text-amber-500/20 animate-pulse delay-1000">
          <Scissors className="w-20 h-20 -rotate-45" />
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-all duration-300 group border border-amber-500/20"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali</span>
        </button>

        {/* Login Card */}
        <div className="relative w-full max-w-md">
          <div className="bg-neutral-800 rounded-2xl shadow-2xl p-8 md:p-10 border-2 border-amber-500/30 relative overflow-hidden">
            {/* Decorative corner stripes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/10 to-transparent"></div>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4 shadow-lg relative">
                <Scissors className="w-10 h-10 text-neutral-900" />   
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/30 animate-ping"></div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Syamil
              </h1>
              <p className="text-amber-500 font-semibold tracking-wider text-sm">
                 BARBERSHOP
              </p>
              <p className="text-neutral-400 mt-3">Silakan login ke akun Anda</p>
            </div>

            {/* Form */}
            <div className="space-y-6 relative z-10">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${
                      errors.email ? 'text-red-500' : 'text-neutral-500 group-focus-within:text-amber-500'
                    }`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        const newErrors = { ...errors };
                        delete newErrors.email;
                        setErrors(newErrors);
                      }
                    }}
                    className={`w-full pl-12 pr-4 py-3 bg-neutral-700 border-2 rounded-lg outline-none transition-all duration-300 text-white placeholder-neutral-500 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-neutral-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
                    placeholder="nama@email.com"
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span>•</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${
                      errors.password ? 'text-red-500' : 'text-neutral-500 group-focus-within:text-amber-500'
                    }`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        const newErrors = { ...errors };
                        delete newErrors.password;
                        setErrors(newErrors);
                      }
                    }}
                    className={`w-full pl-12 pr-12 py-3 bg-neutral-700 border-2 rounded-lg outline-none transition-all duration-300 text-white placeholder-neutral-500 ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-neutral-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    }`}
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
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <span>•</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="ml-2 text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    Ingat saya
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => toast({
                    title: "Fitur Segera Hadir",
                    description: "Fitur reset password akan segera tersedia",
                    duration: 3000,
                  })}
                  className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-amber-500/50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group uppercase tracking-wider"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Scissors className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Login</span>
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-neutral-800 text-neutral-500">atau login dengan</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <button
                type="button"
                onClick={() => toast({
                  title: "Google Login",
                  description: "Integrasi Google akan segera tersedia",
                  duration: 3000,
                })}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg hover:border-amber-500 hover:bg-neutral-600 transition-all duration-300 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <span className="text-sm font-medium text-neutral-300 group-hover:text-amber-500">Google</span>
              </button>
              <button
                type="button"
                onClick={() => toast({
                  title: "GitHub Login",
                  description: "Integrasi GitHub akan segera tersedia",
                  duration: 3000,
                })}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg hover:border-amber-500 hover:bg-neutral-600 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-neutral-300 group-hover:text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-medium text-neutral-300 group-hover:text-amber-500">GitHub</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-neutral-400 mt-8">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => toast({
                  title: "Registrasi",
                  description: "Halaman registrasi akan segera tersedia",
                  duration: 3000,
                })}
                className="text-amber-500 hover:text-amber-400 font-semibold transition-colors"
              >
                Daftar sekarang
              </button>
            </p>

            {/* Barbershop Pole Decoration */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-40 bg-gradient-to-b from-red-600 via-white to-blue-600 rounded-full opacity-20"></div>
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-40 bg-gradient-to-b from-red-600 via-white to-blue-600 rounded-full opacity-20"></div>
          </div>

          {/* Bottom tagline */}
          <p className="text-center mt-6 text-neutral-500 text-sm italic">
            "Your Style, Our Passion"
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}