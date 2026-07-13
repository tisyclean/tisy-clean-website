import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export const menuItems = [
  {
    name: "Nettoyage intérieur",
    description: "Aspiration complète, plastiques, vitres et dépoussiérage minutieux.",
    price: "35",
    image: "/images/service-2.jpg",
    tag: "Populaire",
  },
  {
    name: "Nettoyage extérieur",
    description: "Carrosserie, jantes et vitres — brillance garantie.",
    price: "50",
    image: "/images/service-1.jpg",
    tag: "Essentiel",
  },
  {
    name: "Complet int. + ext.",
    description: "Prestation complète intérieur et extérieur — le plus demandé.",
    price: "70",
    image: "/images/service-3.jpg",
    tag: "Best-seller",
  },
  {
    name: "Nettoyage des sièges",
    description: "Shampoing en profondeur — 1 siège, 5 places ou 7 places.",
    price: "45",
    image: "/images/service-4.jpg",
    tag: "Premium",
  },
  {
    name: "Nettoyage canapé",
    description: "Shampoing anti-taches et désodorisation pour tous types de tissus.",
    price: "60",
    image: "/images/service-5.jpg",
    tag: "Maison",
  },
  {
    name: "Désodorisation",
    description: "Traitement des odeurs tenaces — intérieur comme neuf.",
    price: "30",
    image: "/images/service-6.jpg",
    tag: "Spécial",
  },
];

export default function MenuPage() {
  return (
    <section className="py-20 bg-light-white">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="fade">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent-red">
              Tarifs &amp; prestations
            </span>
            <h1 className="text-3xl font-bold text-custom-grey md:text-5xl">
              Des prix <span className="text-accent-red">clairs</span>, sans surprise
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Toutes nos prestations sont réalisées à domicile dans le sud de La Réunion.
              Devis personnalisé gratuit selon l&apos;état de votre véhicule ou canapé.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {menuItems.map((item, index) => (
            <ScrollReveal key={index} delay={(index % 2) * 160}>
              <article className="motion-card group h-full overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-4 right-4 rounded-full bg-accent-yellow px-3 py-1 text-xs font-bold uppercase text-custom-grey">
                  {item.tag}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-xl font-bold text-custom-grey">{item.name}</h3>
                  <span className="text-2xl font-bold text-accent-red">
                    {item.price}€
                    <span className="text-sm font-normal text-gray-500">+</span>
                  </span>
                </div>
                <p className="mb-6 text-gray-600 leading-relaxed">{item.description}</p>
                <Link href="/#contact" className="order-btn">
                  Réserver
                </Link>
              </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={180}>
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="mb-6 text-center text-xl font-bold text-custom-grey">
            Tarifs détaillés sièges
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "1 siège", price: "45€" },
              { label: "Sièges 5 places", price: "150€" },
              { label: "Sièges 7 places", price: "245€" },
              { label: "Devis personnalisé", price: "Gratuit" },
            ].map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 120} as="div">
                <div className="motion-card rounded-xl bg-light-white p-4 text-center">
                  <p className="font-semibold text-custom-grey">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold text-accent-red">{item.price}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
