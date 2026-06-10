import { Card } from "@/components/ui/card";
import haircutImg from "@/assets/service-haircut.jpg";
import beardImg from "@/assets/service-beard.jpg";
import stylingImg from "@/assets/service-styling.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Classic Haircut",
    description:
      "Potongan rambut klasik dengan teknik modern dan presisi tinggi",
    image: haircutImg,
    duration: "45 menit",
    tag: "BESTSELLER",
    tagColor: "bg-primary text-primary-foreground",
  },
  {
    title: "Beard Grooming",
    description:
      "Perawatan jenggot lengkap dengan trimming dan shaving profesional",
    image: beardImg,
    duration: "30 menit",
    tag: "POPULAR",
    tagColor: "bg-zinc-700 text-white",
  },
  {
    title: "Hair Styling",
    description: "Styling rambut dengan produk premium untuk tampilan sempurna",
    image: stylingImg,
    duration: "30 menit",
    tag: "NEW",
    tagColor: "bg-emerald-600 text-white",
  },
];

const ticker = [
  "✦ Classic Haircut",
  "✦ Beard Grooming",
  "✦ Hair Styling",
  "✦ Hair Treatment",
  "✦ Facial Treatment",
  "✦ Hair Coloring",
  "✦ Scalp Massage",
  "✦ Premium Shave",
];

const Services = () => {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation({
    threshold: 0.3,
  });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-24 bg-card overflow-hidden">
      {/* ── Scrolling Ticker ── */}
      <div className="ticker-wrap py-3 bg-primary mb-16">
        <div className="ticker-content">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="text-sm font-bold tracking-widest uppercase text-primary-foreground whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="container px-4">
        {/* ── Section Header ── */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            — Layanan Kami —
          </span>
          <h2 className="text-5xl md:text-6xl font-display mt-4 mb-4">
            PREMIUM{" "}
            <span className="relative inline-block">
              <span className="animate-shimmer-text">SERVICES</span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Layanan Syamil Barbershop terbaik dengan standar profesional tinggi
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        {/* ── Service Cards ── */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group overflow-hidden bg-background border-border hover:border-primary transition-all duration-500
                hover:shadow-[0_0_40px_rgba(251,191,36,0.25)] hover:-translate-y-2
                ${cardsVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-16"}
              `}
              style={{
                transitionDelay: `${index * 0.15}s`,
                transitionDuration: "0.7s",
              }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Tag badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider ${service.tagColor} shadow-lg`}
                >
                  {service.tag}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-sm text-primary mb-2">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                  <h3 className="text-2xl font-display mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* CTA - slides up on hover */}
                  <div
                    className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold 
                    translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-300"
                  >
                    <a
                      href="#contact"
                      className="flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Booking Sekarang <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
