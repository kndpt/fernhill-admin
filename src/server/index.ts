import { createServer } from 'node:http';
import { paymentsWebhook } from './payments';

const port = Number(process.env.PORT ?? 3000);
createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhooks/payments') return paymentsWebhook(req, res);
  res.writeHead(404).end();
}).listen(port, () => console.log(`Fernhill Admin on http://localhost:${port}`));
