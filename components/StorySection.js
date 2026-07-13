import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function StorySection() {
  return (
    <section id="apropos" className="py-20 bg-light-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal className="order-2 lg:order-1" direction="right">
            <span className="mb-4 inline-block border-l-4 border-accent-red pl-4 text-sm font-semibold uppercase tracking-wider text-accent-red">
              Notre histoire
            </span>
            <h2 className="mb-6 text-3xl font-bold text-custom-grey md:text-4xl">
              Tisy Clean — Votre expert en{" "}
              <span className="text-accent-red">nettoyage à domicile</span>
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              Votre partenaire privilégié pour tous vos besoins de nettoyage automobile
              et canapé à La Réunion. Nous intervenons directement chez vous dans le sud
              de l&apos;île : Tampon, Saint-Louis, Saint-Pierre et Saint-Joseph.
            </p>
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              Notre objectif ultime : vous satisfaire pleinement et vous offrir un vrai
              effet « WOW » quand vous retrouverez votre véhicule ou votre canapé.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              Du nettoyage intérieur complet au shampoing de sièges, en passant par le
              lavage extérieur et le nettoyage de canapé, nous prenons soin de chaque
              détail avec des produits de qualité et un matériel professionnel.
            </p>
            <Link href="#contact" className="story-btn">
              <span>Prendre rendez-vous</span>
            </Link>
          </ScrollReveal>

          <ScrollReveal className="order-1 lg:order-2" direction="left" delay={200}>
            <div className="motion-card group relative overflow-hidden rounded-2xl border-4 border-accent-yellow shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/service-1.jpg"
                  alt="Nettoyage automobile professionnel Tisy Clean"
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent-yellow">
                  Depuis La Réunion
                </p>
                <p className="text-xl font-bold">150+ clients satisfaits</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
