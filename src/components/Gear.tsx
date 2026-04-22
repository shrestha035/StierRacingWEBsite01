interface GearProps {
  size?: number;
  teeth?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Gear = ({ size = 200, teeth = 12, color = "hsl(var(--primary))", className = "", style }: GearProps) => {
  const center = size / 2;
  const outerR = size * 0.45;
  const innerR = size * 0.38;
  const hubR = size * 0.12;
  const holeR = size * 0.05;

  const toothPaths = Array.from({ length: teeth }).map((_, i) => {
    const angle = (i * 360) / teeth;
    const w = (360 / teeth) * 0.45;
    const a1 = ((angle - w) * Math.PI) / 180;
    const a2 = ((angle + w) * Math.PI) / 180;
    const a1i = ((angle - w * 1.4) * Math.PI) / 180;
    const a2i = ((angle + w * 1.4) * Math.PI) / 180;
    const toothR = outerR * 1.18;
    return `M ${center + innerR * Math.cos(a1i)} ${center + innerR * Math.sin(a1i)}
            L ${center + toothR * Math.cos(a1)} ${center + toothR * Math.sin(a1)}
            L ${center + toothR * Math.cos(a2)} ${center + toothR * Math.sin(a2)}
            L ${center + innerR * Math.cos(a2i)} ${center + innerR * Math.sin(a2i)} Z`;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={style}>
      <circle cx={center} cy={center} r={outerR} fill="hsl(0 0% 8%)" stroke={color} strokeWidth="2" />
      {toothPaths.map((d, i) => (
        <path key={i} d={d} fill="hsl(0 0% 12%)" stroke={color} strokeWidth="1.5" />
      ))}
      <circle cx={center} cy={center} r={innerR * 0.85} fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx={center} cy={center} r={hubR} fill={color} opacity="0.9" />
      <circle cx={center} cy={center} r={holeR} fill="hsl(0 0% 4%)" />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * 60 * Math.PI) / 180;
        const r = innerR * 0.55;
        return (
          <circle
            key={i}
            cx={center + r * Math.cos(a)}
            cy={center + r * Math.sin(a)}
            r={size * 0.025}
            fill="hsl(0 0% 4%)"
          />
        );
      })}
    </svg>
  );
};
