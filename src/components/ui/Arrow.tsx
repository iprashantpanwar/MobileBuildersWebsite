type Props = { direction?: "right" | "up-right" | "down"; className?: string };

export function Arrow({ direction = "right", className }: Props) {
  const rotate = direction === "up-right" ? -45 : direction === "down" ? 90 : 0;
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
