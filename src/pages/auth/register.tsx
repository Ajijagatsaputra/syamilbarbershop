import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Scissors, ArrowLeft, Check, X } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    if (!agreedToTerms) {
      alert('Harap setujui syarat dan ketentuan');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Registrasi berhasil! Selamat datang di BarberShop.');
    }, 1500);
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  // Password strength checker
  const getPasswordStrength = () => {
    const pass = formData.password;
    if (!pass) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^a-zA-Z0-9]/)) strength++;

    const levels = [
      { strength: 1, text: 'Lemah', color: 'bg-red-500' },
      { strength: 2, text: 'Sedang', color: 'bg-yellow-500' },
      { strength: 3, text: 'Baik', color: 'bg-blue-500' },
      { strength: 4, text: 'Kuat', color: 'bg-green-500' }
    ];

    return levels[strength - 1] || { strength: 0, text: '', color: '' };
  };

  const passwordMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordMismatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;
  const strengthInfo = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4 py-8 relative overflow-hidden">
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

      {/* Animated Scissors - Hidden on mobile for cleaner look */}
      <div className="hidden md:block absolute top-20 left-10 text-amber-500/20 animate-pulse">
        <Scissors className="w-16 h-16 rotate-45" />
      </div>
      <div className="hidden md:block absolute bottom-20 right-10 text-amber-500/20 animate-pulse">
        <Scissors className="w-20 h-20 -rotate-45" />
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-neutral-800/90 backdrop-blur-sm hover:bg-neutral-700 text-white rounded-lg transition-all duration-300 group border border-amber-500/20 shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm md:text-base">Kembali</span>
      </button>

      {/* Register Card */}
      <div className="relative w-full max-w-lg my-8">
        <div className="bg-neutral-800 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-amber-500/30 relative overflow-hidden">
          {/* Decorative corner stripes */}
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tr from-amber-500/10 to-transparent"></div>

          {/* Header */}
          <div className="text-center mb-6 md:mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-3 md:mb-4 shadow-lg relative">
              <Scissors className="w-8 h-8 md:w-10 md:h-10 text-neutral-900" />
              <div className="absolute inset-0 rounded-full border-4 border-amber-400/30 animate-ping"></div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Daftar Akun
            </h1>
            <p className="text-amber-500 font-semibold tracking-wider text-xs md:text-sm">
              BERGABUNG DENGAN KAMI
            </p>
            <p className="text-neutral-400 mt-2 text-sm md:text-base">Buat akun baru untuk memulai</p>
          </div>

          {/* Form */}
          <div className="space-y-4 md:space-y-5 relative z-10">
            {/* Name Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${focusedField === 'name' ? 'text-amber-500' : 'text-neutral-500'}`} />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm md:text-base"
                  placeholder="Masukkan nama lengkap"
                  required
                />
                {formData.name && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${focusedField === 'email' ? 'text-amber-500' : 'text-neutral-500'}`} />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm md:text-base"
                  placeholder="nama@email.com"
                  required
                />
                {formData.email && formData.email.includes('@') && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Phone Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <Phone className={`h-5 w-5 transition-colors ${focusedField === 'phone' ? 'text-amber-500' : 'text-neutral-500'}`} />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm md:text-base"
                  placeholder="08123456789"
                  required
                />
                {formData.phone && formData.phone.length >= 10 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${focusedField === 'password' ? 'text-amber-500' : 'text-neutral-500'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full pl-10 md:pl-12 pr-12 py-2.5 md:py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm md:text-base"
                  placeholder="Minimal 8 karakter"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center text-neutral-500 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= strengthInfo.strength ? strengthInfo.color : 'bg-neutral-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p className={`text-xs ${strengthInfo.color.replace('bg-', 'text-')}`}>
                    Password {strengthInfo.text}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${focusedField === 'confirmPassword' ? 'text-amber-500' : 'text-neutral-500'}`} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full pl-10 md:pl-12 pr-12 py-2.5 md:py-3 bg-neutral-700 border-2 ${
                    passwordMismatch ? 'border-red-500' : passwordMatch ? 'border-green-500' : 'border-neutral-600'
                  } rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 text-white placeholder-neutral-500 text-sm md:text-base`}
                  placeholder="Ulangi password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center text-neutral-500 hover:text-amber-500 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {passwordMatch ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-500">Password cocok</p>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-500" />
                      <p className="text-xs text-red-500">Password tidak cocok</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 bg-neutral-700/50 p-3 md:p-4 rounded-lg border border-neutral-600">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                className="w-5 h-5 mt-0.5 rounded border-neutral-600 bg-neutral-700 text-amber-500 focus:ring-amber-500 cursor-pointer flex-shrink-0"
              />
              <label className="text-xs md:text-sm text-neutral-300 cursor-pointer leading-relaxed">
                Saya setuju dengan{' '}
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors font-medium underline">
                  Syarat & Ketentuan
                </a>{' '}
                dan{' '}
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors font-medium underline">
                  Kebijakan Privasi
                </a>{' '}
                yang berlaku
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold py-3 md:py-3.5 px-6 rounded-lg shadow-lg hover:shadow-amber-500/50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group uppercase tracking-wider text-sm md:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin"></div>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Daftar Sekarang</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-700"></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span className="px-4 bg-neutral-800 text-neutral-500">atau daftar dengan</span>
            </div>
          </div>

          {/* Social Register */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg hover:border-amber-500 hover:bg-neutral-600 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-xs md:text-sm font-medium text-neutral-300 group-hover:text-amber-500">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-neutral-700 border-2 border-neutral-600 rounded-lg hover:border-amber-500 hover:bg-neutral-600 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 flex-shrink-0 text-neutral-300 group-hover:text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="text-xs md:text-sm font-medium text-neutral-300 group-hover:text-amber-500">GitHub</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-xs md:text-sm text-neutral-400 mt-6 md:mt-8">
            Sudah punya akun?{' '}
            <a href="/auth/login" className="text-amber-500 hover:text-amber-400 font-semibold transition-colors">
              Login di sini
            </a>
          </p>

          {/* Barbershop Pole Decoration - Hidden on mobile */}
          <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-40 bg-gradient-to-b from-red-600 via-white to-blue-600 rounded-full opacity-20"></div>
          <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-40 bg-gradient-to-b from-red-600 via-white to-blue-600 rounded-full opacity-20"></div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center mt-4 md:mt-6 text-neutral-500 text-xs md:text-sm italic">
          "Start Your Grooming Journey Today"
        </p>
      </div>
    </div>
  );
}