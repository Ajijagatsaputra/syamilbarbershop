import { Button } from "@/components/ui/button";
import { Scissors, Menu, X, User, Calendar, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Scissors className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
            <span className="text-xl sm:text-2xl font-display tracking-wider text-foreground">
              SYAMIL BARBERSHOP
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#services"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Layanan
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Harga
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Kontak
            </a>
          </div>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Buttons */}
            <Button
              asChild
              className="hidden lg:flex bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/auth/login">Login</Link>
            </Button>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-all duration-300 rounded-lg hover:bg-accent relative"
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm 
        bg-white dark:bg-neutral-900 shadow-2xl z-50 lg:hidden 
        transform transition-transform duration-300 ease-out border-l border-border 
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Scissors className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-foreground font-bold text-base">Menu</h2>
              <p className="text-muted-foreground text-xs">Navigasi Cepat</p>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-[calc(100vh-88px)] pb-6">
          {/* Primary Buttons */}
          <div className="p-6 space-y-3 border-b border-border bg-white dark:bg-neutral-900">
            <Link
              to="/auth/login"
              onClick={closeMenu}
              className="flex items-center justify-between w-full px-5 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">Login</div>
                  <div className="text-xs opacity-90">Masuk ke akun</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="p-6 bg-white dark:bg-neutral-900">
            <p className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-4 font-semibold px-2">
              Menu Utama
            </p>

            <div className="space-y-2">
              {[
                { label: "Layanan Kami", href: "#services" },
                { label: "Galeri", href: "#gallery" },
                { label: "Daftar Harga", href: "#pricing" },
                { label: "Hubungi Kami", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-3.5 text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-muted rounded-xl transition-all duration-200 font-medium group"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 mt-8 bg-muted mx-6 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Scissors className="h-5 w-5 text-primary" />
              <p className="text-foreground font-bold text-sm">
                SYAMIL BARBERSHOP
              </p>
            </div>

            <p className="text-muted-foreground text-xs italic">
              "Your Style, Our Passion"
            </p>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Buka Setiap Hari</p>
              <p className="text-xs text-primary font-semibold">
                09:00 - 21:00 WIB
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
