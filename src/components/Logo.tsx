import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", isDark = false }) => {
  // Color logic: memor part is charcoal in light, white in dark for visibility
  const memorColor = isDark ? "#F8FAFC" : "#1E293B";
  const phoColor = "#C48F28";

  return (
    <svg 
      className={className} 
      viewBox="0 0 140 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="memorpho logo"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <mask id="aperture-mask">
          <rect x="-10" y="-10" width="20" height="20" fill="white" />
          <g stroke="black" strokeWidth="1.2">
            <line x1="0" y1="-10" x2="0" y2="10" transform="rotate(0)" />
            <line x1="0" y1="-10" x2="0" y2="10" transform="rotate(60)" />
            <line x1="0" y1="-10" x2="0" y2="10" transform="rotate(120)" />
          </g>
          <circle cx="0" cy="0" r="2.8" fill="black" />
        </mask>
      </defs>

      {/* Text group using Inter-like proportions */}
      <g transform="translate(0, 28)" fill={memorColor} style={{ fontFamily: '"Inter", sans-serif', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.04em' }}>
        <text>
          <tspan>memor</tspan>
          <tspan fill={phoColor}>ph</tspan>
        </text>
      </g>

      {/* Aperture (replacing the final 'o') */}
      <g transform="translate(116.5, 21)">
        <circle cx="0" cy="0" r="7.5" fill={phoColor} mask="url(#aperture-mask)" />
      </g>
    </svg>
  );
};

export default Logo;
