import Image from "next/image";
import type { ReactNode } from "react";

type SlideShellProps = {
  children: ReactNode;
  label: string;
  slideNumber: string;
  slideLabel: string;
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
  slideNumber,
  slideLabel,
  className = "",
  showLogo = true,
}: SlideShellProps) {
  return (
    <section
      className={`slide content-slide ${className}`.trim()}
      aria-label={label}
    >
      <div className="slide-rail" aria-hidden="true" />
      <div className="slide-grain" aria-hidden="true" />

      <div className="slide-frame" aria-hidden="true">
        <span className="corner corner--tl" />
        <span className="corner corner--tr" />
        <span className="corner corner--bl" />
        <span className="corner corner--br" />
      </div>

      <header className="slide-topbar">
        <div className="slide-topbar__left">
          <span className="slide-index-num">{slideNumber}</span>
          <span className="slide-index-rule" aria-hidden="true" />
          <span className="slide-index-label">{slideLabel}</span>
        </div>
        <div className="slide-topbar__right">
          <span className="topbar-status">
            <span className="topbar-dot" aria-hidden="true" />
            Confidential
          </span>
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

      <SlideBrandMark />
    </section>
  );
}
