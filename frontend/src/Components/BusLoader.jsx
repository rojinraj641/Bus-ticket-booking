import { useEffect, useState } from "react";

const MESSAGES = [
  "Finding the best route",
  "Locking your seat",
  "Confirming your fare",
];

const BusLoader = ({ label = "Booking your ride..." }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC]">
      <style>{`
        @keyframes bl-road-scroll {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -120; }
        }
        @keyframes bl-bus-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes bl-marker-scroll {
          from { transform: translateX(60px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          to { transform: translateX(-340px); opacity: 0; }
        }
        @keyframes bl-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bl-road-line {
          animation: bl-road-scroll 0.6s linear infinite;
        }
        .bl-bus {
          animation: bl-bus-bounce 1.1s ease-in-out infinite;
        }
        .bl-marker {
          animation: bl-marker-scroll 2.4s linear infinite;
        }
        .bl-marker:nth-child(2) { animation-delay: 0.8s; }
        .bl-marker:nth-child(3) { animation-delay: 1.6s; }
        .bl-message {
          animation: bl-fade-in 0.4s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .bl-road-line, .bl-bus, .bl-marker, .bl-message {
            animation: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 340 200"
        preserveAspectRatio="xMidYMid meet"
        className="w-[220px] sm:w-[280px] md:w-[300px] h-auto overflow-visible"
      >
        {/* horizon mile-markers, scrolling toward the viewer */}
        <g clipPath="url(#bl-clip)">
          <rect
            className="bl-marker"
            x="0"
            y="86"
            width="6"
            height="16"
            rx="2"
            fill="#3B82F6"
            opacity="0.35"
          />
          <rect
            className="bl-marker"
            x="0"
            y="86"
            width="6"
            height="16"
            rx="2"
            fill="#3B82F6"
            opacity="0.35"
          />
          <rect
            className="bl-marker"
            x="0"
            y="86"
            width="6"
            height="16"
            rx="2"
            fill="#3B82F6"
            opacity="0.35"
          />
        </g>
        <clipPath id="bl-clip">
          <rect x="0" y="0" width="340" height="200" />
        </clipPath>

        {/* road */}
        <rect x="0" y="132" width="340" height="34" fill="#E2E8F0" />
        <line
          className="bl-road-line"
          x1="0"
          y1="149"
          x2="340"
          y2="149"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeDasharray="20 16"
          strokeLinecap="round"
        />

        {/* bus */}
        <g className="bl-bus">
          {/* soft ground shadow */}
          <ellipse cx="170" cy="168" rx="62" ry="6" fill="#111827" opacity="0.08" />

          {/* body */}
          <rect x="108" y="92" width="124" height="52" rx="14" fill="#2563EB" />
          <rect x="108" y="92" width="124" height="20" rx="10" fill="#3B82F6" />

          {/* windshield + windows */}
          <rect x="120" y="100" width="26" height="18" rx="4" fill="#F8FAFC" />
          <rect x="152" y="100" width="26" height="18" rx="4" fill="#F8FAFC" />
          <rect x="184" y="100" width="26" height="18" rx="4" fill="#F8FAFC" />
          <rect x="216" y="100" width="10" height="18" rx="4" fill="#F8FAFC" opacity="0.85" />

          {/* headlight + bumper accent */}
          <rect x="228" y="122" width="8" height="8" rx="2" fill="#F59E0B" />
          <rect x="108" y="136" width="124" height="6" rx="3" fill="#111827" opacity="0.12" />

          {/* wheels */}
          <circle cx="134" cy="146" r="11" fill="#111827" />
          <circle cx="134" cy="146" r="4.5" fill="#F8FAFC" />
          <circle cx="206" cy="146" r="11" fill="#111827" />
          <circle cx="206" cy="146" r="4.5" fill="#F8FAFC" />
        </g>
      </svg>

      <p className="mt-2 px-6 text-center text-base sm:text-lg font-semibold text-[#111827]">
        {label}
      </p>
      <p
        key={msgIndex}
        className="bl-message mt-1 px-6 text-center text-xs sm:text-sm text-[#4B5563]"
      >
        {MESSAGES[msgIndex]}&hellip;
      </p>
    </div>
  );
};

export default BusLoader;