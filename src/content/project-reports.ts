export type AcademicReport = {
  path: `/documents/projects/${string}`;
  format: 'docx' | 'pdf';
};

// Only inspected, sanitized public copies belong in this manifest.
export const approvedProjectReports: Record<string, AcademicReport[]> = {
  'honeypot-elk-lab': [{path: '/documents/projects/honeypot-elk-lab/honeypot-elk-academic-report-sanitized.docx', format: 'docx'}],
  'automated-reconnaissance-tool': [{path: '/documents/projects/automated-reconnaissance-tool/automated-reconnaissance-academic-report-sanitized.pdf', format: 'pdf'}],
  'sharepy-secure-file-sharing': [{path: '/documents/projects/sharepy-secure-file-sharing/sharepy-security-report-sanitized.pdf', format: 'pdf'}],
};
