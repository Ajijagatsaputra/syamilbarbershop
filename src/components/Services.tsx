import { Card } from "@/components/ui/card";
import haircutImg from "@/assets/service-haircut.jpg";
import beardImg from "@/assets/service-beard.jpg";
import stylingImg from "@/assets/service-styling.jpg";

const services = [
  {
    title: "Classic Haircut",
    description: "Potongan rambut klasik dengan teknik modern dan presisi tinggi",
    image: haircutImg,
    duration: "45 menit",
  },
  {
    title: "Beard Grooming",
    description: "Perawatan jenggot lengkap dengan trimming dan shaving profesional",
    image: beardImg,
    duration: "30 menit",
  },
  {
    title: "Hair Styling",
    description: "Styling rambut dengan produk premium untuk tampilan sempurna",
    image: stylingImg,
    duration: "30 menit",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-card">
      <div className="container px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Layanan Kami
          </span>
          <h2 className="text-5xl md:text-6xl font-display mt-4 mb-6">
            PREMIUM SERVICES
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Layanan Syamil Barbershop terbaik dengan standar profesional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group overflow-hidden bg-background border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-sm text-primary mb-2">{service.duration}</div>
                  <h3 className="text-2xl font-display mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
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
