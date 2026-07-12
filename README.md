# aipox.nl — website

The source of my marketing site, [aipox.nl](https://aipox.nl). Published in the open
because I think you should be able to see how something is built before you trust it.

I'm Arthur Scheen. Under the name **AiPOX** I build software that takes work off your
hands — as a solo maker directing a small fleet of AI agents, everything as-code and
traceable in git. The site itself is one of the receipts: how it was built is written
up at **[aipox.nl/en/how-i-build](https://aipox.nl/en/how-i-build)**.

## Stack

- **[Next.js 15](https://nextjs.org)** (App Router) · **React 19** · TypeScript
- **[Tailwind CSS v4](https://tailwindcss.com)** with OKLCH design tokens, dark-first
- **[next-intl](https://next-intl.dev)** — Dutch (default) + English
- **[next-themes](https://github.com/pacocoursey/next-themes)** — theme toggle via `[data-theme]`
- **[shadcn/ui](https://ui.shadcn.com)** (Radix) · **[motion](https://motion.dev)**

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serve the build
```

## Deploy

Containerised — a multi-stage `Dockerfile` producing a standalone Next.js server:

```bash
npm run deploy       # docker compose up -d --build --force-recreate
```

---

© Arthur Scheen · AiPOX. Shared to show the work; not a template.
