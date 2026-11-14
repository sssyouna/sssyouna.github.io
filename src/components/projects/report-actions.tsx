'use client';

import {useTranslations} from 'next-intl';
import type {AcademicReport} from '@/content/project-reports';

export function ReportActions({reports}: {reports: AcademicReport[]}) {
  const t = useTranslations('Desktop');
  if (!reports.length) return null;
  return (
    <div className="report-actions">
      {reports.map((report) => (
        <div key={report.path} className="explorer-detail-actions">
          <a className="button-retro" href={report.path} target="_blank" rel="noopener noreferrer" download={report.format === 'docx' ? true : undefined}>
            {t('reports.view')} ({report.format.toUpperCase()}) ↗
          </a>
          <a className="button-retro" href={report.path} download>{t('reports.download')} ({report.format.toUpperCase()}) ↓</a>
          {report.format === 'docx' ? <p className="explorer-note">{t('reports.docxHelp')}</p> : null}
        </div>
      ))}
    </div>
  );
}
