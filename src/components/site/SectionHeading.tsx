import { motion } from "motion/react";
import { PortraitStage, type PortraitScene } from "@/components/portrait/PortraitStage";

export function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <div className="mb-10 overflow-hidden">
      <motion.div
        className="flex items-baseline gap-4"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-mono text-[11px] text-ember">({index})</span>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">{title}</h2>
      </motion.div>
      <motion.div
        className="mt-4 h-px origin-left bg-gradient-to-r from-ember via-ember/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      {kicker ? <p className="mt-4 max-w-[60ch] text-muted-foreground text-pretty">{kicker}</p> : null}
    </div>
  );
}

export function PageBanner({ eyebrow, title, description, scene }: { eyebrow: string; title: string; description?: string; scene: PortraitScene }) {
  return (
    <div className="inner-intro relative overflow-hidden border-b border-border">
      <PortraitStage scene={scene} />
      <div className="inner-intro-content relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-ember"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="max-w-[18ch] font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground text-balance md:text-7xl"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-[56ch] text-muted-foreground text-pretty"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
