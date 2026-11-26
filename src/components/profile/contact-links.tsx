import {useTranslations} from 'next-intl';
import {profile} from '@/content/profile';
import {portfolioFiles} from '@/content/assets';

export function ContactLinks() {
  const t = useTranslations('Contact');

  return (
    <nav className="contact-links" aria-label={t('linksLabel')}>
      <a className="button-retro" href={`mailto:${profile.email}`}>{profile.email}</a>
      <a className="button-retro" href={`tel:${profile.phone}`}>{profile.phone}</a>
      <a className="button-retro" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      <a className="button-retro" href={profile.tryHackMe} target="_blank" rel="noopener noreferrer">TryHackMe ↗</a>
      <a className="button-retro" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      <a className="button-retro" href={portfolioFiles.resume} download>
        {t('downloadCv')} ↓
      </a>
    </nav>
  );
}
