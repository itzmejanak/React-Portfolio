import { motion, useScroll, useSpring, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 8 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ perspective: 1200 }}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-ember" />;
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-panel ${className}`} />;
}

export function LoadError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="plate p-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Couldn't load this section right now.
      </p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ember hover:underline">
          Retry
        </button>
      ) : null}
    </div>
  );
}
