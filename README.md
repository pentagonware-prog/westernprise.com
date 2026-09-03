# Westernprise website

The public Westernprise product website and demo-request experience.

## Environment flow

1. **Local** — work on a feature branch and run `npm run dev`.
2. **Staging** — push or merge into `develop`. CI validates the site, then the deployment workflow publishes it to `staging.westernprise.com`.
3. **Live** — merge the approved `develop` state into `production`. CI validates the same source before the deployment workflow publishes it to `westernprise.com`.

Do not commit `.env` files. Configure hosted values in the hosting environment and keep local-only values in an ignored `.env.local` file.

## Local setup

```bash
npm ci
npm run dev
```

Then open `http://localhost:5173`.

## Validation

```bash
npm run build
node --test --experimental-loader ./scripts/cloudflare-validation-loader.mjs tests/rendered-html.test.mjs
```

The site uses Cloudflare-compatible server output, D1 for demo requests, and the hosting declaration in `.openai/hosting.json`.
