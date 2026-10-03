import type { IncomingMessage, ServerResponse } from 'node:http';

// The payment provider calls this for charges, refunds and disputes.
export async function paymentsWebhook(req: IncomingMessage, res: ServerResponse) {
  const event = JSON.parse(await body(req));
  switch (event.type) {
    case 'refund.succeeded': await markRefunded(event.data.order); break;
    case 'refund.failed': await retryRefund(event.data.order); break;
    case 'dispute.opened': await markDisputed(event.data.order); break;
  }
  res.writeHead(200).end();
}

async function body(req: IncomingMessage) {
  let text = '';
  for await (const chunk of req) text += chunk;
  return text;
}

declare function markRefunded(order: string): Promise<void>;
declare function markDisputed(order: string): Promise<void>;
declare function retryRefund(order: string): Promise<void>;
