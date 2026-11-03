import {existsSync} from 'node:fs';
import path from 'node:path';
import {assets, type CertificateAsset} from '@/content/assets';

export function getAvailableCertificates(): CertificateAsset[] {
  return assets.certifications.filter((certificate) =>
    existsSync(path.join(process.cwd(), 'public', certificate.path.slice(1)))
  );
}
