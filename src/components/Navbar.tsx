import { Button } from "@/components/ui/button";
import { Scissors, Menu, X, User, Calendar, ChevronRight, Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (href) => {
    closeMenu();
    // Handle navigation - dalam implementasi sebenarnya gunakan router
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-zinc-800 shadow-lg shadow-black/50"
          : "bg-black/80 backdrop-blur-sm border-b border-zinc-900"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full group-hover:bg-yellow-500/30 transition-all"></div>
              <Scissors className="h-8 w-8 text-yellow-500 transition-transform group-hover:rotate-12 relative z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold tracking-wide text-white block leading-none">
                SYAMIL
              </span>
              <span className="text-xs text-zinc-400 tracking-widest uppercase">
                Barbershop
              </span>
            </div>
            <span className="sm:hidden text-lg font-bold text-white">
              SYAMIL
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: "Layanan", href: "#services" },
              { label: "Harga", href: "#pricing" },
              { label: "Galeri", href: "#gallery" },
              { label: "Kontak", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-4 py-2 text-zinc-300 hover:text-yellow-500 transition-all duration-200 font-medium text-sm relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-500 group-hover:w-3/4 transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Login Button */}
            <Button
              asChild
              className="hidden lg:flex bg-yellow-500 text-black hover:bg-yellow-400 font-semibold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all"
            >
              <a href="/auth/login">
                <User className="w-4 h-4 mr-2" />
                Login
              </a>
            </Button>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-zinc-300 hover:text-yellow-500 transition-all duration-300 rounded-lg hover:bg-zinc-800/50 relative"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-4 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm 
        bg-zinc-900 shadow-2xl z-50 lg:hidden 
        transform transition-transform duration-300 ease-out border-l border-zinc-800
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Menu Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
          <div className="relative flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Scissors className="h-6 w-6 text-black" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">SYAMIL</h2>
                <p className="text-zinc-400 text-xs tracking-wider">
                  BARBERSHOP
                </p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 text-zinc-400 hover:text-yellow-500 transition-colors rounded-lg hover:bg-zinc-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-[calc(100vh-88px)] pb-6">
          {/* Login Button */}
          <div className="p-6 space-y-3 border-b border-zinc-800">
            <a
              href="/auth/login"
              onClick={closeMenu}
              className="flex items-center justify-between w-full px-5 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 font-bold group shadow-lg shadow-yellow-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Login</div>
                  <div className="text-xs opacity-80">Masuk ke akun Anda</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Main Navigation */}
          <div className="p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4 font-semibold px-2">
              Menu Utama
            </p>

            <div className="space-y-2">
              {[
                { label: "Layanan Kami", href: "#services", icon: Scissors },
                { label: "Daftar Harga", href: "#pricing", icon: Calendar },
                { label: "Galeri", href: "#gallery", icon: User },
                { label: "Hubungi Kami", href: "#contact", icon: Phone },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="flex items-center justify-between px-4 py-3.5 text-zinc-300 hover:text-yellow-500 hover:bg-zinc-800 rounded-xl transition-all duration-200 font-medium group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-zinc-500 group-hover:text-yellow-500 transition-colors" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="px-6 py-4 mx-6 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <Scissors className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">
                  SYAMIL BARBERSHOP
                </p>
                <p className="text-zinc-400 text-xs italic">
                  Your Style, Our Passion
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-zinc-700">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-yellow-500" />
                <div>
                  <p className="text-zinc-400">Buka Setiap Hari</p>
                  <p className="text-yellow-500 font-semibold">
                    09:00 - 21:00 WIB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                <p className="text-zinc-400">Purwokerto, Jawa Tengah</p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-yellow-500" />
                <p className="text-zinc-400">+62 812-3456-7890</p>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="px-6 mt-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all font-semibold text-sm shadow-lg shadow-green-600/20"
            >
              <Phone className="w-4 h-4" />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;