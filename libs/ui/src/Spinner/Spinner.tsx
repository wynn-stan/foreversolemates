export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r="10"
        cx="12"
        cy="12"
        strokeWidth="4"
        stroke="currentColor"
        className="opacity-25"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default Spinner;
