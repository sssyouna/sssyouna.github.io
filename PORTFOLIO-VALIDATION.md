# Portfolio validation

Date: 2026-11-14. This record covers the portfolio improvements reviewed before publication.

## Implemented

- Shared `WindowFrame` controls and desktop window state now cover Explorer, nested details, Settings, Welcome, and route-based pages/case studies.
- Close removes only its window. A case study closes back to the desktop with its Explorer parent preserved. Minimized windows retain mounted content, selection, scroll position, and taskbar entries. Taskbar clicks restore and focus them.
- Pointer and keyboard focus use one stacking order. Maximize/restore stays within the desktop above the taskbar; Escape dismisses Start first, then the active window.
- Each desktop folder and content/project detail has an independent window identity. Project taskbar titles include the localized project name and distinguish details from full case studies. Explorer back/forward/up navigation remains available.
- Desktop icons use a wrapping grid with vertical overflow when necessary. Mobile windows, controls, taskbar, Start, Explorer, and Settings fit narrow and short viewports. Safe areas and dynamic viewport height are respected. Touch opens icons and Explorer entries with one tap; desktop mouse double-click and keyboard activation remain supported.
- ENSA Fès retains its existing history and school link, with an additional official GDNC link and 13 clearly labeled selected modules. English module names are translations; no semester assignments are inferred. Source: <https://ensaf.ac.ma/fil-gdnc.php>.
- Academic report actions support existing approved DOCX/PDF files in both Explorer details and case-study pages. DOCX actions download the document and explain that a compatible app is needed; native browser preview is not claimed.
- `template/` was removed after checking imports, configuration, active assets, local fonts, and the migrated profile image. Its 92 tracked files are deleted. Obsolete ESLint/TypeScript exclusions were removed. Existing wallpaper, icons, content, localization, routes, SEO, security headers, and deployment settings were preserved.

## Academic report privacy

Three DOCX files and three PDFs were inventoried privately. Three formal reports matched existing portfolio projects; working notes and unmatched documents were excluded. The owner requested that all reports remain private pending review.

No academic reports are included in this commit or in the public assets. The private inbox is ignored by Git. The approval manifest is empty, and file-existence checks keep report actions hidden until an approved public file is available. No report conversion was performed. Original documents remain unchanged.

This public record intentionally omits original filenames, document contents, credentials, addresses, author metadata, and local filesystem paths.

## Validation

- ESLint and TypeScript validation passed.
- Production dependency audit passed with zero vulnerabilities.
- Production build passed using Webpack. Turbopack was not rerun because the environment previously required the Webpack fallback.
- Chromium checks covered English and French routes, all six desktop folders and their details, and all five project detail views.
- Window controls, independent child closure, taskbar restoration, Explorer navigation, pointer/keyboard focus, preserved scrolling, theme persistence, language switching, and Start were checked.
- Responsive checks covered widths 320, 375, 390, 768, 1024, 1366, and 1920 pixels, plus short and landscape viewports. Checks found no horizontal desktop/page overflow.
- Touch checks opened desktop folders and nested details with one tap. Multiple project windows had distinct taskbar entries and remained independently restorable and closable.
- Completed focused browser runs recorded no severe console errors.
- Existing SEO metadata, sitemap, robots, security headers, deployment configuration, and required assets were verified.
- Root template removal and staged-file privacy checks were reviewed before commit.

Browser testing used Chromium responsive and touch emulation; physical phones and Safari were not tested. Report downloads remain untested because no approved public report exists. Deployment status is verified separately after push and is not asserted by this record.
