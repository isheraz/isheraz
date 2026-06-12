import type { Metadata } from 'next'
import { LoaderWrapper } from '@/components/loader-wrapper'
import { ThemeProvider } from '@/components/providers'
import { GSAPProvider } from '@/components/gsap-provider'
import { MagneticCursor } from '@/components/animations/magnetic-cursor'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://isheraz.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Sheraz Ahmed — Solutions Architect & AI Product Builder',
    template: '%s | Sheraz Ahmed'
  },
  description: 'Sheraz Ahmed — Solutions Architect, engineering leader, AI product builder. Essays, ventures, and consulting.',
  openGraph: {
    title: 'Sheraz Ahmed — Solutions Architect & AI Product Builder',
    description: 'Sheraz Ahmed — Solutions Architect, engineering leader, AI product builder. Essays, ventures, and consulting.',
    url: 'https://isheraz.com',
    siteName: 'Sheraz Ahmed',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://isheraz.com/photo-logo.png',
        width: 1200,
        height: 630,
        alt: 'Sheraz Ahmed',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sheraz Ahmed — Solutions Architect & AI Product Builder',
    description: 'Sheraz Ahmed — Solutions Architect, engineering leader, AI product builder. Essays, ventures, and consulting.',
    creator: '@sheraz_ahmd',
    images: ['https://isheraz.com/photo-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" data-density="regular" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script id="theme-init" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('isheraz.theme');if(s){document.documentElement.setAttribute('data-theme',s);}else{var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',d?'dark':'light');}}catch(e){}})()` }} />
        <script id="js-check" dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} suppressHydrationWarning />
        {process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
          <script 
            defer 
            src="https://static.cloudflareinsights.com/beacon.min.js" 
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`} 
          />
        )}
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <GSAPProvider>
            <LoaderWrapper />
            <MagneticCursor />
            {children}
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
