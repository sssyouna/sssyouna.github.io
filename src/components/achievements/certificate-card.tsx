import type {CertificateAsset} from '@/content/assets';
import {CertificateDates, CertificateEvidence} from './certificate-evidence';

type CertificateCardProps = {
  certificate: CertificateAsset;
  title: string;
  detail: string;
};

export function CertificateCard({certificate, title, detail}: CertificateCardProps) {
  return (
    <article className="certificate-card">
      <p className="eyebrow mt-5">{certificate.organization}</p>
      <h3 className="mt-3 text-xl font-semibold text-foreground">{title}</h3>
      <p>{detail}</p>
      <CertificateDates certificate={certificate} />
      <CertificateEvidence certificate={certificate} title={title} />
    </article>
  );
}
