import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { collectionQuery, type HeroCopy } from "@/lib/portfolio";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const FRAME_COUNT = 90;
const LAYOUTS: { range: [number, number, number, number]; align: string }[] = [
  { range: [0, 0, 0.22, 0.28], align: "items-start text-left" },
  { range: [0.26, 0.33, 0.5, 0.57], align: "items-start text-left" },
  { range: [0.55, 0.62, 0.78, 0.85], align: "items-start text-left md:items-end md:text-right" },
  { range: [0.83, 0.9, 1, 1], align: "items-start text-left" },
];
const frameSrc = (i: number) => `/sequence/f_${String(i + 1).padStart(3, "0")}.webp`;

export function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const currentRef = useRef(0);
  const lastSizeRef = useRef({ w: 0, h: 0 });
  const reduced = useReducedMotion();
  const [activeBeat, setActiveBeat] = useState(0);

  const { data: heroRows = [] } = useQuery(collectionQuery<HeroCopy>("hero_copy"));
  const copy = [...heroRows].sort((a, b) => a.order - b.order);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const findNearestLoaded = (targetIndex: number): HTMLImageElement | null => {
    const imgs = imagesRef.current;
    const direct = imgs[targetIndex];
    if (direct && direct.complete && direct.naturalWidth > 0) return direct;
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0) {
        const cand = imgs[prev];
        if (cand && cand.complete && cand.naturalWidth > 0) return cand;
      }
      const next = targetIndex + offset;
      if (next < FRAME_COUNT) {
        const cand = imgs[next];
        if (cand && cand.complete && cand.naturalWidth > 0) return cand;
      }
    }
    return null;
  };

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = findNearestLoaded(index);
    if (!img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    if (cw === 0 || ch === 0) return;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  useEffect(() => {
    let cancelled = false;
    const imgs = imagesRef.current;

    const loadFrame = (i: number): Promise<void> =>
      new Promise((resolve) => {
        if (cancelled || imgs[i]) {
          resolve();
          return;
        }
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async";
        img.onload = () => {
          if (!cancelled && (i === 0 || i === currentRef.current)) {
            draw(currentRef.current);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(i);
        imgs[i] = img;
      });

    // Progressive loading strategy:
    // 1. Frame 0 immediately so LCP paints fast.
    // 2. Keyframe stride (every 6th frame) so scrubbing across the entire range works right away.
    // 3. Remaining frames in small sequential batches to avoid saturating the network.
    const loadSequence = async () => {
      await loadFrame(0);
      if (cancelled || reduced) return;

      const keyframes: number[] = [];
      for (let i = 6; i < FRAME_COUNT; i += 6) keyframes.push(i);
      if (keyframes[keyframes.length - 1] !== FRAME_COUNT - 1) keyframes.push(FRAME_COUNT - 1);

      await Promise.all(keyframes.map(loadFrame));
      if (cancelled) return;

      const remaining: number[] = [];
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (!imgs[i]) remaining.push(i);
      }

      const batchSize = 6;
      for (let i = 0; i < remaining.length; i += batchSize) {
        if (cancelled) break;
        await Promise.all(remaining.slice(i, i + batchSize).map(loadFrame));
      }
    };

    void loadSequence();

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Ignore small mobile address-bar height changes to prevent scroll jank
      if (
        lastSizeRef.current.w === w &&
        Math.abs(lastSizeRef.current.h - h) < 100 &&
        canvas.width > 0
      ) {
        return;
      }
      lastSizeRef.current = { w, h };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      draw(currentRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const beat = v < 0.27 ? 0 : v < 0.56 ? 1 : v < 0.84 ? 2 : 3;
    if (beat !== activeBeat) setActiveBeat(beat);
    if (reduced) return;
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v * (FRAME_COUNT - 1))));
    if (idx !== currentRef.current) {
      currentRef.current = idx;
      requestAnimationFrame(() => draw(idx));
    }
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Introduction"
      className={reduced ? "relative min-h-[calc(100dvh-4rem)]" : "relative h-[320vh]"}
    >
      <div className="sticky top-16 h-[calc(100dvh-4rem)] w-full overflow-hidden bg-background">
        {/* Fallback first-frame image underneath canvas so SSR and pre-JS paint immediately */}
        <img
          src="/sequence/f_001.webp"
          alt="Portrait of Janak Devkota"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        {/* Layered atmospheric vignette + lower-stage reading protection so text never collides with face */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_34%,transparent_30%,color-mix(in_oklab,var(--color-background)_88%,transparent)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-background via-background/88 to-transparent"
        />

        {/* Scroll-linked story beats anchored cleanly in the lower reading zone */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col justify-end px-4 pb-24 sm:px-6 sm:pb-28">
          <div className="relative min-h-[11rem] sm:min-h-[13rem]">
            {copy.map((c, i) => {
              const layout = LAYOUTS[i] ?? LAYOUTS[LAYOUTS.length - 1]!;
              const displayTitle =
                c.title || (i === copy.length - 1 ? "Engineered End to End." : "");
              const displayEyebrow =
                c.eyebrow || `(0${i + 1}) — ${i === copy.length - 1 ? "Ready to Ship" : "Portfolio"}`;

              return (
                <Overlay
                  key={c.order}
                  progress={scrollYProgress}
                  range={layout.range}
                  align={layout.align}
                  reduced={Boolean(reduced)}
                  isFirst={i === 0}
                >
                  <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-ember">
                    {displayEyebrow}
                  </p>
                  {displayTitle ? (
                    i === 0 ? (
                      <h1 className="font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                        {displayTitle}
                      </h1>
                    ) : (
                      <h2 className="max-w-[18ch] font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {displayTitle}
                      </h2>
                    )
                  ) : null}
                  {c.subtitle ? (
                    <p className="mt-3 max-w-[48ch] font-display text-base text-muted-foreground sm:text-xl">
                      {c.subtitle}
                    </p>
                  ) : null}
                </Overlay>
              );
            })}
          </div>

          {/* Always-accessible Hero HUD bar: CTAs + sequence progress + skip to content */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-edge/70 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                hash="work"
                onClick={() => scrollToSection("work")}
                className="inline-flex items-center gap-2 bg-ember px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-ember/90"
              >
                Selected Work
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link
                to="/"
                hash="contact"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 border border-edge bg-background/60 px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-foreground backdrop-blur-sm transition-colors hover:border-ember hover:text-ember"
              >
                Start a Project
              </Link>
            </div>

            <div className="flex items-center gap-5">
              {!reduced && (
                <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:flex">
                  <span className="text-ember">0{activeBeat + 1}</span>
                  <span>/</span>
                  <span>0{Math.max(1, copy.length)}</span>
                  <div className="ml-1 flex gap-1" aria-hidden="true">
                    {copy.map((c, idx) => (
                      <span
                        key={c.order}
                        className={`h-1 transition-all duration-300 ${
                          idx === activeBeat ? "w-6 bg-ember" : "w-2 bg-edge"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-ember"
              >
                Explore
                <ArrowDown size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Overlay({
  progress,
  range,
  align,
  reduced,
  isFirst,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  align: string;
  reduced: boolean;
  isFirst: boolean;
  children: React.ReactNode;
}) {
  const [a, b, c, d] = range;
  const opacity = useTransform(progress, (v) => {
    if (reduced) return isFirst ? 1 : 0;
    if (v <= a || v >= d) return a === 0 && v <= a ? 1 : d >= 1 && v >= d ? 1 : 0;
    if (v < b) return (v - a) / (b - a);
    if (v > c) return 1 - (v - c) / (d - c);
    return 1;
  });
  const y = useTransform(progress, (v) => {
    if (reduced) return 0;
    return 24 - 48 * Math.min(1, Math.max(0, (v - a) / (d - a)));
  });

  if (reduced && !isFirst) return null;

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end ${align}`}
    >
      {children}
    </motion.div>
  );
}
