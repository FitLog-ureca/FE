export function calcIntensity(
  completed: number,
  total: number
): number {
  if (total === 0 || completed === 0) return 0;

  const ratio = completed / total;

  if (ratio <= 0.33) return 1;
  if (ratio <= 0.66) return 2;
  return 3;
}
