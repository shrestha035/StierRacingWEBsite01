import { useEffect, useRef, useState } from "react";

/**
 * useInView — fires when an element enters the scroll viewport.
 * Works with the snap-container (which is the actual scroll root).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.2 }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root =
      (document.querySelector(".snap-container") as Element | null) ?? null;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else setInView(false);
      },
      { ...options, root }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export const Reveal = ({
  children,
  delay = 0,
  from = "up",
  className = "",
  as: Tag = "div",
}: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  const hidden: Record<string, string> = {
    up: "opacity-0 translate-y-12",
    down: "opacity-0 -translate-y-12",
    left: "opacity-0 -translate-x-12",
    right: "opacity-0 translate-x-12",
    scale: "opacity-0 scale-90",
  };

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden[from]
      } ${className}`}
    >
      {children}
    </Comp>
  );
};
