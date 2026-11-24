import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import type {CertificateAsset} from '@/content/certifications';

export function CertificateDates({certificate}: {certificate: CertificateAsset}) {
  const locale = useLocale();
  const t = useTranslations('Achievements');
  const format = (date: string) => new Intl.DateTimeFormat(locale, {
    dateStyle: 'long', timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`));

  return (
    <dl className="explorer-definition-list metadata-list">
      <div><dt>{t('issued')}</dt><dd><time dateTime={certificate.issuedOn}>{format(certificate.issuedOn)}</time></dd></div>
      {certificate.expiresOn ? <div><dt>{t('expires')}</dt><dd><time dateTime={certificate.expiresOn}>{format(certificate.expiresOn)}</time></dd></div> : null}
    </dl>
  );
}

export function CertificateEvidence({certificate, title}: {certificate: CertificateAsset; title: string}) {
  const t = useTranslations('Achievements');

  return (
    <div className="certificate-evidence">
      {certificate.preview ? (
        <a className="certificate-preview-link" href={certificate.preview.src} target="_blank" rel="noopener noreferrer" aria-label={t('openFullSize')}>
          <Image src={certificate.preview.src} width={certificate.preview.width} height={certificate.preview.height} alt={title} sizes="(max-width: 768px) calc(100vw - 48px), 760px" />
        </a>
      ) : null}
      <div className="explorer-detail-actions">
        {certificate.preview ? <a className="button-retro" href={certificate.preview.src} target="_blank" rel="noopener noreferrer">{t('openFullSize')} ↗</a> : null}
        {certificate.path ? <>
          <a className="button-retro" href={certificate.path} target="_blank" rel="noopener noreferrer">{t('openCertificate')} ↗</a>
          <a className="button-retro" href={certificate.path} download>{t('downloadCertificate')} ↓</a>
        </> : null}
        <a className="button-retro" href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">{t('verifyCertificate')} ↗</a>
      </div>
      {certificate.id === 'security-plus' ? <p className="explorer-note">{t('privacyNote')}</p> : null}
    </div>
  );
}
