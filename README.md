# Fernhill Admin

Back office for Fernhill shops: orders, refunds, disputes and payouts.

```sh
npm install
npm run dev        # http://localhost:3000, seeded with 12 orders
npm test
```

| Folder | What |
|---|---|
| `src/web` | The admin UI (orders table, refund dialog) |
| `src/server` | Its API and the payment provider webhooks |
| `seed` | Local data for `npm run dev` |

Environments: DEV on `localhost:3000`, STAGING on test payments, PROD.
