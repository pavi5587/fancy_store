export default function Rating({ value, count, size = 14 }: { value: number; count?: number; size?: number }) {
  const stars = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${value} out of 5`}>
      <div className="flex">
        {stars.map((i) => {
          const filled = value >= i + 1;
          const half = !filled && value > i && value < i + 1;
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 20 20" className="text-gold-500">
              <defs>
                <linearGradient id={`half-${i}-${value}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#E5D9C8" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.5l2.6 5.3 5.8.85-4.2 4.1 1 5.8L10 14.9l-5.2 2.75 1-5.8-4.2-4.1 5.8-.85L10 1.5z"
                fill={filled ? "currentColor" : half ? `url(#half-${i}-${value})` : "#E5D9C8"}
              />
            </svg>
          );
        })}
      </div>
      {count !== undefined && <span className="text-xs text-plum-400">({count})</span>}
    </div>
  );
}
