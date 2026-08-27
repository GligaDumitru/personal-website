# personal-website

Personal site built with Next.js (App Router). Content comes from `data.json` at build time; the page itself is statically prerendered. One API route (`/api/regenerate-summary`) runs server-side for the live AI summary regeneration.

## Development

```
pnpm dev     # local dev server
pnpm build   # type-checks and builds
pnpm lint    # eslint
```

Needs `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local` for the AI summary API route to work locally (free, no card, at https://aistudio.google.com/apikey). The same key must be set as a Vercel project env var for it to work in production.

## AI summary

`profile.aiSummary` in `data.json` is the initial/fallback summary (not written by hand) — the page shows it first, then the "Regenerate" button on the summary card calls `/api/regenerate-summary` to produce a fresh one live (rate-limited server-side to once per 30s).

To regenerate the fallback in `data.json` after editing profile/timeline data, run `pnpm generate:ai-summary`.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- Deployed to Vercel via Git integration (push to `main` deploys)
