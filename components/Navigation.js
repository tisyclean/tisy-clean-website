import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "../utils/ThemeContext";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#apropos", label: "À propos" },
  { href: "/services", label: "Nos tarifs" },
  { href: "/#temoignages", label: "Témoignages" },
  { href: "/#contact", label: "Contact" },
];

export default function Navigation() {
  const router = useRouter();
  const { isScrolled, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isHome = router.pathname === "/";
  const useLightText = mounted && isHome && !isScrolled;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => {
    closeMobileMenu();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out-expo ${
        mounted && (isScrolled || !isHome)
          ? "bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${useLightText ? "text-white hover:text-accent-yellow" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:0693474365"
            className={`flex items-center gap-2 font-semibold transition-colors duration-200 ${
              useLightText ? "text-white hover:text-accent-yellow" : "text-accent-red hover:text-accent-yellow"
            }`}
          >
            <Phone size={18} />
            06 93 47 43 65
          </a>
          <Link href="/#contact" className="btn-primary text-sm">
            Rendez-vous
          </Link>
        </div>

        <button
          onClick={toggleMobileMenu}
          className={`md:hidden p-2 transition-colors duration-200 ${
            useLightText ? "text-white" : "text-custom-grey"
          }`}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out-expo ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 bg-white px-4 pb-6 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="nav-link py-2 text-lg"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:0693474365"
            className="flex items-center gap-2 py-2 font-semibold text-accent-red"
          >
            <Phone size={18} />
            06 93 47 43 65
          </a>
          <Link href="/#contact" onClick={handleNavClick} className="btn-primary text-center">
            Prendre rendez-vous
          </Link>
        </nav>
      </div>
    </header>
  );
}
