import { Button } from "@/components/ui/button";
import {
  Scissors,
  Menu,
  X,
  User,
  Calendar,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Mail,
  LogOut,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check for user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user info", e);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Berhasil keluar dari akun.");
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1000);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (href) => {
    closeMenu();
    if (href.startsWith("#")) {
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  const menuItems = [
    { label: "Layanan", href: "#services", icon: Scissors },
    { label: "Harga", href: "#pricing", icon: Calendar },
    { label: "Gallery", href: "#gallery", icon: User },
    { label: "Kontak", href: "#contact", icon: Phone },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-zinc-950/98 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-black/50"
            : "bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800/50"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 md:gap-3 group relative z-50"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full group-hover:bg-amber-500/50 transition-all duration-500"></div>
                <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Scissors className="h-5 w-5 md:h-6 md:w-6 text-zinc-950 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
                  SYAMIL
                </span>
                <span className="text-[10px] md:text-xs text-amber-400 tracking-widest uppercase font-medium">
                  Barbershop
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="px-4 xl:px-5 py-2.5 text-zinc-300 hover:text-amber-400 transition-all duration-300 font-medium text-sm xl:text-base relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-4/5 transition-all duration-500"></span>
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {isAdmin ? (
                // Admin: Dashboard button + Logout button
                <>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 hover:from-amber-400 hover:to-orange-400 font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 px-5"
                  >
                    <a href="/admin" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Dashboard Admin
                    </a>
                  </Button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : user ? (
                // User biasa yang sudah login: avatar dropdown
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 rounded-full border-2 border-amber-500/50 hover:border-amber-500 transition-all bg-zinc-900 overflow-hidden group">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 font-bold group-hover:scale-110 transition-transform">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-zinc-300">
                    <DropdownMenuLabel className="text-white">
                      Akun Saya
                    </DropdownMenuLabel>
                    <div className="px-2 pb-2 text-xs text-zinc-500 truncate">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem className="focus:bg-zinc-800 focus:text-amber-400 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil Saya</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-zinc-800 focus:text-amber-400 cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Pengaturan</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="focus:bg-red-500/10 focus:text-red-500 cursor-pointer text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Belum login: tombol Masuk
                <Button
                  asChild
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 hover:from-amber-400 hover:to-orange-400 font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 px-6"
                >
                  <a href="/auth/login" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Masuk
                  </a>
                </Button>
              )}
            </div>

            {/* Mobile Hamburger - Improved UX */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden relative p-3 rounded-xl transition-all duration-300 z-50 ${
                isMenuOpen
                  ? "bg-amber-500 shadow-lg shadow-amber-500/50"
                  : "bg-zinc-800/80 hover:bg-zinc-700 shadow-md"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span
                  className={`absolute w-6 h-0.5 transition-all duration-300 ${
                    isMenuOpen
                      ? "rotate-45 bg-zinc-950"
                      : "bg-amber-400 -translate-y-2"
                  }`}
                ></span>
                <span
                  className={`absolute w-6 h-0.5 transition-all duration-300 ${
                    isMenuOpen
                      ? "opacity-0 scale-0 bg-zinc-950"
                      : "opacity-100 scale-100 bg-amber-400"
                  }`}
                ></span>
                <span
                  className={`absolute w-6 h-0.5 transition-all duration-300 ${
                    isMenuOpen
                      ? "-rotate-45 bg-zinc-950"
                      : "bg-amber-400 translate-y-2"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Improved */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Slide Panel - Enhanced UX */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 
        bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
        shadow-2xl z-50 lg:hidden 
        transform transition-all duration-500 ease-out 
        ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        border-l border-amber-500/20`}
      >
        {/* Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border-b border-zinc-800">
          <div className="relative flex items-center justify-between p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30">
                <Scissors className="h-7 w-7 text-zinc-950" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">SYAMIL</h2>
                <p className="text-amber-400 text-xs tracking-widest uppercase font-medium">
                  Barbershop
                </p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2.5 text-zinc-400 hover:text-amber-400 transition-all duration-300 rounded-xl hover:bg-zinc-800 active:scale-95"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100vh-90px)] overscroll-contain">
          {/* Login Section - Prominent */}
          <div className="p-5 sm:p-6">
            {user ? (
              // Sudah login (admin atau user biasa)
              <div className="bg-zinc-800/80 p-4 rounded-2xl border border-amber-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-white font-bold truncate">
                      {user.name}
                    </div>
                    <div className="text-zinc-500 text-xs truncate">
                      {user.email}
                    </div>
                    {isAdmin && (
                      <span className="text-xs text-amber-400 font-semibold">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                {isAdmin && (
                  <a
                    href="/admin"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full py-3 mb-3 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-orange-500 transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    Dashboard Admin
                  </a>
                )}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-500"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              // Belum login
              <a
                href="/auth/login"
                onClick={closeMenu}
                className="flex items-center justify-between w-full px-5 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 rounded-2xl hover:from-amber-400 hover:to-orange-500 transition-all duration-300 font-bold group shadow-xl shadow-amber-500/30 active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center backdrop-blur-sm">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base">Masuk Akun</div>
                    <div className="text-xs opacity-80">
                      Login untuk melanjutkan
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="px-5 sm:px-6 pb-6">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4 font-bold px-1">
              Menu Navigasi
            </p>

            <div className="space-y-1.5">
              {menuItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="flex items-center justify-between px-4 py-4 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/80 rounded-xl transition-all duration-300 font-medium group active:scale-98 border border-transparent hover:border-amber-500/20"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 group-hover:bg-gradient-to-br group-hover:from-amber-500/20 group-hover:to-orange-500/20 flex items-center justify-center transition-all duration-300 border border-zinc-700 group-hover:border-amber-500/30">
                      <item.icon className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors duration-300" />
                    </div>
                    <span className="text-base">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Info Card - Enhanced */}
          <div className="px-5 sm:px-6 pb-6">
            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-2xl border border-zinc-700/50 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Scissors className="h-6 w-6 text-zinc-950" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    SYAMIL BARBERSHOP
                  </p>
                  <p className="text-amber-400 text-xs italic">
                    Your Style, Our Passion
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-zinc-400 text-xs mb-1">
                      Jam Operasional
                    </p>
                    <p className="text-white font-semibold text-sm">
                      Setiap Hari, 09:00 - 21:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                    <MapPin className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-zinc-400 text-xs mb-1">Lokasi</p>
                    <p className="text-white font-medium text-sm">
                      Desa Pagedangan, Kecamatan Adiwerna, Kab. Tegal, Jawa
                      Tengah
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                    <Phone className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-zinc-400 text-xs mb-1">Hubungi Kami</p>
                    <p className="text-white font-medium text-sm">
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-5 sm:px-6 pb-6 space-y-3">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 font-bold text-sm shadow-lg shadow-green-600/30 hover:shadow-green-600/50 active:scale-98"
            >
              <Phone className="w-5 h-5" />
              Hubungi via WhatsApp
            </a>

            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#booking");
              }}
              className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all duration-300 font-bold text-sm border border-zinc-700 hover:border-amber-500/50 active:scale-98"
            >
              <Calendar className="w-5 h-5" />
              Booking Sekarang
            </a>
          </div>

          {/* Social Media */}
          <div className="px-5 sm:px-6 pb-8">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4 font-bold px-1">
              Ikuti Kami
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800/80 hover:bg-pink-600 text-zinc-400 hover:text-white rounded-xl transition-all duration-300 border border-zinc-700 hover:border-pink-500 active:scale-95"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800/80 hover:bg-blue-600 text-zinc-400 hover:text-white rounded-xl transition-all duration-300 border border-zinc-700 hover:border-blue-500 active:scale-95"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800/80 hover:bg-amber-600 text-zinc-400 hover:text-white rounded-xl transition-all duration-300 border border-zinc-700 hover:border-amber-500 active:scale-95"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
