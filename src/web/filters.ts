import type { OrdersQuery } from '../server/orders';

export function readFilters(search: string): OrdersQuery {
  const params = new URLSearchParams(search);
  return { status: (params.get('status') ?? undefined) as OrdersQuery['status'], q: params.get('q') ?? undefined };
}

export function writeFilters(query: OrdersQuery): string {
  const params = new URLSearchParams();
  if (query.status) params.set('status', query.status);
  if (query.q) params.set('q', query.q);
  return params.size ? `?${params}` : '';
}
