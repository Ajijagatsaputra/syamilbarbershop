import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Calendar } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, .05) 35px, rgba(255, 255, 255, .05) 70px)`
        }}></div>
      </div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm font-semibold tracking-wider uppercase mb-4">
            Kontak Kami
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            BOOKING SEKARANG
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Jadwalkan booking Anda atau hubungi kami untuk informasi lebih lanjut
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Contact Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Kirim Pesan</h3>
              <p className="text-zinc-400 text-sm">Isi form di bawah ini dan kami akan segera menghubungi Anda</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Nama Lengkap
                </label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-yellow-500 focus:ring-yellow-500/20 h-12"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <Input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-yellow-500 focus:ring-yellow-500/20 h-12"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  No. WhatsApp
                </label>
                <Input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62 812 3456 7890" 
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-yellow-500 focus:ring-yellow-500/20 h-12"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Pesan
                </label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan Anda..." 
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-yellow-500 focus:ring-yellow-500/20 resize-none"
                />
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold h-12 shadow-lg shadow-yellow-500/20"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Pesan
              </Button>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all font-semibold shadow-lg shadow-green-600/20"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="tel:+6281234567890"
                className="flex items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-semibold shadow-lg shadow-blue-600/20"
              >
                <Phone className="w-5 h-5" />
                Telepon
              </a>
            </div>

            {/* Contact Info */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                  <MapPin className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">Alamat</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Desa Pagedangan Kecamatan Adiwerna<br />
                    Kabupaten Tegal, Jawa Tengah 52452
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                  <Phone className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">Telepon</h3>
                  <p className="text-zinc-400 text-sm">
                    <a href="tel:+6281234567890" className="hover:text-yellow-500 transition-colors">+62 812 3456 7890</a><br />
                    <a href="tel:+6282198765432" className="hover:text-yellow-500 transition-colors">+62 821 9876 5432</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                  <Mail className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">Email</h3>
                  <p className="text-zinc-400 text-sm">
                    <a href="mailto:info@syamilbarbershop.com" className="hover:text-yellow-500 transition-colors">info@syamilbarbershop.com</a><br />
                    <a href="mailto:booking@syamilbarbershop.com" className="hover:text-yellow-500 transition-colors">booking@syamilbarbershop.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">Jam Operasional</h3>
                  <p className="text-zinc-400 text-sm">
                    Senin - Jumat: <span className="text-yellow-500 font-medium">09:00 - 21:00</span><br />
                    Sabtu - Minggu: <span className="text-yellow-500 font-medium">10:00 - 22:00</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4 text-center">Ikuti Kami</h3>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://instagram.com/syamilbarbershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/syamilbarbershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Lokasi Kami</h3>
                  <p className="text-zinc-400 text-sm">Desa Pagedangan, Kec. Adiwerna, Kab. Tegal</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[500px] bg-zinc-800">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d109.0840684!3d-6.8707869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9c2b6e3b3e5%3A0x5027a76e356db40!2sAdiwerna%2C%20Tegal%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
              
              {/* Map Overlay Button */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <a
                  href="https://maps.google.com/?q=Adiwerna,+Tegal+Regency,+Central+Java"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full shadow-lg shadow-yellow-500/30 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;