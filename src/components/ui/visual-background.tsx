'use client';

import {useEffect, useRef, useState} from 'react';
import type {AssetPath, BackgroundSection} from '@/content/assets';

type VisualBackgroundProps = {
  backgrounds: Partial<Record<BackgroundSection, readonly AssetPath[]>>;
};

export function VisualBackground({backgrounds}: VisualBackgroundProps) {
  const [activeSection, setActiveSection] = useState<BackgroundSection>('hero');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(pointer: coarse)').matches) return;

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
        if (section) setActiveSection(section);
      },
      {rootMargin: '-20% 0px -45% 0px', threshold: [0.1, 0.35, 0.6]}
    );
    sections.forEach((section) => observer.observe(section));

    const handlePointerMove = (event: PointerEvent) => {
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

    window.addEventListener('pointermove', handlePointerMove, {passive: true});
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  const images = backgrounds[activeSection] ?? [];
  return (
    <div ref={rootRef} className="visual-background" aria-hidden="true">
      {images.slice(0, 2).map((src, index) => (
        <div
          key={src}
          className={`visual-background-image ${index === 0 ? 'visual-background-image-active' : 'visual-background-image-secondary'}`}
          style={{backgroundImage: `url("${src}")`, zIndex: index}}
        />
      ))}
      <div className="visual-background-overlay" />
      <div className="visual-background-spotlight" />
    </div>
  );
}
