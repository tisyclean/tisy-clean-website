import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Bonjour, je suis ${formData.name}. Je souhaite un devis pour : ${formData.service}. Mon numéro : ${formData.phone}`
    );
    window.open(`https://wa.me/262693474365?text=${message}`, "_blank");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 bg-custom-grey text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="right">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent-yellow">
              Contact
            </span>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Prêt pour un nettoyage professionnel à domicile ?
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              Appelez-nous ou envoyez votre demande — devis gratuit et réponse rapide.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="tel:0693474365" className="btn-primary flex items-center gap-2">
                <Phone size={20} />
                06 93 47 43 65
              </a>
              <a
                href="https://wa.me/262693474365?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20un%20nettoyage."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={200}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
            >
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all duration-500 ease-out-expo focus:border-accent-yellow focus:bg-white/15"
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                name="phone"
                placeholder="06 XX XX XX XX"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none transition-all duration-500 ease-out-expo focus:border-accent-yellow focus:bg-white/15"
              />
            </div>
            <div className="mb-6">
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition-all duration-500 ease-out-expo focus:border-accent-yellow focus:bg-white/15"
              >
                <option value="" className="text-custom-grey">Service souhaité</option>
                <option value="Complet int. + ext. (70€+)" className="text-custom-grey">Complet int. + ext. (70€+)</option>
                <option value="Intérieur (35€+)" className="text-custom-grey">Intérieur (35€+)</option>
                <option value="Extérieur (50€+)" className="text-custom-grey">Extérieur (50€+)</option>
                <option value="Sièges" className="text-custom-grey">Sièges</option>
                <option value="Canapé (60€+)" className="text-custom-grey">Canapé (60€+)</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full">
              Envoyer ma demande
            </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
