"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import FlowBand from "@/components/FlowBand";
import { useSlideNumber } from "@/components/SlideIndexContext";
import { SlideBrandMark } from "@/components/SlideShell";

export default function TitleSlide() {
  const slideRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(false);
  const displayNumber = useSlideNumber("01");

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion.current) return;
    const slide = slideRef.current;
    if (!slide || !bandRef.current) return;

    const rect = slide.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    bandRef.current.style.transform = `translate3d(${x * 18}px, ${y * 12}px, 0)`;
  }, []);

  return (
    <section
      ref={slideRef}
      className="slide title-slide"
      aria-label="Title slide"
      onPointerMove={onPointerMove}
    >
      <div className="title-slide__rail" aria-hidden="true" />
      <div className="title-slide__grain" aria-hidden="true" />

      <div ref={bandRef} className="title-slide__band-wrap">
        <FlowBand className="title-slide__band" />
      </div>

      <div className="title-slide__frame" aria-hidden="true">
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
      </div>

      <header className="title-slide__topbar">
        <div className="topbar-right">
          <Image
            src="/ultracare-logo.png"
            alt="Ultracare"
            width={640}
            height={160}
            priority
            className="topbar-logo"
          />
        </div>
      </header>

      <div className="title-slide__stage">
        <div className="title-slide__copy">
          <h1 className="company">Ultracare Private Limited</h1>

          <p className="fiscal">FY2026 / 27</p>

          <h2 className="headline">
            <span className="line line-1">
              <span className="line-reveal">Quarter One</span>
            </span>
            <span className="line line-2">
              <span className="line-accent" aria-hidden="true" />
              <span className="line-reveal">Performance</span>
            </span>
            <span className="line line-3">
              <span className="line-reveal">Review</span>
            </span>
          </h2>

          <p className="tagline">
            Financial Year 2026/27 | Operational &amp; Financial Analysis
          </p>
          <p className="supporting">
            Includes Comprehensive P&amp;L Statement, <br /> Job Summary, &amp;
            Q2 Strategy
          </p>
        </div>
      </div>

      <footer className="title-slide__footer">
        <div className="footer-left">
          <span className="footer-num">{displayNumber}</span>
        </div>
      </footer>

      <SlideBrandMark />
    </section>
  );
}
