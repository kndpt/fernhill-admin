import { z } from 'zod';

export const Order = z.object({
  id: z.string(),
  shop: z.string(),
  customer: z.object({ name: z.string(), email: z.string() }),
  amount: z.number().int(),
  currency: z.string().length(3),
  status: z.enum(['paid', 'pending', 'refunded', 'failed', 'disputed']),
  createdAt: z.string(),
});
export type Order = z.infer<typeof Order>;

export interface OrdersQuery { status?: Order['status']; q?: string; cursor?: string; limit?: number }

export async function listOrders(db: Db, query: OrdersQuery): Promise<Order[]> {
  const rows = await db.orders.findMany({
    where: {
      status: query.status,
      OR: query.q ? [{ customerName: { contains: query.q, mode: 'insensitive' } },
                     { customerEmail: { contains: query.q, mode: 'insensitive' } }] : undefined,
    },
    orderBy: { createdAt: 'desc' },
    take: Math.min(query.limit ?? 50, 200),
    cursor: query.cursor ? { id: query.cursor } : undefined,
    skip: query.cursor ? 1 : 0,
  });
  return rows.map(row => Order.parse(row));
}

export interface Db { orders: { findMany(args: object): Promise<unknown[]> } }
