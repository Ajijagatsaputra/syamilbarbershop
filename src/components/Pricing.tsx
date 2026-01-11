import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Crown, Zap } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    price: "35K",
    description: "Sempurna untuk perawatan rutin",
    icon: Sparkles,
    features: [
      "Classic Haircut",
      "Hair Wash",
      "Basic Styling",
      "Consultation",
    ],
    color: "from-blue-500 to-blue-600",
    shadowColor: "shadow-blue-500/20",
  },
  {
    name: "Premium",
    price: "50K",
    description: "Paling diminati pelanggan kami",
    icon: Star,
    features: [
      "Premium Haircut",
      "Beard Grooming",
      "Premium Styling",
      "Hair Treatment",
      "Consultation",
      "Free Drink",
    ],
    popular: true,
    color: "from-yellow-500 to-yellow-600",
    shadowColor: "shadow-yellow-500/30",
  },
  {
    name: "Signature",
    price: "75K",
    description: "Pengalaman barbershop terlengkap",
    icon: Crown,
    features: [
      "Signature Haircut",
      "Complete Beard Service",
      "Premium Styling",
      "Hair & Scalp Treatment",
      "Face Massage",
      "Free Drink & Snack",
      "Priority Booking",
    ],
    color: "from-purple-500 to-purple-600",
    shadowColor: "shadow-purple-500/20",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, .05) 35px, rgba(255, 255, 255, .05) 70px)`
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm font-semibold tracking-wider uppercase mb-4">
            Harga Terbaik
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            PAKET LAYANAN
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budget Anda
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index}
                className={`relative bg-zinc-900 border-2 transition-all duration-500 hover:scale-105 group overflow-hidden ${
                  plan.popular 
                    ? 'border-yellow-500 lg:scale-105 shadow-2xl shadow-yellow-500/20' 
                    : 'border-zinc-800 hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-900/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-0 -right-0 w-32 h-32 overflow-hidden">
                    <div className="absolute top-6 -right-8 w-40 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs font-bold py-1.5 text-center rotate-45 shadow-lg">
                      POPULER
                    </div>
                  </div>
                )}

                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative p-8">
                  {/* Icon & Title */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} shadow-lg ${plan.shadowColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-zinc-400">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8 py-6 border-y border-zinc-800">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-zinc-500 font-medium">Rp</span>
                      <span className={`text-5xl font-bold bg-gradient-to-br ${plan.color} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">per kunjungan</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group/item">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-zinc-300 text-sm leading-relaxed group-hover/item:text-white transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40' 
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                    }`}
                    size="lg"
                    asChild
                  >
                    <a href="#contact" className="flex items-center justify-center gap-2">
                      Pilih Paket
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-2xl">
            <p className="text-zinc-400 text-sm mb-3">
              💡 <span className="text-white font-semibold">Tips:</span> Semua paket sudah termasuk konsultasi gratis dengan barber profesional kami
            </p>
            <p className="text-xs text-zinc-500">
              Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi promo terbaru!
            </p>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">Tidak yakin paket mana yang cocok?</p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-600/20"
          >
            <Zap className="w-5 h-5" />
            Ayo sistem coba sistem rekomendasi kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;