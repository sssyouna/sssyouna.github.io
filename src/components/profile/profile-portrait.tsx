import Image from 'next/image';
import {portfolioImages} from '@/content/images';
import {profile} from '@/content/profile';

export function ProfilePortrait({className, sizes = '(max-width: 768px) 76px, 145px'}: {
  className?: string;
  sizes?: string;
}) {
  return <Image {...portfolioImages.profile} alt={profile.name} className={className} sizes={sizes} />;
}
