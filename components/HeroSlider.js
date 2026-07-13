import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const slides = [
  {
    image: "/images/hero.jpg",
    title: "Votre satisfaction notre priorité",
    subtitle: "Votre voiture notre passion",
    description:
      "Nettoyage automobile et canapé à domicile — un traitement VIP pour votre véhicule et votre intérieur.",
  },
  {
    image: "/images/service-3.jpg",
    title: "Detailing professionnel",
    subtitle: "Résultat garanti",
    description:
      "Intérieur, extérieur, sièges et canapé — des prestations complètes avec matériel professionnel.",
  },
  {
    image: "/images/gallery-1.jpg",
    title: "Intervention à domicile",
    subtitle: "Sud de La Réunion",
    description:
      "Tampon, Saint-Louis, Saint-Pierre, Saint-Joseph — on vient chez vous, où que vous soyez.",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    },
    [isTransitioning]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const shift = Math.min(window.scrollY * 0.28, 180);
      sectionRef.current.style.setProperty("--hero-shift", `${shift}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ "--hero-shift": "0px" }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out-expo ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ transform: "translate3d(0, calc(var(--hero-shift) * 0.6), 0)" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover ${
              index === currentSlide ? "hero-ken-burns" : "scale-100"
            }`}
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      <div
        className="relative z-20 flex h-full items-center justify-center px-4"
        style={{ transform: "translate3d(0, calc(var(--hero-shift) * -0.15), 0)" }}
      >
        <div className="container mx-auto text-center text-white" key={currentSlide}>
          <h1 className="hero-animate mb-4 text-4xl font-bold md:text-6xl lg:text-7xl">
            {slides[currentSlide].title}
          </h1>
          <h2 className="hero-animate hero-animate-delay-1 mb-6 text-2xl font-semibold text-accent-yellow md:text-4xl">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="hero-animate hero-animate-delay-2 mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
            {slides[currentSlide].description}
          </p>
          <div className="hero-animate hero-animate-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#contact" className="btn-primary">
              Prendre rendez-vous
            </Link>
            <Link href="/services" className="btn-outline">
              Nos tarifs
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#apropos"
        className="scroll-indicator absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors duration-500 ease-out-expo hover:text-accent-yellow"
        aria-label="Défiler vers le contenu"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Découvrir</span>
        <ChevronDown size={24} strokeWidth={1.5} />
        <span className="scroll-indicator-line block h-10 w-px bg-white/30" />
      </a>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out-expo ${
              index === currentSlide
                ? "w-8 bg-accent-yellow"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
