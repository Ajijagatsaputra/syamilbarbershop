import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Placeholder images - ganti dengan import gambar asli
const haircutImg =
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80";
const beardImg =
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80";
const stylingImg =
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80";
const treatmentImg =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
const facialImg =
  "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80";
const coloringImg =
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80";

const galleryItems = [
  {
    title: "Classic Haircut",
    description:
      "Potongan rambut klasik dengan teknik modern dan presisi tinggi untuk hasil sempurna",
    image: haircutImg,
    duration: "45 menit",
    price: "50K",
    rating: 4.9,
    popular: true,
  },
  {
    title: "Beard Grooming",
    description:
      "Perawatan jenggot lengkap dengan trimming dan shaving profesional",
    image: beardImg,
    duration: "30 menit",
    price: "35K",
    rating: 4.8,
  },
  {
    title: "Hair Styling",
    description:
      "Styling rambut dengan produk premium untuk tampilan yang menawan",
    image: stylingImg,
    duration: "30 menit",
    price: "40K",
    rating: 4.7,
  },
  {
    title: "Hair Treatment",
    description: "Perawatan rambut dan kulit kepala untuk kesehatan optimal",
    image: treatmentImg,
    duration: "60 menit",
    price: "100K",
    rating: 4.9,
  },
  {
    title: "Facial Treatment",
    description: "Perawatan wajah untuk kulit yang sehat dan segar",
    image: facialImg,
    duration: "45 menit",
    price: "75K",
    rating: 4.6,
  },
  {
    title: "Hair Coloring",
    description: "Pewarnaan rambut profesional dengan hasil natural",
    image: coloringImg,
    duration: "90 menit",
    price: "150K",
    rating: 4.8,
  },
];

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation({
    threshold: 0.3,
  });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({
    threshold: 0.05,
  });

  return (
    <section
      id="gallery"
      className="py-20 sm:py-24 bg-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-orb-pulse-delay pointer-events-none" />

      <div className="container px-4 relative z-10">
        {/* ── Header ── */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            headVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm font-semibold tracking-wider uppercase mb-4">
            Galeri Layanan
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 sm:mb-6">
            LAYANAN <span className="animate-shimmer-text">PROFESIONAL</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
            Pengalaman barbershop terbaik dengan standar profesional dan
            peralatan modern
          </p>
          {/* Decorative */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-yellow-500" />
          </div>
        </div>

        {/* ── Gallery Grid ── */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {galleryItems.map((item, index) => (
            <Card
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden bg-zinc-900 border-2 border-zinc-800 
                hover:border-yellow-500 transition-all duration-500 hover:scale-[1.03] 
                hover:shadow-2xl hover:shadow-yellow-500/20
                ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
              style={{
                transitionDelay: `${index * 0.1}s`,
                transitionDuration: "0.6s",
              }}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center gap-1 shadow-lg animate-pulse-glow">
                  <Sparkles className="w-3 h-3" />
                  POPULER
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-95" : "opacity-75"
                  }`}
                />

                {/* Quick Info */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="px-2 py-1 bg-black/70 backdrop-blur-sm border border-zinc-700 rounded-lg flex items-center gap-1 text-xs text-white">
                    <Clock className="w-3 h-3 text-yellow-500" />
                    {item.duration}
                  </div>
                  <div className="px-2 py-1 bg-black/70 backdrop-blur-sm border border-zinc-700 rounded-lg flex items-center gap-1 text-xs text-white">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {item.rating}
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <div
                    className={`transition-all duration-500 ${
                      hoveredIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-90 lg:opacity-100"
                    }`}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div
                    className={`flex items-center justify-between gap-3 transition-all duration-500 ${
                      hoveredIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    <div>
                      <p className="text-xs text-zinc-400">Mulai dari</p>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-500">
                        Rp {item.price}
                      </p>
                    </div>
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 text-sm group/btn shadow-lg shadow-yellow-500/30"
                      asChild
                    >
                      <a href="#contact" className="flex items-center gap-2">
                        Booking
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
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

export default Gallery;
