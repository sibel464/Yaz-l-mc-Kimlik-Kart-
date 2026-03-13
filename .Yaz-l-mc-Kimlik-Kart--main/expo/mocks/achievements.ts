export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'hire' | 'points' | 'level' | 'streak';
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 'first_hire',
    title: 'İlk Adım',
    description: 'İlk geliştiricini işe al',
    icon: '🚀',
    requirement: 1,
    type: 'hire',
    color: '#00D9A6',
  },
  {
    id: 'team_builder',
    title: 'Takım Kurucu',
    description: '3 geliştirici işe al',
    icon: '👥',
    requirement: 3,
    type: 'hire',
    color: '#3B82F6',
  },
  {
    id: 'full_house',
    title: 'Tam Kadro',
    description: 'Tüm geliştiricileri işe al',
    icon: '🏢',
    requirement: 8,
    type: 'hire',
    color: '#8B5CF6',
  },
  {
    id: 'score_50',
    title: 'Puan Avcısı',
    description: '50 puana ulaş',
    icon: '⚡',
    requirement: 50,
    type: 'points',
    color: '#F59E0B',
  },
  {
    id: 'score_100',
    title: 'Yüz Kulübü',
    description: '100 puana ulaş',
    icon: '💯',
    requirement: 100,
    type: 'points',
    color: '#EC4899',
  },
  {
    id: 'level_3',
    title: 'Deneyimli Lider',
    description: 'Takım seviyesi 3 ol',
    icon: '🏆',
    requirement: 3,
    type: 'level',
    color: '#06B6D4',
  },
  {
    id: 'level_5',
    title: 'Efsane Takım',
    description: 'Takım seviyesi 5 ol',
    icon: '👑',
    requirement: 5,
    type: 'level',
    color: '#F472B6',
  },
  {
    id: 'mood_master',
    title: 'Ruh Hali Ustası',
    description: '3 farklı mood dene',
    icon: '🎭',
    requirement: 3,
    type: 'streak',
    color: '#10B981',
  },
];

export default achievements;
