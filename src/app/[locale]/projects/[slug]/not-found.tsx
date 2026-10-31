import {getTranslations} from 'next-intl/server';
import {Container} from '@/components/ui/container';

export default async function ProjectNotFound() {
  const t = await getTranslations('Projects');
  return (
    <main>
      <section className="section-space">
        <Container>
          <p className="eyebrow">404</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
            {t('notFoundTitle')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-muted">
            {t('notFoundDescription')}
          </p>
        </Container>
      </section>
    </main>
  );
}
