import Link from "next/link";

export default function Logo({ className = "" }) {
  const words = ["TISY", "CLEAN", "974"];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center bg-[#F4D03F] rounded-lg px-6 py-3 transition-transform duration-300 ease-smooth hover:scale-105 ${className}`}
    >
      <div className="flex items-center gap-2">
        {words.map((word) => (
          <span key={word} className="relative inline-block">
            <span
              className="absolute font-lilita text-2xl uppercase tracking-[0.2em] text-custom-grey"
              style={{ transform: "translate(-4px, 4px)" }}
              aria-hidden="true"
            >
              {word}
            </span>
            <span className="relative z-10 font-lilita text-2xl uppercase tracking-[0.2em] text-white">
              {word}
            </span>
          </span>
        ))}
      </div>
    </Link>
  );
}
