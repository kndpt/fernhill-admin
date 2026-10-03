import { useState } from 'react';
import { money } from './money';
import type { Order } from '../server/orders';

export function RefundDialog({ order, onRefund }: { order: Order; onRefund: (cents: number) => Promise<void> }) {
  const left = order.amount - order.refundedAmount;
  const [cents, setCents] = useState(left);
  const [busy, setBusy] = useState(false);
  return (
    <dialog open>
      <h2>Refund {order.id}</h2>
      <label>
        Amount, up to {money(left, order.currency)}
        <input type="number" min={0.01} max={left / 100} step={0.01} value={cents / 100}
          onChange={e => setCents(Math.round(Number(e.target.value) * 100))} />
      </label>
      <button disabled={busy || cents <= 0 || cents > left} onClick={async () => { setBusy(true); await onRefund(cents); }}>
        Refund {money(cents, order.currency)}
      </button>
    </dialog>
  );
}
