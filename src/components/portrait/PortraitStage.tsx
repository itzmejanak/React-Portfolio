import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import aboutPoster from "@/assets/scenes/about-start.jpg";
import workPoster from "@/assets/scenes/work-start.jpg";
import experiencePoster from "@/assets/scenes/experience-start.jpg";
import contactPoster from "@/assets/scenes/contact-start.jpg";
import appsPoster from "@/assets/scenes/apps-start.jpg";
import booksPoster from "@/assets/scenes/books-start.jpg";
import projectPoster from "@/assets/scenes/project-start.jpg";
import aboutVideo from "@/assets/scenes/about.webm.asset.json";
import workVideo from "@/assets/scenes/work.webm.asset.json";
import experienceVideo from "@/assets/scenes/experience.webm.asset.json";
import contactVideo from "@/assets/scenes/contact.webm.asset.json";
import appsVideo from "@/assets/scenes/apps.webm.asset.json";
import booksVideo from "@/assets/scenes/books.webm.asset.json";
import projectVideo from "@/assets/scenes/project.webm.asset.json";

export type PortraitScene = "about" | "work" | "experience" | "contact" | "apps" | "books" | "project";
const scenes = {
  about: { poster: aboutPoster, video: aboutVideo.url },
  work: { poster: workPoster, video: workVideo.url },
  experience: { poster: experiencePoster, video: experienceVideo.url },
  contact: { poster: contactPoster, video: contactVideo.url },
  apps: { poster: appsPoster, video: appsVideo.url },
  books: { poster: booksPoster, video: booksVideo.url },
  project: { poster: projectPoster, video: projectVideo.url },
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
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (!visible) {
        video.pause();
        return;
      }
      if (!requested) { video.src = source.video; video.load(); requested = true; }
      if (mode === "entry") void video.play().catch(() => {});
      else update();
    }, { rootMargin: "250px 0px" });
    const update = () => {
      if (!visible || mode !== "scroll" || !Number.isFinite(video.duration)) return;
      const bounds = container.getBoundingClientRect();
       // Settle the portrait before the section ends, then hold its last frame.
       // The scene is decorative; long project lists should not delay the motion.
       const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height * 0.58)));
      const time = progress * Math.max(0, video.duration - 0.05);
      if (Math.abs(video.currentTime - time) > 0.08) video.currentTime = time;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); }); };
    observer.observe(container);
    if (mode === "scroll") {
      video.addEventListener("loadedmetadata", update);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      observer.disconnect();
      video.pause();
      video.removeEventListener("loadedmetadata", update);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode, reduced, source.video]);

  return <div ref={ref} className={`portrait-stage portrait-scene-${scene}`} aria-hidden="true">
    <img src={source.poster} alt="" className="portrait-stage-image" loading="lazy" />
    <video ref={videoRef} className="portrait-stage-video" muted playsInline preload="none" poster={source.poster} />
    <span className="portrait-stage-wash" />
  </div>;
}
