export const projectCategories = [
  'offensive-security',
  'network-infrastructure-security',
  'security-engineering',
  'application-security',
  'cryptography'
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = 'experimental' | 'in-progress' | 'completed';

type LocalizedText = {
  en: string;
  fr: string;
};

export type ProjectSection = {
  title: LocalizedText;
  body: LocalizedText;
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  title: LocalizedText;
  summary: LocalizedText;
  technologies: string[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: 'pfsense-high-availability-lab',
    category: 'network-infrastructure-security',
    status: 'experimental',
    title: {
      en: 'pfSense High Availability Lab',
      fr: 'Laboratoire de haute disponibilité pfSense'
    },
    summary: {
      en: 'An experimental security and infrastructure lab exploring a pfSense master/backup architecture with failover and security monitoring.',
      fr: 'Un laboratoire expérimental de sécurité et d’infrastructure explorant une architecture pfSense maître/secours avec basculement et supervision de sécurité.'
    },
    technologies: ['pfSense 2.8.1', 'CARP', 'pfsync', 'Suricata'],
    sections: [
      {
        title: {
          en: 'Overview',
          fr: 'Vue d’ensemble'
        },
        body: {
          en: 'This lab explores high availability with pfSense 2.8.1 using a master/backup architecture. It also brings Suricata into a security-monitoring environment.',
          fr: 'Ce laboratoire explore la haute disponibilité avec pfSense 2.8.1 au moyen d’une architecture maître/secours. Il intègre également Suricata dans un environnement de supervision de sécurité.'
        }
      },
      {
        title: {
          en: 'Architecture and approach',
          fr: 'Architecture et approche'
        },
        body: {
          en: 'CARP is used for virtual IP failover and pfsync for state synchronization between the pfSense nodes. The work has been developed experimentally to study these mechanisms together with security monitoring.',
          fr: 'CARP est utilisé pour le basculement d’une adresse IP virtuelle et pfsync pour la synchronisation des états entre les nœuds pfSense. Le travail a été développé de manière expérimentale afin d’étudier ces mécanismes avec la supervision de sécurité.'
        }
      },
      {
        title: {
          en: 'Current status',
          fr: 'État actuel'
        },
        body: {
          en: 'Experimental lab. It is not presented as a fully operational production environment.',
          fr: 'Laboratoire expérimental. Il n’est pas présenté comme un environnement de production pleinement opérationnel.'
        }
      }
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
