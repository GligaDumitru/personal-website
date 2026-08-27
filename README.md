# personal-website

Personal site built with Next.js (App Router), statically exported (`output: "export"`) — no server/API, content comes from `data.json` at build time.

## Development

```
pnpm dev     # local dev server
pnpm build   # type-checks and produces the static export in out/
pnpm lint    # eslint
```

## AI summary

`profile.aiSummary` in `data.json` is generated (not written by hand). To regenerate after editing profile/timeline data:

1. Get a free Gemini API key at https://aistudio.google.com/apikey (no card required)
2. Add it to `.env.local`: `GOOGLE_GENERATIVE_AI_API_KEY=...`
3. Run `pnpm generate:ai-summary`

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- Deployed to Vercel via Git integration (push to `main` deploys)
