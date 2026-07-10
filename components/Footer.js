import Link from "next/link";
import { Phone, Facebook, Instagram, MapPin } from "lucide-react";
import Logo from "./Logo";

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#apropos", label: "À propos" },
  { href: "/services", label: "Nos tarifs" },
  { href: "/#temoignages", label: "Témoignages" },
  { href: "/#contact", label: "Contact" },
];

const zones = ["Tampon", "Saint-Louis", "Saint-Pierre", "Saint-Joseph"];

export default function Footer() {
  return (
    <footer className="bg-custom-grey text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="mb-6" />
            <a
              href="tel:0693474365"
              className="mb-3 flex items-center gap-2 text-gray-300 transition-colors duration-300 hover:text-accent-yellow"
            >
              <Phone size={18} />
              06 93 47 43 65
            </a>
            <a
              href="https://wa.me/262693474365"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 flex items-center gap-2 text-gray-300 transition-colors duration-300 hover:text-accent-yellow"
            >
              WhatsApp
            </a>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full bg-white/10 p-2 transition-all duration-300 hover:bg-accent-red hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full bg-white/10 p-2 transition-all duration-300 hover:bg-accent-red hover:scale-110"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-accent-yellow">Navigation</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 transition-colors duration-300 hover:text-accent-yellow"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-accent-yellow">
              <MapPin size={20} />
              Zone d&apos;intervention
            </h3>
            <div className="flex flex-col gap-2">
              {zones.map((zone) => (
                <span key={zone} className="text-gray-300">
                  {zone}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-accent-yellow">Horaires</h3>
            <p className="mb-2 text-gray-300">Lun — Sam : 8h — 18h</p>
            <p className="text-gray-300">Dimanche : sur rendez-vous</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        <p>© 2026 Tisy Clean — Tous droits réservés</p>
        <p className="mt-1">Nettoyage auto &amp; canapé à domicile · La Réunion</p>
      </div>
    </footer>
  );
}
