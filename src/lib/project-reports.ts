import 'server-only';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {approvedProjectReports} from '@/content/project-reports';

export function getProjectReports(slug: string) {
  return (approvedProjectReports[slug] ?? []).filter((report) =>
    report.path.startsWith(`/documents/projects/${slug}/`) &&
    !report.path.includes('..') &&
    existsSync(path.join(process.cwd(), 'public', report.path))
  );
}
