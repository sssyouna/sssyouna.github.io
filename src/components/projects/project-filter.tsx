'use client';

import {useMemo, useState} from 'react';
import type {Project, ProjectCategory} from '@/content/projects';
import {ProjectCard} from './project-card';

type FilterOption = {
  value: 'all' | ProjectCategory;
  label: string;
};

type ProjectFilterProps = {
  projects: Project[];
  filters: FilterOption[];
  allLabel: string;
  emptyLabel: string;
  locale: 'en' | 'fr';
};

export function ProjectFilter({
  projects,
  filters,
  allLabel,
  emptyLabel,
  locale
}: ProjectFilterProps) {
  const [selected, setSelected] = useState<FilterOption['value']>('all');
  const filteredProjects = useMemo(
    () =>
      selected === 'all'
        ? projects
        : projects.filter((project) => project.category === selected),
    [projects, selected]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={allLabel}>
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={selected === filter.value}
            className={`filter-button ${selected === filter.value ? 'filter-button-active' : ''}`}
            onClick={() => setSelected(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {filteredProjects.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="mt-8 border border-border p-6 text-foreground-muted">{emptyLabel}</p>
      )}
    </div>
  );
}
