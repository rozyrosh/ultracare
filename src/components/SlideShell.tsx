"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useSlideIndex, useSlideNumber, useSlideTotal } from "@/components/SlideIndexContext";

type SlideShellProps = {
  children: ReactNode;
  label: string;
  slideNumber?: string;
  slideLabel?: string;
  className?: string;
  showLogo?: boolean;
};

export function SlideBrandMark() {
  return (
    <p className="slide-brand-mark">
      Ultracare Private Limited | Q1 FY 2026/27 Review
    </p>
  );
}

export default function SlideShell({
  children,
  label,
  slideNumber = "00",
  className = "",
  showLogo = true,
}: SlideShellProps) {
  const displayNumber = useSlideNumber(slideNumber);
  const slideIndex = useSlideIndex() ?? 1;
  const slideTotal = useSlideTotal() ?? 1;
  const progress = Math.min(100, Math.max(0, (slideIndex / slideTotal) * 100));

  return (
    <section
      className={`slide content-slide ${className}`.trim()}
      aria-label={label}
    >
      <div className="slide-rail" aria-hidden="true" />

      <div className="slide-frame" aria-hidden="true">
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
      </div>

      <header className="slide-topbar">
        <div className="slide-topbar__right">
          {showLogo ? (
            <Image
              src="/ultracare-logo.png"
              alt="Ultracare"
              width={640}
              height={160}
              className="topbar-logo"
            />
          ) : null}
        </div>
      </header>

      <div className="slide-body">{children}</div>

      <div
        className="slide-progress"
        role="progressbar"
        aria-label="Presentation progress"
        aria-valuemin={1}
        aria-valuemax={slideTotal}
        aria-valuenow={slideIndex}
        aria-valuetext={`Slide ${slideIndex} of ${slideTotal}`}
      >
        <span
          className="slide-progress__fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <footer className="slide-footer">
        <span className="footer-num">{displayNumber}</span>
      </footer>

      <SlideBrandMark />
    </section>
  );
}
