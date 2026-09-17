export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year?: string;
  description: string;
  tags: string[];
  gradient: string;
  link?: string;
  adminLink?: string;
  github: string;
  image?: string;
  highlights: string[];
  metrics: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'smartbus',
    number: '01',
    title: 'Smart Bus Ticketing & Tracking System',
    subtitle: 'React Native App | BUSMATE',
    year: '2025',
    description: 'Led development of Smart Parking and Ticketing Systems using MERN Stack, GPS, and QR code integration, optimizing parking efficiency and enhancing public transport through real-time tracking and alerts.',
    tags: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Razorpay', 'Socket.IO', 'Google Maps API'],
    gradient: 'linear-gradient(135deg, #07192f 0%, #0d3460 50%, #0284c7 100%)',
    link: '',
    github: 'https://github.com/majhus001/Busmate-2',
    image: '/images/projects_imgs/Busmate.png',
    highlights: [
      'Live GPS bus tracking & real-time ETA calculation via Socket.IO',
      'Contactless QR code bus ticketing and verification',
      'Automated Razorpay fare settlement & Google Maps API route navigation'
    ],
    metrics: 'Real-time GPS transit tracking & instant ticketing',
  },
  {
    id: 'smartparking',
    number: '02',
    title: 'Smart Parking and Saver System',
    subtitle: 'MERN Stack, Leaflet, Razorpay | Namma Spot',
    year: '2024',
    description: 'Created a Smart Parking and Booking System that optimizes parking space utilization with a convenient booking platform, real-time updates, and an enhanced user experience for everyday parking operations.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    gradient: 'linear-gradient(135deg, #05241c 0%, #0a4939 50%, #059669 100%)',
    link: 'https://namma-spot.vercel.app/',
    github: 'https://github.com/Thamilarasan-gp/Nammaspot_frontend.git',
    image: '/images/projects_imgs/Nammaspot.png',
    highlights: [
      'Interactive parking slot floor plan with live availability',
      'Flexible spot reservation booking platform with real-time updates',
      'Razorpay contactless checkout & ticket receipt generation'
    ],
    metrics: 'Optimized space utilization & real-time spot booking',
  },
  {
    id: 'messmate',
    number: '03',
    title: 'Mess Mate – Token-Based Smart Mess Management System',
    subtitle: 'MERN Stack Platform',
    year: '2025',
    description: 'Built a digital mess management platform using modern frontend technologies to streamline meal tracking, digital token issuance, and real-time analytics for hostel students.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    gradient: 'linear-gradient(135deg, #241604 0%, #4a2e0a 50%, #d97706 100%)',
    link: 'https://snacksbite.vercel.app/',
    github: 'https://github.com/Thamilarasan-gp/Hostel_Mess_system_frontend.git',
    image: '/images/projects_imgs/Messmate.png',
    highlights: [
      'Digital meal token issuance & rapid QR code redemption',
      'Real-time mess crowd density analytics & dining schedule tracking',
      'Hostel student meal verification & automated logging'
    ],
    metrics: 'Streamlined meal tracking & digital token issuance',
  },
  {
    id: 'anthurium',
    number: '04',
    title: 'ANTHURIUM',
    subtitle: 'Luxury Indian Women\'s Fashion Boutique',
    year: '2026',
    description: 'Welcome to the ANTHURIUM luxury Indian women\'s fashion boutique',
    tags: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Node.js', 'Express', 'TypeScript', 'Mongoose'],
    gradient: 'linear-gradient(135deg, #2c121b 0%, #562033 50%, #be185d 100%)',
    link: 'https://labelanthurium.vercel.app/',
    adminLink: 'https://anthurium-admin-sigma.vercel.app/',
    github: 'https://github.com/Thamilarasan-gp/Anthurium.git',
    image: '/images/projects_imgs/Anthurium.png',
    highlights: [
      'Luxury Indian women\'s couture boutique built with Next.js 15 & React 19',
      'Dual portal architecture: Client storefront & dedicated Admin dashboard',
      'Full-stack commerce engine with Node.js, Express, TypeScript, and Mongoose'
    ],
    metrics: 'Editorial luxury fashion boutique & dedicated admin portal',
  },
];
