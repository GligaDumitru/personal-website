# personal-website

Personal site built with Next.js (App Router), statically exported (`output: "export"`) — no server/API, content comes from `data.json` at build time.

## Development

```
npm run dev     # local dev server
npm run build   # type-checks and produces the static export in out/
npm run lint    # eslint
```

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- Deployed to Vercel via Git integration (push to `main` deploys)
