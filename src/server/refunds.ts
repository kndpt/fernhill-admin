export const delays = [60, 300, 1_800, 7_200, 43_200];

export interface Attempt { order: string; count: number; next: number | null }

export function nextAttempt(order: string, count: number, now = Date.now() / 1000): Attempt {
  const delay = delays[count];
  return { order, count: count + 1, next: delay === undefined ? null : now + delay };
}
