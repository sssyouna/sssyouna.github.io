type AchievementEntryProps = {
  title: string;
  detail: string;
  label: string;
  featured?: boolean;
};

export function AchievementEntry({
  title,
  detail,
  label,
  featured = false
}: AchievementEntryProps) {
  return (
    <article className={`achievement-entry ${featured ? 'achievement-entry-featured' : ''}`}>
      <p className="eyebrow">{label}</p>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-4 max-w-2xl leading-7 text-foreground-muted">{detail}</p>
    </article>
  );
}
