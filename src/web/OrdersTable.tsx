import { money } from './money';
import type { Order } from '../server/orders';

const tone: Record<Order['status'], string> = {
  paid: 'paid', pending: 'pending', refunded: 'refunded', partially_refunded: 'refunded', failed: 'failed', disputed: 'disputed',
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <table className="orders">
      <thead>
        <tr><th>Order</th><th>Customer</th><th>Shop</th><th>Amount</th><th>Status</th><th>Created</th></tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td className="mono">{order.id}</td>
            <td>{order.customer.name}<small>{order.customer.email}</small></td>
            <td>{order.shop}</td>
            <td className="num">
              {money(order.amount - order.refundedAmount, order.currency)}
              {order.refundedAmount > 0 && <small>−{money(order.refundedAmount, order.currency)} refunded</small>}
            </td>
            <td><span className={`pill ${tone[order.status]}`}>{order.status}</span></td>
            <td><time dateTime={order.createdAt}>{order.createdAt}</time></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
