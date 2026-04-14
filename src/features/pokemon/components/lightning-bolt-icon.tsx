type LightningBoltIconProps = {
  className?: string
}

export function LightningBoltIcon({ className }: LightningBoltIconProps) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        fill="#FACC15"
        stroke="#CA8A04"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}
