export type AcademicReport = {
  path: `/documents/projects/${string}`;
  format: 'docx' | 'pdf';
};

// Add only reports explicitly cleared for public distribution after inspection.
export const approvedProjectReports: Record<string, AcademicReport[]> = {};
