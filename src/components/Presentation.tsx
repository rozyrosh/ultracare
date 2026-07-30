"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SlideMeta = {
  title: string;
  preview: string;
};

type PresentationProps = {
  children: ReactNode;
  slides: SlideMeta[];
};

function PresentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 16v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M10 8.5v5l4.5-2.5L10 8.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Presentation({ children, slides }: PresentationProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const skipInitialMotion = useRef(true);
  const cursorTimerRef = useRef<number | null>(null);
  const ignoreCursorUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);

  const getSlideElements = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>(".slide"));
  }, []);

  const restartSlideMotion = useCallback((slide: HTMLElement) => {
    const skipNames = new Set([
      "pulse-dot",
      "scroll-line",
      "glow-breathe",
      "orbit-spin",
      "chevron-bounce",
    ]);

    const candidates = [
      slide,
      ...Array.from(slide.querySelectorAll<HTMLElement>("*")),
    ];
    const animated: HTMLElement[] = [];

    for (const el of candidates) {
      const name = getComputedStyle(el).animationName;
      if (!name || name === "none") continue;
      const names = name.split(",").map((part) => part.trim());
      if (names.every((part) => skipNames.has(part))) continue;
      animated.push(el);
      el.style.animation = "none";
    }

    slide.classList.remove("is-motion-pending", "is-entering");
    void slide.offsetWidth;

    for (const el of animated) {
      el.style.removeProperty("animation");
    }

    slide.classList.add("is-entering");
  }, []);

  const goToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const slideEls = getSlideElements();
      if (slideEls.length === 0) return;
      const nextIndex = Math.min(Math.max(index, 0), slideEls.length - 1);
      slideEls[nextIndex]?.scrollIntoView({ behavior, block: "start" });
      setActiveIndex(nextIndex);
    },
    [getSlideElements],
  );

  const getCurrentIndex = useCallback(() => {
    const container = containerRef.current;
    const slideEls = getSlideElements();
    if (!container || slideEls.length === 0) return activeIndex;

    const currentIndex = slideEls.findIndex(
      (slide) =>
        Math.abs(slide.offsetTop - container.scrollTop) <
        slide.offsetHeight * 0.4,
    );
    return currentIndex === -1 ? activeIndex : currentIndex;
  }, [activeIndex, getSlideElements]);

  const goToSlide = useCallback(
    (direction: 1 | -1) => {
      goToIndex(getCurrentIndex() + direction);
    },
    [getCurrentIndex, goToIndex],
  );

  const exitPresentMode = useCallback(async () => {
    setIsPresenting(false);
    setCursorHidden(false);
    ignoreCursorUntilRef.current = 0;
    shellRef.current?.classList.remove("cursor-hidden");
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // ignore
      }
    }
  }, []);

  const enterPresentMode = useCallback(
    async (fromIndex = 0) => {
      // Hide pointer immediately on slideshow start (before React paint)
      setCursorHidden(true);
      setIsPresenting(true);
      ignoreCursorUntilRef.current = Date.now() + 500;
      shellRef.current?.classList.add("is-presenting", "cursor-hidden");

      const shell = shellRef.current;
      if (shell && !document.fullscreenElement) {
        try {
          await shell.requestFullscreen();
        } catch {
          // Browser may block fullscreen; CSS present mode still works
        }
      }

      // Wait for sidebar hide / fullscreen layout before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          goToIndex(fromIndex, "auto");
          containerRef.current?.focus();
        });
      });
    },
    [goToIndex],
  );

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsPresenting(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "F5") {
        event.preventDefault();
        if (event.shiftKey) {
          void enterPresentMode(getCurrentIndex());
        } else {
          void enterPresentMode(0);
        }
        return;
      }

      if (event.key === "Escape" && isPresenting) {
        event.preventDefault();
        void exitPresentMode();
        return;
      }

      const keysNext = ["ArrowDown", "PageDown", " ", "ArrowRight"];
      const keysPrev = ["ArrowUp", "PageUp", "ArrowLeft"];

      if (keysNext.includes(event.key)) {
        event.preventDefault();
        goToSlide(1);
      } else if (keysPrev.includes(event.key)) {
        event.preventDefault();
        goToSlide(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToIndex(slides.length - 1);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    enterPresentMode,
    exitPresentMode,
    getCurrentIndex,
    goToIndex,
    goToSlide,
    isPresenting,
    slides.length,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActive = () => {
      const slideEls = getSlideElements();
      if (slideEls.length === 0) return;

      const mid = container.scrollTop + container.clientHeight * 0.35;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      slideEls.forEach((slide, index) => {
        const dist = Math.abs(slide.offsetTop - mid + slide.offsetHeight * 0.2);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });

      setActiveIndex(best);
    };

    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    return () => container.removeEventListener("scroll", updateActive);
  }, [getSlideElements]);

  useEffect(() => {
    const slideEls = getSlideElements();
    slideEls.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      if (!isActive) {
        slide.classList.remove("is-entering", "is-motion-pending");
      }
    });

    const activeSlide = slideEls[activeIndex];
    if (!activeSlide) return;

    if (skipInitialMotion.current) {
      skipInitialMotion.current = false;
      activeSlide.classList.add("is-entering");
      return;
    }

    // Hold content hidden until the scroll settles, then replay the slow entrance
    activeSlide.classList.add("is-motion-pending");
    activeSlide.classList.remove("is-entering");

    const timer = window.setTimeout(() => {
      restartSlideMotion(activeSlide);
    }, 520);

    return () => window.clearTimeout(timer);
  }, [activeIndex, getSlideElements, restartSlideMotion]);

  useEffect(() => {
    if (!isPresenting) {
      setCursorHidden(false);
      shellRef.current?.classList.remove("cursor-hidden");
      if (cursorTimerRef.current !== null) {
        window.clearTimeout(cursorTimerRef.current);
        cursorTimerRef.current = null;
      }
      return;
    }

    const hideLater = () => {
      if (cursorTimerRef.current !== null) {
        window.clearTimeout(cursorTimerRef.current);
      }
      cursorTimerRef.current = window.setTimeout(() => {
        setCursorHidden(true);
        shellRef.current?.classList.add("cursor-hidden");
        cursorTimerRef.current = null;
      }, 3000);
    };

    const onMouseMove = () => {
      // Ignore click/release movement right after entering slideshow
      if (Date.now() < ignoreCursorUntilRef.current) return;
      setCursorHidden(false);
      shellRef.current?.classList.remove("cursor-hidden");
      hideLater();
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (cursorTimerRef.current !== null) {
        window.clearTimeout(cursorTimerRef.current);
        cursorTimerRef.current = null;
      }
    };
  }, [isPresenting]);

  return (
    <div
      ref={shellRef}
      className={[
        "presentation-shell",
        isPresenting ? "is-presenting" : "",
        cursorHidden ? "cursor-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <aside className="slide-sidebar" aria-label="Slide navigator">
        <div className="slide-sidebar__head">
          <span>Slides</span>
          <button
            type="button"
            className="present-btn"
            onClick={() => void enterPresentMode(0)}
            title="Start slideshow from beginning (F5)"
            aria-label="Start slideshow from beginning"
          >
            <PresentIcon />
          </button>
        </div>
        <nav className="slide-sidebar__list">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const number = String(index + 1).padStart(2, "0");

            return (
              <button
                key={`${number}-${slide.title}`}
                type="button"
                className={`slide-thumb${isActive ? " is-active" : ""}`}
                onClick={() => goToIndex(index)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              >
                <span className="slide-thumb__num">{index + 1}</span>
                <span className="slide-thumb__card">
                  <span className="slide-thumb__bar" aria-hidden="true" />
                  <span className="slide-thumb__title">{slide.preview}</span>
                  <span className="slide-thumb__label">{slide.title}</span>
                </span>
              </button>
            );
          })}
        </nav>
        <div className="slide-sidebar__foot">
          <span>
            {activeIndex + 1} / {slides.length}
          </span>
          <button
            type="button"
            className="present-btn present-btn--foot"
            onClick={() => void enterPresentMode(activeIndex)}
            title="Start slideshow from current slide (Shift+F5)"
            aria-label="Start slideshow from current slide"
          >
            <PresentIcon />
          </button>
        </div>
      </aside>

      <div
        ref={containerRef}
        className="presentation"
        tabIndex={0}
        role="region"
        aria-label="Ultracare presentation"
      >
        {children}
      </div>
    </div>
  );
}
