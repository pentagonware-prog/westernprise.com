# Westernprise website

The public Westernprise product website and demo-request experience.

## Environment flow

1. **Local** — work on a feature branch and run `npm run dev`.
2. **Staging** — open a pull request into `staging`. CI installs the locked dependencies, builds the deployable artifact, and runs the rendered-page test.
3. **Live** — after approval on staging, open a pull request from `staging` into `main`. `main` is the production source of truth.

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
