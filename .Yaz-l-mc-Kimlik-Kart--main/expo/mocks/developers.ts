export interface Developer {
  id: string;
  name: string;
  skill: string;
  skills: string[];
  level: number;
  accentColor: string;
  avatar: string;
  bio: string;
  xpToNext: number;
  hourlyRate: number;
}

const developers: Developer[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    skill: 'React Native',
    skills: ['React Native', 'TypeScript', 'Redux'],
    level: 3,
    accentColor: '#00D9A6',
    avatar: '👨‍💻',
    bio: 'Mobil uygulama geliştirme tutkunu. 5 yıllık deneyim.',
    xpToNext: 30,
    hourlyRate: 85,
  },
  {
    id: '2',
    name: 'Elif Demir',
    skill: 'Python / AI',
    skills: ['Python', 'TensorFlow', 'NLP', 'Computer Vision'],
    level: 5,
    accentColor: '#3B82F6',
    avatar: '👩‍🔬',
    bio: 'Yapay zeka araştırmacısı ve derin öğrenme uzmanı.',
    xpToNext: 50,
    hourlyRate: 120,
  },
  {
    id: '3',
    name: 'Mert Kaya',
    skill: 'Backend (Node.js)',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'GraphQL'],
    level: 2,
    accentColor: '#8B5CF6',
    avatar: '🧑‍💻',
    bio: 'Ölçeklenebilir API ve mikro servis mimarisi uzmanı.',
    xpToNext: 20,
    hourlyRate: 75,
  },
  {
    id: '4',
    name: 'Zeynep Arslan',
    skill: 'iOS (Swift)',
    skills: ['Swift', 'SwiftUI', 'Core Data', 'ARKit'],
    level: 4,
    accentColor: '#EC4899',
    avatar: '👩‍💻',
    bio: 'Apple ekosisteminde 7 yıl deneyimli geliştirici.',
    xpToNext: 40,
    hourlyRate: 110,
  },
  {
    id: '5',
    name: 'Can Öztürk',
    skill: 'DevOps / Cloud',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    level: 3,
    accentColor: '#F59E0B',
    avatar: '🛠️',
    bio: 'Bulut altyapı ve otomasyon mühendisi.',
    xpToNext: 30,
    hourlyRate: 95,
  },
  {
    id: '6',
    name: 'Selin Çelik',
    skill: 'UI/UX Design',
    skills: ['Figma', 'Sketch', 'Prototyping', 'User Research'],
    level: 4,
    accentColor: '#F472B6',
    avatar: '🎨',
    bio: 'Kullanıcı deneyimi odaklı tasarım uzmanı.',
    xpToNext: 40,
    hourlyRate: 90,
  },
  {
    id: '7',
    name: 'Burak Aydın',
    skill: 'Blockchain',
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'DeFi'],
    level: 3,
    accentColor: '#06B6D4',
    avatar: '⛓️',
    bio: 'Akıllı kontrat ve merkeziyetsiz uygulama geliştirici.',
    xpToNext: 30,
    hourlyRate: 130,
  },
  {
    id: '8',
    name: 'Ayşe Yıldız',
    skill: 'Data Science',
    skills: ['R', 'Python', 'Tableau', 'SQL'],
    level: 4,
    accentColor: '#10B981',
    avatar: '📊',
    bio: 'Veri analizi ve görselleştirme uzmanı.',
    xpToNext: 40,
    hourlyRate: 100,
  },
];

export default developers;
