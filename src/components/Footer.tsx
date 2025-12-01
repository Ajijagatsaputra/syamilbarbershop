import { Scissors } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-xl font-display tracking-wider">
                SYAMIL BARBERSHOP
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Premium men's perawatan dengan layanan profesional dan pengalaman
              terbaik untuk penampilan sempurna Anda.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Layanan
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Harga
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Admin</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/owner"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Owner Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2025 Syamil Barbershop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
