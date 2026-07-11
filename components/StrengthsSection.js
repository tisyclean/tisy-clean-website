import { Zap, Award, HeartHandshake } from "lucide-react";

const strengths = [
  {
    icon: Zap,
    title: "Réactivité et disponibilité",
    description: "Intervention rapide dans votre commune, créneaux flexibles.",
  },
  {
    icon: Award,
    title: "Prestations de qualité",
    description: "Matériel pro, produits adaptés, résultat visible dès la première visite.",
  },
  {
    icon: HeartHandshake,
    title: "Professionnalisme et écoute",
    description: "Devis gratuit, conseils personnalisés, service à domicile sans stress.",
  },
];

const stats = [
  { value: "150+", label: "Clients satisfaits" },
  { value: "300+", label: "Véhicules & canapés chouchoutés" },
  { value: "100%", label: "Engagement qualité" },
];

export default function StrengthsSection() {
  return (
    <section className="py-20 bg-custom-grey text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Nos <span className="text-accent-yellow">points forts</span>
        </h2>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {strengths.map((item, index) => (
            <article
              key={index}
              className="rounded-xl bg-white/10 p-8 text-center transition-all duration-300 ease-smooth hover:scale-105 hover:bg-white/15"
            >
              <item.icon className="mx-auto mb-4 text-accent-yellow" size={40} />
              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-accent-yellow md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
