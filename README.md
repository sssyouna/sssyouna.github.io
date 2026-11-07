# Younass.me

Bilingual portfolio for Younass Ibn Abdeslam, built with Next.js App Router,
TypeScript, Tailwind CSS, and `next-intl`. The English and French routes live
under `/en` and `/fr`; project case studies and page content are statically
defined in `src/content/` and `src/messages/`.

## Development

```bash
npm ci
npm run dev
```

Run the project checks before opening a pull request:

```bash
npm run lint
npx tsc --noEmit
npm audit --omit=dev
npm run build
```

## Content and project sources

- `src/content/projects.ts` contains bilingual project summaries, case-study
  sections, technology lists, status, and repository links.
- `src/content/achievements.ts` and `src/messages/` contain achievement records
  and their English/French copy.
- `src/content/profile.ts` contains verified public profile details.
- `src/content/assets.ts` maps replaceable visual assets and certificate PDFs.
  `src/lib/assets.ts` filters out files that are not present, so missing files
  do not create broken image or document requests.

### Portfolio asset map

```text
public/images/
├── background/hero-bg.jpg
├── education/ensa-campus.jpg
├── education/education-extra.jpg
├── events/ctf-01.jpg
├── events/ctf-02.jpg
├── events/gitex-01.jpg
├── events/gitex-02.jpg
├── certifications/security-plus.pdf
├── certifications/tryhackme-jr-pentester.pdf
├── certifications/tryhackme-devsecops.pdf
├── experience/cimar-01.jpg
├── experience/cimar-02.jpg
├── experience/macobate-01.jpg
└── experience/macobate-02.jpg
```

No project photographs or certification documents are currently checked in.
Add only authentic assets to these paths, or change their names in
`src/content/assets.ts`. The optional CV is served from `public/cv.pdf`; its
download action appears only when that file exists.

## Deployment

The project’s current deployment setup and domain guidance are in
[`DEPLOYMENT.md`](./DEPLOYMENT.md). The application uses `https://younass.me` for
canonical metadata, localized alternates, the sitemap, and robots metadata.
