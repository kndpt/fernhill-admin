// Twelve orders across three shops, enough to see every status locally.
export const orders = Array.from({ length: 12 }, (_, i) => ({
  id: `FH-${i + 1}`,
  shop: `Seed Shop ${(i % 3) + 1}`,
  customer: { name: `Seed Customer ${i + 1}`, email: `customer${i + 1}@seed.local` },
  amount: 1000,
  currency: 'EUR',
  status: i % 3 === 2 ? 'pending' : 'paid',
  createdAt: new Date(Date.now() - 5 * 86_400_000).toISOString(),
}));
