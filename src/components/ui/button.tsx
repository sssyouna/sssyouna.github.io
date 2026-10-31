import type {ButtonHTMLAttributes} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
      : 'border border-border bg-transparent text-foreground hover:border-accent hover:text-accent';

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variantClass} ${className}`}
      {...props}
    />
  );
}
