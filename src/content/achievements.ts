export type AchievementKind =
  | 'professional-certification'
  | 'learning'
  | 'competition'
  | 'community';

export type Achievement = {
  id: string;
  kind: AchievementKind;
  titleKey: string;
  detailKey: string;
};

export const achievements: Achievement[] = [
  {
    id: 'security-plus',
    kind: 'professional-certification',
    titleKey: 'securityPlusTitle',
    detailKey: 'securityPlusDetail'
  },
  {
    id: 'tryhackme-paths',
    kind: 'learning',
    titleKey: 'tryHackMePathsTitle',
    detailKey: 'tryHackMePathsDetail'
  },
  {
    id: 'ensa-fes-ctf',
    kind: 'competition',
    titleKey: 'ctfTitle',
    detailKey: 'ctfDetail'
  },
  {
    id: 'secops-club',
    kind: 'community',
    titleKey: 'clubTitle',
    detailKey: 'clubDetail'
  }
];
