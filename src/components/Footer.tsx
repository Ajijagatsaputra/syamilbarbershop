import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* BRAND */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-wide">
                SYAMIL BARBERSHOP
              </span>
            </div>

            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              Barbershop premium untuk pria modern. Menghadirkan layanan
              profesional, nyaman, dan hasil terbaik untuk menunjang
              kepercayaan diri Anda.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Syamil Barbershop. All rights reserved.
        </div>
      </div>
    </footer>
  ); 
};

export default Footer;
