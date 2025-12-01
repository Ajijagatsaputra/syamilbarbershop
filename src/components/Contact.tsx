import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Kontak Kami
          </span>
          <h2 className="text-5xl md:text-6xl font-display mt-4 mb-6">
            BOOKING SEKARANG
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jadwalkan booking Anda atau hubungi kami untuk informasi lebih lanjut
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-background border-border">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                <Input 
                  placeholder="John Doe" 
                  className="bg-card border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  type="email"
                  placeholder="john@example.com" 
                  className="bg-card border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">No. Telepon</label>
                <Input 
                  type="tel"
                  placeholder="+62 812 3456 7890" 
                  className="bg-card border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <Textarea 
                  placeholder="Tuliskan pesan Anda..." 
                  rows={4}
                  className="bg-card border-border focus:border-primary"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                Kirim Pesan
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-6 bg-background border-border hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Alamat</h3>
                  <p className="text-muted-foreground">
                    Desa Pagedangan Kecamatan Adiwerna<br />
                    Kabupaten Tegal, Jawa Tengah 52452
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background border-border hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Telepon</h3>
                  <p className="text-muted-foreground">
                    +62 812 3456 7890<br />
                    +62 821 9876 5432
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background border-border hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    info@syamilbarbershop.com<br />
                    booking@syamilbarbershop.com
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background border-border hover:border-primary transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Jam Operasional</h3>
                  <p className="text-muted-foreground">
                    Senin - Jumat: 09:00 - 21:00<br />
                    Sabtu - Minggu: 10:00 - 22:00
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
