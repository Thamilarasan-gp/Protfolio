import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070e1c',
};

export const metadata: Metadata = {
  title: 'Thamil Arasan — Cinematic 3D Portfolio',
  description:
    'A real-time, scroll-controlled 3D interactive portfolio of Thamil Arasan. Developer on a journey building a better tomorrow.',
  keywords: [
    'Thamil Arasan',
    'Portfolio',
    '3D Portfolio',
    'Creative Developer',
    'React Three Fiber',
    'Full Stack Engineer',
  ],
  authors: [{ name: 'Thamil Arasan' }],
  openGraph: {
    title: 'Thamil Arasan — Cinematic 3D Portfolio',
    description:
      'A real-time, scroll-controlled 3D interactive portfolio of Thamil Arasan. Developer on a journey building a better tomorrow.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
