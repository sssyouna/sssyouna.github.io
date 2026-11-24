export type CertificateAsset = {
  id: string;
  documentKey: 'securityPlus' | 'jrPentester' | 'securityEngineer' | 'cyberSecurity101';
  titleKey: string;
  detailKey: string;
  organization: string;
  issuedOn: string;
  expiresOn?: string;
  verificationUrl: string;
  path?: `/images/certifications/${string}`;
  preview?: {src: `/images/certifications/${string}`; width: number; height: number};
};

// Security+ dates and verification portal are printed on the inspected certificate.
// TryHackMe titles and issue dates come from each official certificate's details.
export const certifications: CertificateAsset[] = [
  {
    id: 'security-plus', documentKey: 'securityPlus',
    titleKey: 'securityPlusTitle', detailKey: 'securityPlusDetail', organization: 'CompTIA',
    issuedOn: '2026-09-21', expiresOn: '2029-09-21',
    verificationUrl: 'https://verify.comptia.org/',
    path: '/images/certifications/security-plus-sanitized.pdf',
    preview: {src: '/images/certifications/security-plus-preview.png', width: 1400, height: 1082}
  },
  {
    id: 'tryhackme-jr-pentester', documentKey: 'jrPentester',
    titleKey: 'tryHackMeJrPentesterTitle', detailKey: 'tryHackMeJrPentesterDetail', organization: 'TryHackMe',
    issuedOn: '2026-08-11',
    verificationUrl: 'https://tryhackme.com/certificate/THM-33JWAHHZ8Z'
  },
  {
    id: 'tryhackme-security-engineer', documentKey: 'securityEngineer',
    titleKey: 'tryHackMeSecurityEngineerTitle', detailKey: 'tryHackMeSecurityEngineerDetail', organization: 'TryHackMe',
    issuedOn: '2026-08-14',
    verificationUrl: 'https://tryhackme.com/certificate/THM-ZRIAOTNT6K'
  },
  {
    id: 'tryhackme-cyber-security-101', documentKey: 'cyberSecurity101',
    titleKey: 'tryHackMeCyberSecurity101Title', detailKey: 'tryHackMeCyberSecurity101Detail', organization: 'TryHackMe',
    issuedOn: '2026-04-12',
    verificationUrl: 'https://tryhackme.com/certificate/THM-IPO6NFLTRE'
  }
];
