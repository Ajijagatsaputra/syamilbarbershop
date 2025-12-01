import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-barbershop.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-32">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 px-4 py-2 border border-primary/30 rounded-full">
            <span className="text-primary text-sm font-medium tracking-wider">
              PREMIUM GROOMING EXPERIENCE
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display mb-6 leading-none tracking-tight">
            STYLE <br />
            <span className="text-primary">REDEFINED</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            Transformasi penampilan Anda dengan sentuhan profesional dari barber berpengalaman
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group"
              asChild
            >
              <a href="#contact">
                Booking Sekarang
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
              asChild
            >
              <a href="#services">Lihat Layanan</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div>
              <div className="text-4xl font-display text-primary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-4xl font-display text-primary mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Klien Puas</div>
            </div>
            <div>
              <div className="text-4xl font-display text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Barber Expert</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
