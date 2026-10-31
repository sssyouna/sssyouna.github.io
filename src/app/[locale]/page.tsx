import {useTranslations} from 'next-intl';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';

export default function HomePage() {
  const t = useTranslations('Foundation');

  return (
    <main>
      <section className="section-space">
        <Container>
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {t('eyebrow')}
          </p>
          <SectionHeading>{t('title')}</SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-muted">
            {t('description')}
          </p>
        </Container>
      </section>
    </main>
  );
}
