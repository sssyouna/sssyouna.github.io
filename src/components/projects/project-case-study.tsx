import {Link} from '@/i18n/navigation';
import type {Project} from '@/content/projects';

type ProjectCaseStudyProps = {
  project: Project;
  locale: 'en' | 'fr';
  backLabel: string;
  categoryLabel: string;
  statusLabel: string;
  technologiesLabel: string;
  repositoryLabel: string;
};

export function ProjectCaseStudy({
  project,
  locale,
  backLabel,
  categoryLabel,
  statusLabel,
  technologiesLabel,
  repositoryLabel
}: ProjectCaseStudyProps) {
  return (
    <main>
      <section data-background-section="projects" className="section-space border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-10">
          <Link href="/projects" className="inline-link">
            <span aria-hidden="true">←</span> {backLabel}
          </Link>
          <p className="eyebrow mt-10">{categoryLabel}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl">
            {project.title[locale]}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-foreground-muted sm:text-xl">
            {project.summary[locale]}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="status-label">{statusLabel}</span>
            {project.technologies.map((technology) => (
              <span key={technology} className="technology-tag">
                {technology}
              </span>
            ))}
          </div>
          {project.repository ? (
            <a className="inline-link mt-8" href={project.repository} target="_blank" rel="noreferrer">
              {repositoryLabel} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </section>

      <section data-background-section="projects" className="section-space">
        <div className="mx-auto grid w-full max-w-4xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_12rem] lg:px-10">
          <div className="space-y-12">
            {project.sections.map((section, index) => (
              <section key={section.title.en} className="case-study-section">
                <p className="case-study-index">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {section.title[locale]}
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground-muted">
                  {section.body[locale]}
                </p>
              </section>
            ))}
          </div>
          <aside className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {technologiesLabel}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
