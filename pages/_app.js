import "../styles/globals.css";
import { ThemeProvider } from "../utils/ThemeContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Navigation />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
