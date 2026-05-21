import type { Metadata } from 'next'
import Script from 'next/script'
import { LoaderWrapper } from '@/components/loader-wrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sheraz Ahmed — Solutions Architect & AI Product Builder',
  description: 'Sheraz Ahmed — Solutions Architect, engineering leader, AI product builder. Essays, ventures, and consulting.',
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
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var s=localStorage.getItem('isheraz.theme');if(s==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`}</Script>
      </head>
      <body>
        <LoaderWrapper />
        {children}
      </body>
    </html>
  )
}
