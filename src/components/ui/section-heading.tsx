import type {ReactNode} from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  children: ReactNode;
};

export function SectionHeading({eyebrow, children}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}
