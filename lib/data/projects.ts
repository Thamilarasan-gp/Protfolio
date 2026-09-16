export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  github: string;
  highlights: string[];
  metrics: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'parkeasy',
    number: '01',
    title: 'ParkEasy',
    subtitle: 'Smart Parking System',
    description: 'An AI-driven IoT & web parking ecosystem that automates real-time spot occupancy detection, reservation navigation, and automated license plate recognition with zero friction.',
    tags: ['React', 'Next.js', 'Node.js', 'Computer Vision', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #0b1f3a 0%, #174276 50%, #2e75b6 100%)',
    link: 'https://github.com/thamil-arasan/parkeasy',
    github: 'https://github.com/thamil-arasan/parkeasy',
    highlights: ['Sub-second vacancy detection', 'Turn-by-turn indoor parking guidance', 'Instant contactless mobile checkout'],
    metrics: '94% parking search time reduction',
  },
  {
    id: 'mediapp',
    number: '02',
    title: 'MediApp',
    subtitle: 'Healthcare Platform',
    description: 'A compliant, modern digital health platform connecting patients with certified clinicians for encrypted video consultations, electronic health records (EHR), and smart automated prescription refills.',
    tags: ['Next.js', 'TypeScript', 'WebRTC', 'HIPAA Secure', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #082832 0%, #0d4b56 50%, #1b8a99 100%)',
    link: 'https://github.com/thamil-arasan/mediapp',
    github: 'https://github.com/thamil-arasan/mediapp',
    highlights: ['End-to-end encrypted HD video consultations', 'Interactive clinical dashboard for doctors', 'Automated pharmacy order dispatch'],
    metrics: '15,000+ virtual patient consultations',
  },
  {
    id: 'nimmathi',
    number: '03',
    title: 'Nimmathi',
    subtitle: 'Meditation & Wellness',
    description: 'A mindfulness sanctuary featuring generative ambient soundscapes, biometric heart-rate sync, mood journaling, and structured breathing exercises for modern high-stress lifestyles.',
    tags: ['React Three Fiber', 'Web Audio API', 'Framer Motion', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #1b1233 0%, #35215c 50%, #6841a8 100%)',
    link: 'https://github.com/thamil-arasan/nimmathi',
    github: 'https://github.com/thamil-arasan/nimmathi',
    highlights: ['Dynamic procedural 3D relaxing visuals', 'Real-time Web Audio binaural beat generator', 'Daily micro-reflections & streak insights'],
    metrics: '4.9/5 user mindfulness satisfaction',
  },
  {
    id: 'more-projects',
    number: '04',
    title: 'More Projects',
    subtitle: 'Innovation Lab & Experiments',
    description: 'A playground of emerging AI agents, custom WebGL 3D simulations, real-time developer tooling, and open-source contributions crafted with precision and curiosity.',
    tags: ['Three.js', 'Python', 'LangChain', 'Docker', 'WebGL Shaders'],
    gradient: 'linear-gradient(135deg, #18202f 0%, #253346 50%, #3e536d 100%)',
    link: 'https://github.com/thamil-arasan',
    github: 'https://github.com/thamil-arasan',
    highlights: ['Autonomous AI coding agent experiments', 'Procedural terrain & terrain voxel generators', 'High-speed microservices architecture'],
    metrics: '20+ open source repositories',
  },
];
