import type {CertificateAsset} from '@/content/assets';

type CertificateCardProps = {
  certificate: CertificateAsset;
  title: string;
  openLabel: string;
  downloadLabel: string;
};

export function CertificateCard({certificate, title, openLabel, downloadLabel}: CertificateCardProps) {
  return (
    <article className="certificate-card">
      <div className="certificate-preview" aria-hidden="true">
        <span className="certificate-preview-mark">PDF</span>
        <span className="certificate-preview-line" />
        <span className="certificate-preview-line certificate-preview-line-short" />
      </div>
      <p className="eyebrow mt-5">{certificate.organization}</p>
      <h3 className="mt-3 text-xl font-semibold text-foreground">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-4">
        <a className="inline-link" href={certificate.path} target="_blank" rel="noreferrer">
          {openLabel} <span aria-hidden="true">↗</span>
        </a>
        <a className="inline-link" href={certificate.path} download>
          {downloadLabel} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </article>
  );
}
