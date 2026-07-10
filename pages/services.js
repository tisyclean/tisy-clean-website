import Head from "next/head";
import MenuPage from "../components/MenuPage";

export default function Services() {
  return (
    <>
      <Head>
        <title>Nos tarifs — Tisy Clean | Nettoyage auto &amp; canapé</title>
        <meta
          name="description"
          content="Découvrez nos tarifs de nettoyage automobile et canapé à domicile. Prix clairs, sans surprise. La Réunion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo-square.png" />
      </Head>

      <div className="pt-24">
        <MenuPage />
      </div>
    </>
  );
}
