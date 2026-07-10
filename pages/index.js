import Head from "next/head";
import HeroSlider from "../components/HeroSlider";
import StorySection from "../components/StorySection";
import StrengthsSection from "../components/StrengthsSection";
import ReviewSection from "../components/ReviewSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tisy Clean — Nettoyage auto &amp; canapé à domicile | La Réunion</title>
        <meta
          name="description"
          content="Tisy Clean — Nettoyage automobile et canapé à domicile à La Réunion. Tampon, Saint-Louis, Saint-Pierre, Saint-Joseph. Devis gratuit."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo-square.png" />
      </Head>

      <HeroSlider />
      <StorySection />
      <StrengthsSection />
      <ReviewSection />
      <ContactSection />
    </>
  );
}
