export interface PrayerStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  guide: string;
  placeholder: string;
}

export const PRAYER_STEPS: PrayerStep[] = [
  {
    id: 1,
    title: '묵상',
    subtitle: 'Meditation',
    icon: '📖',
    guide: '오늘의 말씀을 천천히 읽고, 하나님이 내게 하시는 말씀을 묵상하세요.',
    placeholder: '말씀을 통해 느낀 점, 깨달은 점을 적어보세요...',
  },
  {
    id: 2,
    title: '찬양과 경배',
    subtitle: 'Praise & Worship',
    icon: '🎵',
    guide: '하나님의 위대하심과 선하심을 찬양하며, 마음을 다해 경배하세요.',
    placeholder: '하나님께 드리는 찬양과 경배를 적어보세요...',
  },
  {
    id: 3,
    title: '감사',
    subtitle: 'Thanksgiving',
    icon: '🙏',
    guide: '오늘 감사한 것들을 하나하나 떠올리며 감사를 고백하세요.',
    placeholder: '감사한 것들을 적어보세요...',
  },
  {
    id: 4,
    title: '회개',
    subtitle: 'Repentance',
    icon: '💧',
    guide: '마음을 돌아보며, 하나님 앞에서 부족했던 점을 회개하세요.',
    placeholder: '회개하고 싶은 것들을 적어보세요...',
  },
  {
    id: 5,
    title: '간구',
    subtitle: 'Supplication',
    icon: '🙌',
    guide: '개인적으로 필요한 것들을 하나님께 구하세요.',
    placeholder: '기도 제목을 적어보세요...',
  },
  {
    id: 6,
    title: '중보기도',
    subtitle: 'Intercession',
    icon: '🤝',
    guide: '가족, 친구, 이웃, 나라를 위해 기도하세요.',
    placeholder: '누구를 위해 기도하나요?',
  },
  {
    id: 7,
    title: '특별대상을 위한 기도',
    subtitle: 'Special Prayer',
    icon: '🌟',
    guide: '특별히 마음에 두고 있는 사람이나 상황을 위해 기도하세요.',
    placeholder: '특별 기도 대상과 내용을 적어보세요...',
  },
];
