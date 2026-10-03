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

export interface OrdersQuery { status?: Order['status']; q?: string }

export async function listOrders(db: Db, query: OrdersQuery): Promise<Order[]> {
  const rows = await db.orders.findMany({
    where: { status: query.status, customerName: query.q ? { contains: query.q } : undefined },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return rows.map(row => Order.parse(row));
}

export interface Db { orders: { findMany(args: object): Promise<unknown[]> } }
