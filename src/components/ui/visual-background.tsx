'use client';

import {useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import type {AssetPath, BackgroundSection} from '@/content/assets';

type VisualBackgroundProps = {
  backgrounds: Partial<Record<BackgroundSection, readonly AssetPath[]>>;
};

export function VisualBackground({backgrounds}: VisualBackgroundProps) {
  const [transition, setTransition] = useState<{from: BackgroundSection; to: BackgroundSection}>({
    from: 'hero',
    to: 'hero'
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-background-section]')
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const section = (visible?.target as HTMLElement | undefined)?.dataset
          .backgroundSection as BackgroundSection | undefined;
        if (section) {
          setTransition((current) =>
            current.to === section ? current : {from: current.to, to: section}
          );
        }
      },
      {rootMargin: '-20% 0px -45% 0px', threshold: [0.1, 0.35, 0.6]}
    );
    sections.forEach((section) => observer.observe(section));

    const canUsePointerMotion = window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const handlePointerMove = (event: PointerEvent) => {
      if (!canUsePointerMotion || event.pointerType !== 'mouse') return;
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
      root.style.setProperty('--parallax-x', `${(event.clientX / window.innerWidth - 0.5) * 10}px`);
      root.style.setProperty('--parallax-y', `${(event.clientY / window.innerHeight - 0.5) * 10}px`);
    };
    const handlePointerLeave = () => {
      root.style.setProperty('--pointer-x', '50vw');
      root.style.setProperty('--pointer-y', '35vh');
      root.style.setProperty('--parallax-x', '0px');
      root.style.setProperty('--parallax-y', '0px');
    };

    if (canUsePointerMotion) {
      window.addEventListener('pointermove', handlePointerMove, {passive: true});
      document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [pathname]);

  const renderLayer = (section: BackgroundSection, state: 'active' | 'previous') => {
    const images = backgrounds[section] ?? [];
    return images.slice(0, 2).map((src, index) => (
      <div
        key={`${section}-${src}`}
        className={`visual-background-image ${state === 'active' ? 'visual-background-image-active' : 'visual-background-image-previous'} ${index === 1 ? 'visual-background-image-secondary' : ''}`}
        style={{backgroundImage: `url("${src}")`}}
      />
    ));
  };
  return (
    <div ref={rootRef} className={`visual-background ${transition.to === 'contact' ? 'visual-background-contact' : ''} ${transition.to === 'hero' ? 'visual-background-hero' : ''}`} aria-hidden="true">
      {transition.from !== transition.to && renderLayer(transition.from, 'previous')}
      {renderLayer(transition.to, 'active')}
      <div className="visual-background-overlay" />
      <div className="visual-background-spotlight" />
    </div>
  );
}
