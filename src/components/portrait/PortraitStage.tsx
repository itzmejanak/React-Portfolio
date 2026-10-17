import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import aboutPoster from "@/assets/scenes/about-start.jpg";
import workPoster from "@/assets/scenes/work-start.jpg";
import experiencePoster from "@/assets/scenes/experience-start.jpg";
import contactPoster from "@/assets/scenes/contact-start.jpg";
import appsPoster from "@/assets/scenes/apps-start.jpg";
import booksPoster from "@/assets/scenes/books-start.jpg";
import projectPoster from "@/assets/scenes/project-start.jpg";
import aboutVideo from "@/assets/scenes/about.webm";
import workVideo from "@/assets/scenes/work.webm";
import experienceVideo from "@/assets/scenes/experience.webm";
import contactVideo from "@/assets/scenes/contact.webm";
import appsVideo from "@/assets/scenes/apps.webm";
import booksVideo from "@/assets/scenes/books.webm";
import projectVideo from "@/assets/scenes/project.webm";

export type PortraitScene = "about" | "work" | "experience" | "contact" | "apps" | "books" | "project";
const scenes = {
  about: { poster: aboutPoster, video: aboutVideo },
  work: { poster: workPoster, video: workVideo },
  experience: { poster: experiencePoster, video: experienceVideo },
  contact: { poster: contactPoster, video: contactVideo },
  apps: { poster: appsPoster, video: appsVideo },
  books: { poster: booksPoster, video: booksVideo },
  project: { poster: projectPoster, video: projectVideo },
};

/** Decorative video sits behind the content. Home scenes follow scroll; page scenes play once on entry. */
export function PortraitStage({ scene, mode = "entry" }: { scene: PortraitScene; mode?: "scroll" | "entry" }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const source = scenes[scene];

  useEffect(() => {
    const container = ref.current;
    const video = videoRef.current;
    if (!container || !video || reduced) return;
    let frame = 0;
    let visible = false;
    let requested = false;
    let pendingTime: number | null = null;

    const applySeek = (targetTime: number) => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const clamped = Math.max(0, Math.min(video.duration - 0.05, targetTime));
      if (Math.abs(video.currentTime - clamped) <= 0.04) return;
      if (video.seeking) {
        pendingTime = clamped;
        return;
      }
      pendingTime = null;
      video.currentTime = clamped;
    };

    const onSeeked = () => {
      if (pendingTime !== null && visible && mode === "scroll") {
        const next = pendingTime;
        pendingTime = null;
        applySeek(next);
      }
    };

    const onLoadedData = () => {
      video.dataset["ready"] = "true";
    };

    const update = () => {
      if (!visible || mode !== "scroll" || !Number.isFinite(video.duration)) return;
      const bounds = container.getBoundingClientRect();
      // Settle the portrait within the visible scene, not the full project list.
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height * 0.58)),
      );
      const time = progress * Math.max(0, video.duration - 0.05);
      applySeek(time);
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (!visible) {
          video.pause();
          return;
        }
        if (!requested) {
          video.src = source.video;
          video.load();
          requested = true;
        }
        if (mode === "entry") void video.play().catch(() => {});
        else update();
      },
      { rootMargin: "250px 0px" },
    );

    video.addEventListener("loadeddata", onLoadedData);
    observer.observe(container);
    if (mode === "scroll") {
      video.addEventListener("loadedmetadata", update);
      video.addEventListener("seeked", onSeeked);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      observer.disconnect();
      video.pause();
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("loadedmetadata", update);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode, reduced, source.video]);

  return (
    <div ref={ref} className={`portrait-stage portrait-scene-${scene}`} aria-hidden="true">
      <img src={source.poster} alt="" className="portrait-stage-image" loading="lazy" decoding="async" />
      <video ref={videoRef} className="portrait-stage-video" muted playsInline preload="none" poster={source.poster} />
      <span className="portrait-stage-wash" />
    </div>
  );
}
