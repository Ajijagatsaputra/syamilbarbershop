import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-barbershop.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-background/70 backdrop-blur">
            <span className="text-primary text-xs font-semibold tracking-widest">
              PREMIUM BARBERSHOP EXPERIENCE
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            Tampil Lebih Percaya Diri <br />
            <span className="text-primary">
              Dengan Potongan yang Tepat
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Perawatan pria modern dengan barber profesional, teknik presisi,
            dan pengalaman grooming kelas atas.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg px-8 py-6 group"
              asChild
            >
              <Link to="/client/booking">
                Booking Sekarang
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-8 py-6"
              asChild
            >
              <a href="#services">Lihat Layanan</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-16 pt-8 border-t border-border/40 max-w-xl">
            <div>
              <p className="text-3xl md:text-4xl font-display text-primary">
                10+
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Tahun Pengalaman
              </p>
            </div>

            <div>
              <p className="text-3xl md:text-4xl font-display text-primary">
                5K+
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Klien Puas
              </p>
            </div>

            <div>
              <p className="text-3xl md:text-4xl font-display text-primary">
                15+
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Barber Profesional
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
