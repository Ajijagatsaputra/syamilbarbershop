import { Button } from "@/components/ui/button";
import { ArrowRight, Scissors, Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-barbershop.jpg";
import { useEffect, useRef, useState } from "react";
import { useCountAnimation } from "@/hooks/useScrollAnimation";

// Floating particles component
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: Math.random() * 8 + 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background:
              p.id % 3 === 0
                ? "hsl(43 96% 56% / 0.8)"
                : p.id % 3 === 1
                  ? "hsl(43 96% 80% / 0.5)"
                  : "hsl(0 0% 100% / 0.3)",
          }}
        />
      ))}
    </div>
  );
};

// Animated stat card
const StatCard = ({
  icon: Icon,
  target,
  suffix,
  label,
  delay,
  trigger,
}: {
  icon: React.ElementType;
  target: number;
  suffix: string;
  label: string;
  delay: number;
  trigger: boolean;
}) => {
  const count = useCountAnimation(target, 2000, trigger);
  return (
    <div
      className="reveal-hidden is-visible text-center group"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-3xl md:text-4xl font-display text-primary font-bold">
        {count}
        {suffix}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Rotating ring decorations
  const rings = [
    { size: 300, speed: "animate-rotate-slow", border: "border-primary/10" },
    {
      size: 450,
      speed: "animate-rotate-slow-ccw",
      border: "border-primary/5",
    },
    { size: 600, speed: "animate-rotate-slow", border: "border-white/5" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Background Image ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/97 via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* ── Floating Particles ── */}
      <Particles />

      {/* ── Animated Rings (right side) ── */}
      <div className="absolute right-[-5%] top-[10%] hidden lg:block pointer-events-none z-[1]">
        {rings.map((ring, i) => (
          <div
            key={i}
            className={`absolute border rounded-full ${ring.speed} ${ring.border}`}
            style={{
              width: ring.size,
              height: ring.size,
              top: "50%",
              left: "50%",
              marginTop: -ring.size / 2,
              marginLeft: -ring.size / 2,
            }}
          />
        ))}
        {/* Center scissors icon */}
        <div className="relative w-32 h-32 flex items-center justify-center animate-float-slow">
          <div className="w-20 h-20 rounded-full bg-primary/10 backdrop-blur flex items-center justify-center animate-pulse-glow">
            <Scissors className="w-10 h-10 text-primary" />
          </div>
        </div>
      </div>

      {/* ── Gold gradient orbs ── */}
      <div className="absolute top-20 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-orb-pulse-delay pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="relative z-10 container px-4 py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/40 bg-background/60 backdrop-blur transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Premium Barbershop Experience
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-150 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Tampil Lebih{" "}
            <span className="relative">
              <span className="animate-shimmer-text">Percaya Diri</span>
              {/* Underline decoration */}
              <span
                className={`absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary via-yellow-300 to-primary rounded-full transition-all duration-1000 delay-700 ${
                  loaded ? "w-full" : "w-0"
                }`}
              />
            </span>
            <br />
            <span className="text-foreground/90">Dengan Potongan</span>{" "}
            <span className="text-primary">yang Tepat</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Perawatan pria modern dengan barber profesional, teknik presisi, dan
            pengalaman grooming kelas atas yang tak terlupakan.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              size="lg"
              className="relative bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg px-8 py-6 group overflow-hidden animate-pulse-glow"
              asChild
            >
              <Link to="/client/booking">
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Booking Sekarang</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2 relative" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              asChild
            >
              <a href="#services">Lihat Layanan</a>
            </Button>
          </div>

          {/* Review bar */}
          <div
            className={`flex items-center gap-3 mb-10 transition-all duration-700 delay-[600ms] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex -space-x-3">
              {["👨‍🦱", "👨", "👨‍🦳", "👨‍🦲"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-zinc-800 border-2 border-background flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-foreground font-semibold">5.000+</span>{" "}
                klien puas bergabung
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className={`grid grid-cols-3 gap-6 sm:gap-10 pt-8 border-t border-border/40 max-w-xl transition-all duration-700 delay-[700ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <StatCard
              icon={Award}
              target={10}
              suffix="+"
              label="Tahun Pengalaman"
              delay={0}
              trigger={statsVisible}
            />
            <StatCard
              icon={Users}
              target={5000}
              suffix="+"
              label="Klien Puas"
              delay={0.15}
              trigger={statsVisible}
            />
            <StatCard
              icon={Scissors}
              target={15}
              suffix="+"
              label="Barber Profesional"
              delay={0.3}
              trigger={statsVisible}
            />
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[900ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
