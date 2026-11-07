import {Link} from '@/i18n/navigation';
import type {Project} from '@/content/projects';

type ProjectCardProps = {
  project: Project;
  locale: 'en' | 'fr';
  index?: string;
  readLabel?: string;
  repositoryLabel?: string;
};

const statusLabels = {
  experimental: {en: 'Experimental', fr: 'Expérimental'},
  'in-progress': {en: 'In progress', fr: 'En cours'},
  completed: {en: 'Completed', fr: 'Terminé'},
  prototype: {en: 'Prototype', fr: 'Prototype'}
} as const;

const categoryLabels = {
  'offensive-security': {en: 'Offensive Security', fr: 'Sécurité offensive'},
  'network-infrastructure-security': {
    en: 'Network & Infrastructure Security',
    fr: 'Sécurité réseau et infrastructure'
  },
  'security-engineering': {
    en: 'Security Engineering / DevSecOps',
    fr: 'Ingénierie sécurité / DevSecOps'
  },
  'application-security': {en: 'Application Security', fr: 'Sécurité applicative'}
} as const;

export function ProjectCard({
  project,
  locale,
  index,
  readLabel = locale === 'en' ? 'Read case study' : 'Lire l’étude de cas',
  repositoryLabel = 'GitHub'
}: ProjectCardProps) {
  return (
    <article className="project-card project-card-interactive">
      <div className="project-card-topline">
        {index ? <span className="project-index">{index}</span> : null}
        <span className="eyebrow">{categoryLabels[project.category][locale]}</span>
        <span className="status-label">{statusLabels[project.status][locale]}</span>
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
        {project.title[locale]}
      </h2>
      <p className="mt-4 leading-7 text-foreground-muted">{project.summary[locale]}</p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label={locale === 'en' ? 'Technologies' : 'Technologies'}>
        {project.technologies.map((technology) => (
          <li key={technology} className="technology-tag">
            {technology}
          </li>
        ))}
      </ul>
      <div className="project-card-actions">
        <Link href={`/projects/${project.slug}`} className="inline-link">
          {readLabel} <span aria-hidden="true">→</span>
        </Link>
        {project.repository ? (
          <a className="project-repository-link" href={project.repository} target="_blank" rel="noreferrer">
            {repositoryLabel} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
