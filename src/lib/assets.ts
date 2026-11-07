import {existsSync} from 'node:fs';
import path from 'node:path';
import {assets, portfolioFiles, type CertificateAsset} from '@/content/assets';

function publicAssetExists(assetPath: string) {
  return existsSync(path.join(process.cwd(), 'public', assetPath.replace(/^\//, '')));
}

export function getAvailableCertificates(): CertificateAsset[] {
  return assets.certifications.filter((certificate) => publicAssetExists(certificate.path));
}

export function getAvailableBackgrounds() {
  return Object.fromEntries(
    Object.entries(assets.backgrounds).map(([section, paths]) => [
      section,
      paths.filter(publicAssetExists)
    ])
  ) as typeof assets.backgrounds;
}

export function hasResume() {
  return publicAssetExists(portfolioFiles.resume);
}
