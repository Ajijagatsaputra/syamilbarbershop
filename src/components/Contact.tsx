import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const { ref: headRef, isVisible: headVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.15 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Alamat",
      content: (
        <p className="text-zinc-400 text-sm leading-relaxed">
          Desa Pagedangan Kecamatan Adiwerna
          <br />
          Kabupaten Tegal, Jawa Tengah 52452
        </p>
      ),
    },
    {
      icon: Phone,
      title: "Telepon",
      content: (
        <p className="text-zinc-400 text-sm">
          <a href="tel:+6281234567890" className="hover:text-yellow-500 transition-colors">
            +62 812 3456 7890
          </a>
          <br />
          <a href="tel:+6282198765432" className="hover:text-yellow-500 transition-colors">
            +62 821 9876 5432
          </a>
        </p>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <p className="text-zinc-400 text-sm">
          <a href="mailto:info@syamilbarbershop.com" className="hover:text-yellow-500 transition-colors">
            info@syamilbarbershop.com
          </a>
          <br />
          <a href="mailto:booking@syamilbarbershop.com" className="hover:text-yellow-500 transition-colors">
            booking@syamilbarbershop.com
          </a>
        </p>
      ),
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: (
        <p className="text-zinc-400 text-sm">
          Senin - Jumat:{" "}
          <span className="text-yellow-500 font-medium">09:00 - 21:00</span>
          <br />
          Sabtu - Minggu:{" "}
          <span className="text-yellow-500 font-medium">10:00 - 22:00</span>
        </p>
      ),
    },
  ];

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }}
      />

      {/* Animated Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl animate-orb-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-orb-pulse-delay pointer-events-none" />

      <div className="container px-4 relative z-10">
        {/* ── Header ── */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm font-semibold tracking-wider uppercase mb-4">
            Kontak Kami
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            BOOKING{" "}
            <span className="animate-shimmer-text">SEKARANG</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Jadwalkan booking Anda atau hubungi kami untuk informasi lebih lanjut
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-yellow-500" />
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Contact Form */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl
              hover:border-yellow-500/30 transition-all duration-700
              ${formVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
            `}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Kirim Pesan</h3>
              <p className="text-zinc-400 text-sm">
                Isi form di bawah ini dan kami akan segera menghubungi Anda
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Nama Lengkap", name: "name", type: "text", placeholder: "John Doe" },
                { label: "Email", name: "email", type: "email", placeholder: "john@example.com" },
                { label: "No. WhatsApp", name: "phone", type: "tel", placeholder: "+62 812 3456 7890" },
              ].map((field, i) => (
                <div
                  key={field.name}
                  className={`transition-all duration-500 ${
                    formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                >
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    {field.label}
                  </label>
                  <Input
                    name={field.name}
                    type={field.type}
                    value={(formData as Record<string, string>)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 
                      focus:border-yellow-500 focus:ring-yellow-500/20 h-12
                      transition-all duration-300 hover:border-zinc-600"
                  />
                </div>
              ))}

              <div
                className={`transition-all duration-500 ${
                  formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <label className="block text-sm font-medium text-zinc-300 mb-2">Pesan</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan Anda..."
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 
                    focus:border-yellow-500 focus:ring-yellow-500/20 resize-none
                    transition-all duration-300 hover:border-zinc-600"
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold h-12 
                  shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40
                  transition-all duration-300 group relative overflow-hidden"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {sending ? (
                  <span className="relative flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  <span className="relative flex items-center gap-2">
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Kirim Pesan
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            ref={infoRef as React.RefObject<HTMLDivElement>}
            className={`space-y-4 transition-all duration-700 delay-150 ${
              infoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-green-600 hover:bg-green-500
                  text-white rounded-xl transition-all font-semibold shadow-lg shadow-green-600/20
                  hover:shadow-green-600/40 hover:scale-105 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
                WhatsApp
              </a>
              <a
                href="tel:+6281234567890"
                className="flex items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-500
                  text-white rounded-xl transition-all font-semibold shadow-lg shadow-blue-600/20
                  hover:shadow-blue-600/40 hover:scale-105 group"
              >
                <Phone className="w-5 h-5 group-hover:animate-bounce" />
                Telepon
              </a>
            </div>

            {/* Contact Info Cards */}
            {contactItems.map((item, index) => (
              <div
                key={index}
                className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 
                  hover:border-yellow-500/50 transition-all duration-300 group
                  hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5
                  ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    {item.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-yellow-500/30 transition-colors">
              <h3 className="font-semibold text-white mb-4 text-center">Ikuti Kami</h3>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://instagram.com/syamilbarbershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
                    text-white rounded-lg transition-all shadow-lg hover:shadow-purple-500/50
                    hover:scale-110 hover:-translate-y-1"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/syamilbarbershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all 
                    shadow-lg hover:shadow-blue-500/50 hover:scale-110 hover:-translate-y-1"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Map Section ── */}
        <div
          ref={mapRef as React.RefObject<HTMLDivElement>}
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl hover:border-yellow-500/30 transition-colors">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <MapPin className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Lokasi Kami</h3>
                <p className="text-zinc-400 text-sm">Desa Pagedangan, Kec. Adiwerna, Kab. Tegal</p>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] bg-zinc-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d109.0840684!3d-6.8707869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb9c2b6e3b3e5%3A0x5027a76e356db40!2sAdiwerna%2C%20Tegal%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <a
                  href="https://maps.google.com/?q=Adiwerna,+Tegal+Regency,+Central+Java"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400
                    text-black font-semibold rounded-full shadow-lg shadow-yellow-500/30
                    transition-all hover:shadow-yellow-500/50 hover:scale-105"
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