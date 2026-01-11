import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="container px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <Scissors className="h-6 w-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  SYAMIL
                </h3>
                <p className="text-xs text-zinc-400 tracking-widest uppercase">
                  Barbershop
                </p>
              </div>
            </div>

            <p className="max-w-md text-sm text-zinc-400 leading-relaxed mb-6">
              Barbershop premium untuk pria modern. Menghadirkan layanan
              profesional, nyaman, dan hasil terbaik untuk menunjang
              kepercayaan diri Anda.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/syamilbarbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 border border-zinc-700 hover:border-transparent flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg hover:shadow-purple-500/20"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/syamilbarbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-blue-600 border border-zinc-700 hover:border-transparent flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg hover:shadow-blue-500/20"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/syamilbarbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-sky-500 border border-zinc-700 hover:border-transparent flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg hover:shadow-sky-500/20"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Layanan", href: "#services" },
                { label: "Harga", href: "#pricing" },
                { label: "Galeri", href: "#gallery" },
                { label: "Tentang Kami", href: "#about" },
                { label: "Kontak", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-zinc-400 hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-yellow-500 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Kontak Kami
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://maps.google.com/?q=Adiwerna,+Tegal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-zinc-400 hover:text-yellow-500 transition-colors group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                  <span className="text-xs leading-relaxed">
                    Desa Pagedangan, Kec. Adiwerna<br />
                    Kab. Tegal, Jawa Tengah
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 text-zinc-400 hover:text-yellow-500 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                  <span className="text-xs">+62 812 3456 7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@syamilbarbershop.com"
                  className="flex items-center gap-3 text-zinc-400 hover:text-yellow-500 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                  <span className="text-xs">info@syamilbarbershop.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-zinc-400">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                  <div className="text-xs">
                    <p>Senin - Jumat: 09:00 - 21:00</p>
                    <p>Sabtu - Minggu: 10:00 - 22:00</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">
              © {currentYear} Syamil Barbershop. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <a
                href="#"
                className="text-zinc-500 hover:text-yellow-500 transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="#"
                className="text-zinc-500 hover:text-yellow-500 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
          
          {/* Credit */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-600">
              Crafted with <span className="text-red-500">♥</span> by Syamil Barbershop Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;