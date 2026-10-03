// A token bucket per shop token: 10 per second, bursts of 20.
const rate = 10, burst = 20;
const buckets = new Map<string, { tokens: number; at: number }>();

export function allow(token: string, now = Date.now() / 1000): { ok: boolean; retryAfter: number } {
  const bucket = buckets.get(token) ?? { tokens: burst, at: now };
  bucket.tokens = Math.min(burst, bucket.tokens + (now - bucket.at) * rate);
  bucket.at = now;
  buckets.set(token, bucket);
  if (bucket.tokens < 1) return { ok: false, retryAfter: Math.ceil((1 - bucket.tokens) / rate) };
  bucket.tokens -= 1;
  return { ok: true, retryAfter: 0 };
}
