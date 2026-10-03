import { createHmac, timingSafeEqual } from 'node:crypto';

const tolerance = 5 * 60;

export function verify(header: string | undefined, body: string, secret: string, now = Date.now() / 1000): boolean {
  const parts = Object.fromEntries((header ?? '').split(',').map(part => part.split('=') as [string, string]));
  const t = Number(parts.t);
  if (!parts.v1 || !Number.isFinite(t) || Math.abs(now - t) > tolerance) return false;
  const expected = createHmac('sha256', secret).update(`${t}.${body}`).digest();
  const given = Buffer.from(parts.v1, 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
}
