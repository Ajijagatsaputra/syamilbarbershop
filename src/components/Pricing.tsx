import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    price: "75K",
    features: [
      "Classic Haircut",
      "Hair Wash",
      "Basic Styling",
      "Consultation",
    ],
  },
  {
    name: "Premium",
    price: "150K",
    features: [
      "Premium Haircut",
      "Beard Grooming",
      "Premium Styling",
      "Hair Treatment",
      "Consultation",
      "Free Drink",
    ],
    popular: true,
  },
  {
    name: "Signature",
    price: "250K",
    features: [
      "Signature Haircut",
      "Complete Beard Service",
      "Premium Styling",
      "Hair & Scalp Treatment",
      "Face Massage",
      "Free Drink & Snack",
      "Priority Booking",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Harga
          </span>
          <h2 className="text-5xl md:text-6xl font-display mt-4 mb-6">
            PAKET LAYANAN
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative p-8 bg-card border-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] ${
                plan.popular 
                  ? 'border-primary scale-105' 
                  : 'border-border hover:border-primary'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  PALING POPULER
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground">Rp</span>
                  <span className="text-5xl font-display text-primary">{plan.price}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                }`}
                size="lg"
                asChild
              >
                <a href="#contact">Pilih Paket</a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
