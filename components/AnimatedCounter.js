import { useEffect, useRef, useState } from "react";

function parseStatValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { number: null, suffix: value };
  return { number: parseInt(match[1], 10), suffix: match[2] };
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({ value, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const { number, suffix } = parseStatValue(value);

  useEffect(() => {
    if (number === null) return;

    const el = ref.current;
    if (!el) return;

    let frameId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const duration = 2200;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = easeOutExpo(progress);
          setDisplay(`${Math.round(number * eased)}${suffix}`);
          if (progress < 1) frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [number, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
