export type AssetPath = `/images/${string}`;

export type BackgroundSection =
  | 'hero'
  | 'education'
  | 'ctf'
  | 'gitex'
  | 'cimar'
  | 'macobate'
  | 'projects'
  | 'contact';

export const assets = {
  backgrounds: {
    hero: ['/images/background/hero-bg.jpg'],
    education: ['/images/education/ensa-campus.jpg', '/images/education/education-extra.jpg'],
    ctf: ['/images/events/ctf-01.jpg', '/images/events/ctf-02.jpg'],
    gitex: ['/images/events/gitex-01.jpg', '/images/events/gitex-02.jpg'],
    cimar: ['/images/experience/cimar-01.jpg', '/images/experience/cimar-02.jpg'],
    macobate: ['/images/experience/macobate-01.jpg', '/images/experience/macobate-02.jpg'],
    projects: [],
    contact: []
  } satisfies Record<BackgroundSection, AssetPath[]>,
  certifications: [
    {
      id: 'security-plus',
      titleKey: 'securityPlusTitle',
      organization: 'CompTIA',
      path: '/images/certifications/security-plus.pdf' as AssetPath
    },
    {
      id: 'tryhackme-jr-pentester',
      titleKey: 'tryHackMeJrPentesterTitle',
      organization: 'TryHackMe',
      path: '/images/certifications/tryhackme-jr-pentester.pdf' as AssetPath
    },
    {
      id: 'tryhackme-devsecops',
      titleKey: 'tryHackMeDevSecOpsTitle',
      organization: 'TryHackMe',
      path: '/images/certifications/tryhackme-devsecops.pdf' as AssetPath
    }
  ]
} as const;

export type CertificateAsset = (typeof assets.certifications)[number];
