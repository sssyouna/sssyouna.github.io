# Younass.me deployment

## Repository and Vercel setup

1. Push the repository to the intended GitHub repository.
2. In Vercel, import the GitHub repository as a new project.
3. Keep the detected Next.js build settings unless the Vercel project reports a specific requirement.
4. Deploy a preview and verify the production build before assigning the custom domain.

## Production domains

Configure both `younass.me` and `www.younass.me` in the Vercel project settings. Choose one canonical hostname and configure the other to redirect to it without creating a redirect loop.

The application uses `https://younass.me` as its canonical metadata origin. The exact DNS records and values must be copied from the Vercel dashboard for the project; they are not hard-coded here.

## DNS and HTTPS

1. Add the DNS records shown by Vercel at the domain provider.
2. Wait for DNS propagation and verify both hostnames resolve to the Vercel project.
3. Confirm Vercel has issued certificates for the configured domains.
4. Confirm HTTP requests redirect to HTTPS and that the canonical hostname behaves as expected.

Do not enable HSTS preload or `includeSubDomains` until every relevant subdomain is confirmed to be HTTPS-ready.

## Build and deployment checks

Run locally before merging:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

After deployment, verify both locales, the project case study, `sitemap.xml`, `robots.txt`, canonical URLs, language alternates, security headers, and mobile navigation.

## Redeploying

Push approved changes to the configured production branch. Vercel will create a deployment from the commit. Review the preview deployment when available, then promote or merge according to the project’s Vercel workflow.
