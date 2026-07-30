"use client";

type FlowBandProps = {
  className?: string;
};

/** Multi-strand flowing ribbon — red core, white/black outer fibers */
export default function FlowBand({ className }: FlowBandProps) {
  const strands = [
    { d: "M-80,320 C180,80 420,520 720,280 C920,140 1100,360 1280,220", w: 1.2, c: "rgba(10,10,10,0.04)", delay: 0 },
    { d: "M-60,340 C200,100 440,540 740,300 C940,160 1120,380 1300,240", w: 1.4, c: "rgba(10,10,10,0.05)", delay: 0.05 },
    { d: "M-40,360 C220,120 460,560 760,320 C960,180 1140,400 1320,260", w: 1.6, c: "rgba(10,10,10,0.05)", delay: 0.1 },
    { d: "M-20,380 C240,140 480,580 780,340 C980,200 1160,420 1340,280", w: 2, c: "rgba(10,10,10,0.06)", delay: 0.12 },
    { d: "M0,400 C260,160 500,600 800,360 C1000,220 1180,440 1360,300", w: 2.2, c: "rgba(10,10,10,0.06)", delay: 0.15 },
    { d: "M20,420 C280,180 520,620 820,380 C1020,240 1200,460 1380,320", w: 2.4, c: "rgba(10,10,10,0.07)", delay: 0.18 },
    { d: "M40,440 C300,200 540,640 840,400 C1040,260 1220,480 1400,340", w: 3, c: "rgba(225,6,0,0.12)", delay: 0.2 },
    { d: "M60,455 C320,215 560,655 860,415 C1060,275 1240,495 1420,355", w: 4.5, c: "rgba(225,6,0,0.22)", delay: 0.22 },
    { d: "M80,470 C340,230 580,670 880,430 C1080,290 1260,510 1440,370", w: 6, c: "rgba(225,6,0,0.28)", delay: 0.24 },
    { d: "M100,485 C360,245 600,685 900,445 C1100,305 1280,525 1460,385", w: 4.5, c: "rgba(225,6,0,0.2)", delay: 0.26 },
    { d: "M120,500 C380,260 620,700 920,460 C1120,320 1300,540 1480,400", w: 3, c: "rgba(225,6,0,0.1)", delay: 0.28 },
    { d: "M140,515 C400,275 640,715 940,475 C1140,335 1320,555 1500,415", w: 2.2, c: "rgba(10,10,10,0.06)", delay: 0.3 },
    { d: "M160,530 C420,290 660,730 960,490 C1160,350 1340,570 1520,430", w: 1.8, c: "rgba(10,10,10,0.05)", delay: 0.32 },
    { d: "M180,545 C440,305 680,745 980,505 C1180,365 1360,585 1540,445", w: 1.4, c: "rgba(10,10,10,0.04)", delay: 0.34 },
    { d: "M200,560 C460,320 700,760 1000,520 C1200,380 1380,600 1560,460", w: 1.2, c: "rgba(10,10,10,0.04)", delay: 0.36 },
  ];

  return (
    <div className={className} aria-hidden="true">
      <svg
        className="flow-band__svg"
        viewBox="0 0 1400 780"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bandCore" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e10600" stopOpacity="0.06" />
            <stop offset="35%" stopColor="#e10600" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#ff2a1f" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#e10600" stopOpacity="0.1" />
          </linearGradient>
          <filter id="bandBlur" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <path
          className="flow-band__bloom"
          d="M40,440 C300,200 540,640 840,400 C1040,260 1220,480 1400,340"
          stroke="url(#bandCore)"
          strokeWidth="40"
          strokeLinecap="round"
          opacity="0.1"
          filter="url(#bandBlur)"
        />

        {strands.map((strand, i) => (
          <path
            key={i}
            className="flow-band__strand"
            d={strand.d}
            stroke={i === 8 ? "url(#bandCore)" : strand.c}
            strokeWidth={strand.w}
            strokeLinecap="round"
            style={{ animationDelay: `${strand.delay + 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
