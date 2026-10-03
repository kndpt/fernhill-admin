import type { Order } from './orders';

const quote = (value: string) => /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;

export function ordersCSV(orders: Order[]): string {
  const header = ['id', 'shop', 'customer', 'email', 'amount', 'currency', 'status', 'created_at'];
  const lines = orders.map(o => [o.id, o.shop, o.customer.name, o.customer.email,
    (o.amount / 100).toFixed(2), o.currency, o.status, o.createdAt].map(quote).join(','));
  return [header.join(','), ...lines].join('\n') + '\n';
}
