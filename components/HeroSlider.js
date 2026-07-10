import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 flex h-full items-center justify-center px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl transition-all duration-500">
            {slides[currentSlide].title}
          </h1>
          <h2 className="mb-6 text-2xl font-semibold text-accent-yellow md:text-4xl transition-all duration-500">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl transition-all duration-500">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#contact" className="btn-primary">
              Prendre rendez-vous
            </Link>
            <Link href="/services" className="btn-outline">
              Nos tarifs
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-accent-yellow scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
