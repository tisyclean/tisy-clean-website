import ScrollReveal from "./ScrollReveal";

const reviews = [
  {
    name: "Marie — Tampon",
    rating: 5,
    text: "Intérieur de ma voiture nickel ! Équipe efficace et très sympathique. Je recommande sans hésitation.",
  },
  {
    name: "Kevin — Saint-Pierre",
    rating: 5,
    text: "Réactivité et qualité au top. Mon canapé est comme neuf, intervention rapide à domicile.",
  },
  {
    name: "Sophie — Saint-Louis",
    rating: 5,
    text: "Satisfaite à 100% ! J'ai retrouvé ma voiture comme au premier jour. Excellent rapport qualité-prix.",
  },
  {
    name: "Thomas — Saint-Joseph",
    rating: 5,
    text: "Service impeccable, ponctuel et professionnel. Le detailing complet a transformé ma voiture.",
  },
  {
    name: "Léa — Tampon",
    rating: 5,
    text: "Canapé taché depuis des mois, maintenant comme neuf. Je n'hésiterai pas à refaire appel à eux.",
  },
  {
    name: "Marc — Saint-Pierre",
    rating: 4,
    text: "Très bon travail sur les sièges en cuir. Résultat visible immédiatement, prix correct.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="mb-3 text-accent-yellow text-lg tracking-wider">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function ReviewSection() {
  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="fade">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent-red">
              Témoignages
            </span>
            <h2 className="text-3xl font-bold text-custom-grey md:text-4xl">
              Ils nous font confiance,{" "}
              <span className="text-accent-red">pourquoi pas vous ?</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ScrollReveal key={index} delay={(index % 3) * 140}>
              <article className="motion-card h-full rounded-xl bg-light-white p-6 shadow-md hover:shadow-xl">
                <StarRating rating={review.rating} />
                <p className="mb-6 border-l-4 border-accent-red pl-4 text-gray-700 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-custom-grey">{review.name}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
