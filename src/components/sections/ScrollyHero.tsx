import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type HeroCopy } from "@/lib/portfolio";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";

const FRAME_COUNT = 90;
const LAYOUTS: { range: [number, number, number, number]; className: string }[] = [
  { range: [0, 0, 0.18, 0.25], className: "items-center justify-center text-center" },
  { range: [0.25, 0.32, 0.48, 0.55], className: "items-start justify-center" },
  { range: [0.55, 0.62, 0.78, 0.84], className: "items-end justify-center text-right" },
  { range: [0.86, 0.92, 1, 1], className: "items-start justify-end pb-24" },
];
const frameSrc = (i: number) => `/sequence/f_${String(i + 1).padStart(3, "0")}.webp`;

export function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef(0);
  const { data: heroRows = [] } = useQuery(collectionQuery<HeroCopy>("hero_copy"));
  const copy = [...heroRows].sort((a, b) => a.order - b.order);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      if (i === 0) img.onload = () => draw(0);
      imgs.push(img);
    }
    imagesRef.current = imgs;

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      draw(currentRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v * (FRAME_COUNT - 1))));
    if (idx !== currentRef.current) {
      currentRef.current = idx;
      requestAnimationFrame(() => draw(idx));
    }
  });

  return (
    <section ref={containerRef} id="hero" className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-background)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {copy.map((c, i) => {
          const layout = LAYOUTS[i] ?? LAYOUTS[LAYOUTS.length - 1]!;
          const isLast = i === copy.length - 1;
          return (
            <Overlay key={c.order} progress={scrollYProgress} range={layout.range} className={layout.className}>
              {c.eyebrow ? (
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">{c.eyebrow}</p>
              ) : null}
              {c.title ? (
                i === 0 ? (
                  <h1 className="font-display text-6xl font-bold leading-[0.9] tracking-tight text-foreground md:text-8xl">{c.title}</h1>
                ) : (
                  <h2 className="max-w-[14ch] font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground md:text-7xl">{c.title}</h2>
                )
              ) : null}
              {c.subtitle ? (
                <p className={i === 0 ? "mt-4 font-display text-xl text-muted-foreground md:text-2xl" : "max-w-[40ch] text-muted-foreground"}>
                  {c.subtitle}
                </p>
              ) : null}
              {i === 0 ? (
                <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll ↓</p>
              ) : null}
              {isLast ? (
                <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
                  <Link to="/" hash="work" className="rounded-lg bg-ember px-5 py-3 font-display font-semibold text-primary-foreground glow transition-colors hover:bg-ember/90">
                    View work
                  </Link>
                  <Link to="/" hash="contact" className="rounded-lg border border-edge bg-background/40 px-5 py-3 font-display font-semibold text-foreground backdrop-blur transition-colors hover:border-ember/50">
                    Start a project
                  </Link>
                </div>
              ) : null}
            </Overlay>
          );
        })}
      </div>
    </section>
  );
}

function Overlay({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  className: string;
  children: React.ReactNode;
}) {
  const [a, b, c, d] = range;
  const opacity = useTransform(progress, (v) => {
    if (v <= a || v >= d) return a === 0 && v <= a ? 1 : d >= 1 && v >= d ? 1 : 0;
    if (v < b) return (v - a) / (b - a);
    if (v > c) return 1 - (v - c) / (d - c);
    return 1;
  });
  const y = useTransform(progress, (v) => 80 - 160 * Math.min(1, Math.max(0, (v - a) / (d - a))));
  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute inset-0 z-10 mx-auto flex max-w-6xl flex-col px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
