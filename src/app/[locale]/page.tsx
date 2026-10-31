import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';

const previews = [
  {href: '/about', title: 'aboutTitle', description: 'aboutDescription'},
  {
    href: '/experience',
    title: 'experienceTitle',
    description: 'experienceDescription'
  },
  {
    href: '/projects',
    title: 'projectsTitle',
    description: 'projectsDescription'
  },
  {
    href: '/achievements',
    title: 'achievementsTitle',
    description: 'achievementsDescription'
  },
  {href: '/contact', title: 'contactTitle', description: 'contactDescription'}
] as const;

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <main>
      <section className="section-space border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              {t('title')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-foreground-muted sm:text-xl">
              {t('introduction')}
            </p>
            <p className="mt-5 text-sm font-medium leading-6 text-accent">
              {t('certifications')}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground-muted">
              {t('interests')}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="button button-primary">
                {t('projectsCta')}
              </Link>
              <Link href="/contact" className="button button-secondary">
                {t('contactCta')}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-8">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-accent">{t('availabilityLabel')}</p>
            <p className="text-sm text-foreground-muted">{t('availabilityPeriod')}</p>
            <p className="text-sm text-foreground-muted">{t('availabilityLocation')}</p>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <p className="eyebrow">{t('previewEyebrow')}</p>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {previews.map(({href, title, description}) => (
              <article key={href} className="bg-background p-6 sm:p-8">
                <SectionHeading>{t(title)}</SectionHeading>
                <p className="mt-4 max-w-md leading-7 text-foreground-muted">
                  {t(description)}
                </p>
                <Link href={href} className="inline-link mt-6">
                  {t('explore')} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
