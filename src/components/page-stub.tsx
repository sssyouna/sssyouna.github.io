import {useTranslations} from 'next-intl';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';

type PageStubProps = {
  page: 'about' | 'experience' | 'projects' | 'achievements' | 'contact';
};

export function PageStub({page}: PageStubProps) {
  const t = useTranslations('PageStub');

  return (
    <main>
      <section className="section-space">
        <Container>
          <SectionHeading>{t(page)}</SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-muted">
            {t('description')}
          </p>
        </Container>
      </section>
    </main>
  );
}
