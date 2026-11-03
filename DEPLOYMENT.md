# Younass.me deployment

## Hosting model

Use Vercel's native GitHub integration for deployments. This repository has no GitHub Pages deployment workflow, no Vercel GitHub Actions workflow, and no `vercel.json`; there is no Actions deployment to remove or disable. The repository name ending in `.github.io` does not itself configure a Pages workflow.

Keep the existing GitHub Actions checks and security scans. Do not add Vercel deployment actions or Vercel credentials to GitHub Actions. Vercel's Git integration creates Preview Deployments for pull requests and other non-production branch updates, and Production Deployments for updates to the configured production branch. Set that branch to `main` in Vercel.

## Vercel project setup

Complete these steps in the Vercel dashboard:

1. Import `sssyouna/sssyouna.github.io` and connect the GitHub repository.
2. Select Next.js as the framework and keep the repository root as the project root.
3. Keep Vercel's detected npm install command based on `package-lock.json` and set the build command to `npm run build`. Keep the default Next.js output handling; do not set an `out` directory or enable static export. GitHub CI installs reproducibly with `npm ci`.
4. Under the project's Git settings, set `main` as the Production Branch. Confirm pull requests targeting `main` receive Preview Deployments and pushes/merges to `main` create Production Deployments.
5. Optionally enable GitHub branch protection so the CI check is required before merging. CodeQL and Gitleaks remain separate security workflows and do not deploy.

Vercel's native Git integration handles both preview and production deployments. The repository's existing CI only runs checks; it should not deploy the same commit a second time.

## Runtime and build requirements

- The project uses Next.js `16.4.3`, next-intl, App Router server rendering, dynamic project routes, and the `src/proxy.ts` locale router. Vercel's native Next.js support runs these without a static-export adapter.
- `next.config.ts` applies security response headers and the Tailwind Turbopack CSS loader. Keep the standard `next build` command used by `npm run build`.
- The only application environment reference is Next.js's `NODE_ENV`, used to select production security headers. Next.js/Vercel set this automatically. No custom Vercel environment variables are currently required; do not add placeholder values or secrets.
- The current CI workflow uses Node.js 22. Next.js 16.4.3 requires Node.js 20.9 or newer. Set Vercel's Node.js version to 22.x if you want it to match CI.

## Domain and HTTPS

The application metadata, sitemap, and robots metadata use `https://younass.me` as the canonical origin. Add `younass.me` in Vercel's **Project Settings → Domains** after importing the project. You may also add `www.younass.me` and configure it to redirect to the canonical host if you want the `www` alias.

Copy the exact DNS records Vercel displays into the domain provider yourself. This repository does not contain DNS records, and no domain configuration is performed by these files. After DNS resolves, verify Vercel has issued the HTTPS certificate and that the canonical host works. Do not enable HSTS preload or `includeSubDomains` until every relevant hostname is HTTPS-ready.

If GitHub repository settings currently publish GitHub Pages, verify the Vercel production deployment and domain first, then disable the Pages publishing source manually. No Pages workflow exists in this repository to remove.

## Validation

Run before merging:

```bash
npm ci
npm run lint
npx tsc --noEmit
npm audit --omit=dev
npm run build
```

After the first Vercel deployment, verify `/en` and `/fr`, project case studies, `sitemap.xml`, `robots.txt`, canonical URLs, language alternates, security headers, and mobile navigation. Check the Vercel deployment logs and GitHub Actions checks; this repository does not claim a deployment is complete until Vercel reports it as ready.
