import { useState } from 'react';
import { money } from './money';
import type { Order } from '../server/orders';

export function RefundDialog({ order, onRefund }: { order: Order; onRefund: (cents: number) => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  return (
    <dialog open>
      <h2>Refund {order.id}</h2>
      <p>The full amount, {money(order.amount, order.currency)}, goes back to {order.customer.name}.</p>
      <button disabled={busy} onClick={async () => { setBusy(true); await onRefund(order.amount); }}>
        Refund {money(order.amount, order.currency)}
      </button>
    </dialog>
  );
}
