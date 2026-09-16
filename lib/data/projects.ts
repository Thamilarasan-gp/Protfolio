export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year?: string;
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
    id: 'smartbus',
    number: '01',
    title: 'Smart Bus Ticketing & Tracking System',
    subtitle: 'React Native App',
    year: '2025',
    description: 'Led development of Smart Parking and Ticketing Systems using MERN Stack, GPS, and QR code integration, optimizing parking efficiency and enhancing public transport through real-time tracking and alerts.',
    tags: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Razorpay', 'Socket.IO', 'Google Maps API'],
    gradient: 'linear-gradient(135deg, #07192f 0%, #0d3460 50%, #0284c7 100%)',
    link: 'https://github.com/thamil-arasan/smart-bus-ticketing',
    github: 'https://github.com/thamil-arasan/smart-bus-ticketing',
    highlights: [
      'Live GPS bus tracking & real-time ETA calculation',
      'Contactless QR code bus ticketing and verification',
      'Automated Razorpay fare settlement & Socket.IO telemetry'
    ],
    metrics: 'Real-time GPS transit tracking & instant ticketing',
  },
  {
    id: 'smartparking',
    number: '02',
    title: 'Smart Parking and Saver System',
    subtitle: 'MERN Stack & Leaflet',
    year: '2024',
    description: 'Created a Smart Parking and Booking System that optimizes parking space utilization with a convenient booking platform, real-time updates, and an enhanced user experience for everyday parking operations.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Leaflet', 'Razorpay'],
    gradient: 'linear-gradient(135deg, #05241c 0%, #0a4939 50%, #059669 100%)',
    link: 'https://github.com/thamil-arasan/smart-parking-saver',
    github: 'https://github.com/thamil-arasan/smart-parking-saver',
    highlights: [
      'Interactive parking slot floor plan with live availability',
      'Flexible spot reservation drawer with time slider',
      'Razorpay contactless checkout & ticket receipt'
    ],
    metrics: 'Optimized space utilization & real-time slot booking',
  },
  {
    id: 'messmate',
    number: '03',
    title: 'Mess Mate – Token-Based Smart Mess Management',
    subtitle: 'MERN Stack Platform',
    year: '2025',
    description: 'Built a digital mess management platform using modern frontend technologies to streamline meal tracking, digital token issuance, and real-time analytics for hostel students.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #241604 0%, #4a2e0a 50%, #d97706 100%)',
    link: 'https://github.com/thamil-arasan/mess-mate',
    github: 'https://github.com/thamil-arasan/mess-mate',
    highlights: [
      'Digital meal token issuance & rapid QR code redemption',
      'Real-time mess crowd density analytics & rush predictor',
      'Hostel student wallet balance & dietary preferences'
    ],
    metrics: 'Zero token counterfeiting & streamlined meal dispatch',
  },
  {
    id: 'anthurium',
    number: '04',
    title: 'Anthurium Boutique',
    subtitle: 'Luxury E-Commerce',
    year: '2024',
    description: 'A modern, high-end luxury fashion and apparel boutique e-commerce web application featuring curated clothing collections, seamless catalog navigation, quick-view shopping, and secure checkout.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Tailwind CSS', 'Stripe'],
    gradient: 'linear-gradient(135deg, #2c121b 0%, #562033 50%, #be185d 100%)',
    link: 'https://github.com/thamil-arasan/anthurium-boutique',
    github: 'https://github.com/thamil-arasan/anthurium-boutique',
    highlights: [
      'Curated editorial apparel catalog with interactive quick view',
      'Dynamic shopping bag drawer with instant subtotal calculation',
      'Responsive editorial luxury aesthetic with smooth micro-interactions'
    ],
    metrics: 'Frictionless luxury checkout & catalog browsing',
  },
];
