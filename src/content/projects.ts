export const projectCategories = [
  'offensive-security',
  'network-infrastructure-security',
  'security-engineering',
  'application-security'
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = 'experimental' | 'in-progress' | 'completed' | 'prototype';

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
  repository?: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: 'automated-reconnaissance-tool',
    category: 'offensive-security',
    status: 'completed',
    title: {
      en: 'Automated Reconnaissance Tool',
      fr: 'Outil de reconnaissance automatisée'
    },
    summary: {
      en: 'An academic team project that brings passive reconnaissance, scoped network checks, basic web security checks, and report generation into a modular Python CLI.',
      fr: 'Un projet académique en équipe qui réunit la reconnaissance passive, des vérifications réseau encadrées, des contrôles de sécurité web élémentaires et la génération de rapports dans un CLI Python modulaire.'
    },
    technologies: ['Python', 'DNS', 'TCP', 'HTTP', 'HTML / JSON / CSV'],
    repository: 'https://github.com/sssyouna/Outil-de-Reconnaissance-Automatis-e',
    sections: [
      {
        title: {en: 'Problem and objective', fr: 'Problème et objectif'},
        body: {
          en: 'The project organizes common early-stage assessment tasks behind one command-line interface. Its README describes four student-owned modules for OSINT, network scanning, vulnerability checks, and reporting.',
          fr: 'Le projet organise des tâches courantes d’évaluation préliminaire dans une seule interface en ligne de commande. Son README décrit quatre modules répartis entre les étudiants : OSINT, scan réseau, contrôles de vulnérabilité et rapports.'
        }
      },
      {
        title: {en: 'Implementation', fr: 'Mise en œuvre'},
        body: {
          en: 'The documented design separates passive collection, active scanning, basic vulnerability checks, and output generation. The repository describes HTML, JSON, and CSV reports. The tool is intended for authorized, isolated lab use; no scan results are presented here.',
          fr: 'La conception documentée sépare la collecte passive, le scan actif, les contrôles élémentaires de vulnérabilité et la génération des résultats. Le dépôt décrit des rapports HTML, JSON et CSV. L’outil est destiné à un usage autorisé en laboratoire isolé ; aucun résultat de scan n’est présenté ici.'
        }
      },
      {
        title: {en: 'What I learned', fr: 'Apprentissages'},
        body: {
          en: 'The project provided practice in dividing a security workflow into modules, connecting command-line options to those modules, and presenting findings in formats that can be reviewed.',
          fr: 'Ce projet a permis de pratiquer le découpage d’un workflow de sécurité en modules, la liaison des options du CLI à ces modules et la présentation de constats dans des formats exploitables.'
        }
      }
    ]
  },
  {
    slug: 'honeypot-elk-lab',
    category: 'security-engineering',
    status: 'completed',
    title: {
      en: 'Honeypot and ELK Lab',
      fr: 'Laboratoire honeypot et ELK'
    },
    summary: {
      en: 'A containerized multi-service honeypot project with SSH, HTTP, and FTP decoys and centralized event review through the ELK stack.',
      fr: 'Un projet de honeypots multi-services conteneurisés avec des leurres SSH, HTTP et FTP et une consultation centralisée des événements dans la stack ELK.'
    },
    technologies: ['Python', 'Docker Compose', 'Elasticsearch', 'Logstash', 'Kibana', 'Seccomp'],
    repository: 'https://github.com/sssyouna/honeypots-elk',
    sections: [
      {
        title: {en: 'Problem and objective', fr: 'Problème et objectif'},
        body: {
          en: 'The project explores how decoy services can record activity for later review, while keeping the services isolated from real workloads.',
          fr: 'Le projet explore comment des services leurres peuvent enregistrer de l’activité pour une analyse ultérieure, tout en restant isolés des services réels.'
        }
      },
      {
        title: {en: 'Architecture', fr: 'Architecture'},
        body: {
          en: 'The repository documents a Docker Compose platform with SSH, HTTP, and FTP honeypot services, seccomp-based sandboxing, and Elasticsearch, Logstash, and Kibana for log storage, processing, and visualization.',
          fr: 'Le dépôt décrit une plateforme Docker Compose avec des honeypots SSH, HTTP et FTP, un cloisonnement fondé sur seccomp et Elasticsearch, Logstash et Kibana pour le stockage, le traitement et la visualisation des journaux.'
        }
      },
      {
        title: {en: 'What I learned', fr: 'Apprentissages'},
        body: {
          en: 'This work connects service emulation, container boundaries, and centralized logging in one defensive security lab. It also highlights the need to keep exposed services and their data stores isolated.',
          fr: 'Ce travail relie l’émulation de services, le cloisonnement des conteneurs et la centralisation des journaux dans un laboratoire défensif. Il souligne aussi la nécessité d’isoler les services exposés et leurs bases de données.'
        }
      }
    ]
  },
  {
    slug: 'sharepy-secure-file-sharing',
    category: 'application-security',
    status: 'prototype',
    title: {
      en: 'SharePy Secure File Sharing',
      fr: 'SharePy · Partage sécurisé de fichiers'
    },
    summary: {
      en: 'A cybersecurity-focused file-sharing application repository documenting a FastAPI backend, object storage, PostgreSQL, and a reverse-proxy deployment.',
      fr: 'Un dépôt d’application de partage de fichiers orienté cybersécurité, documentant un backend FastAPI, du stockage objet, PostgreSQL et un déploiement derrière un reverse proxy.'
    },
    technologies: ['FastAPI', 'PostgreSQL', 'MinIO', 'Nginx', 'Docker'],
    repository: 'https://github.com/sssyouna/project_final_cyber',
    sections: [
      {
        title: {en: 'Problem and objective', fr: 'Problème et objectif'},
        body: {
          en: 'The project explores secure file sharing and deployment boundaries across an API, object storage, a database, and a reverse proxy.',
          fr: 'Le projet explore le partage sécurisé de fichiers et les frontières de déploiement entre une API, un stockage objet, une base de données et un reverse proxy.'
        }
      },
      {
        title: {en: 'Documented design', fr: 'Conception documentée'},
        body: {
          en: 'The repository describes environment-based configuration, JWT authentication with secure-cookie settings, restricted CORS, internal-only service networking, and HTTPS-oriented Nginx configuration. The repository also notes that authentication and storage behavior need review before production use.',
          fr: 'Le dépôt décrit une configuration par variables d’environnement, une authentification JWT avec des paramètres de cookies sécurisés, un CORS restreint, un réseau interne pour les services et une configuration Nginx orientée HTTPS. Il précise également que l’authentification et le stockage doivent être revus avant tout usage en production.'
        }
      },
      {
        title: {en: 'What I learned', fr: 'Apprentissages'},
        body: {
          en: 'The project brings application features together with deployment concerns such as secrets, network exposure, and service separation. It remains a project repository, not a claim of a production deployment.',
          fr: 'Le projet associe des fonctionnalités applicatives à des enjeux de déploiement comme les secrets, l’exposition réseau et la séparation des services. Il s’agit d’un dépôt de projet, et non d’une affirmation de déploiement en production.'
        }
      }
    ]
  },
  {
    slug: 'oauth2-oidc-resource-server',
    category: 'application-security',
    status: 'prototype',
    title: {
      en: 'OAuth2 / OIDC Resource Server',
      fr: 'Serveur de ressources OAuth2 / OIDC'
    },
    summary: {
      en: 'A Python API project documented to validate JWT access tokens and authorize requests through scopes and roles.',
      fr: 'Un projet d’API Python documenté pour valider des jetons d’accès JWT et autoriser les requêtes au moyen de scopes et de rôles.'
    },
    technologies: ['Python', 'Flask', 'OAuth2 / OIDC', 'JWT', 'JWKS'],
    repository: 'https://github.com/sssyouna/projet-cryptographie',
    sections: [
      {
        title: {en: 'Problem and objective', fr: 'Problème et objectif'},
        body: {
          en: 'The resource server is intended to protect API endpoints by validating access tokens from an authorization server and checking whether each token carries the required permissions.',
          fr: 'Le serveur de ressources vise à protéger des endpoints API en validant les jetons d’accès émis par un serveur d’autorisation et en vérifiant que chaque jeton possède les permissions requises.'
        }
      },
      {
        title: {en: 'Documented implementation', fr: 'Mise en œuvre documentée'},
        body: {
          en: 'The repository describes a Flask API that checks JWT signatures using public keys from JWKS, validates issuer, audience, and time claims, and applies scope and role checks. Its documentation describes OAuth2-style 401 and 403 responses. Integration depends on configuration supplied by a separate authorization server.',
          fr: 'Le dépôt décrit une API Flask qui vérifie les signatures JWT à l’aide des clés publiques JWKS, valide l’émetteur, l’audience et les claims temporels, puis applique des contrôles de scopes et de rôles. Sa documentation décrit des réponses 401 et 403 conformes aux usages OAuth2. L’intégration dépend d’une configuration fournie par un serveur d’autorisation distinct.'
        }
      },
      {
        title: {en: 'What I learned', fr: 'Apprentissages'},
        body: {
          en: 'This project focuses on the API trust boundary: validate token properties before granting access, enforce permissions at the resource, and avoid logging bearer tokens.',
          fr: 'Ce projet met l’accent sur la frontière de confiance de l’API : valider les propriétés du jeton avant d’accorder l’accès, appliquer les permissions côté ressource et éviter de journaliser les jetons porteurs.'
        }
      }
    ]
  },
  {
    slug: 'pfsense-high-availability-lab',
    category: 'network-infrastructure-security',
    status: 'experimental',
    title: {
      en: 'pfSense High Availability Lab',
      fr: 'Laboratoire de haute disponibilité pfSense'
    },
    summary: {
      en: 'An experimental infrastructure lab exploring pfSense failover, state synchronization, and security monitoring.',
      fr: 'Un laboratoire d’infrastructure expérimental autour du basculement pfSense, de la synchronisation des états et de la supervision de sécurité.'
    },
    technologies: ['pfSense 2.8.1', 'CARP', 'pfsync', 'Suricata'],
    sections: [
      {
        title: {en: 'Objective', fr: 'Objectif'},
        body: {
          en: 'Explore a master/backup firewall arrangement and how high availability mechanisms can coexist with security monitoring.',
          fr: 'Explorer une architecture de pare-feu maître/secours et la coexistence des mécanismes de haute disponibilité avec la supervision de sécurité.'
        }
      },
      {
        title: {en: 'Architecture', fr: 'Architecture'},
        body: {
          en: 'The documented lab uses CARP for virtual IP failover and pfsync for state synchronization between pfSense nodes, with Suricata included for security monitoring.',
          fr: 'Le laboratoire documenté utilise CARP pour le basculement d’une adresse IP virtuelle et pfsync pour synchroniser les états entre les nœuds pfSense, avec Suricata pour la supervision de sécurité.'
        }
      },
      {
        title: {en: 'Current status', fr: 'État actuel'},
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
