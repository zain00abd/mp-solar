import './globals.css'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com'),
  title: {
    default: 'MB Solar Power | أنظمة الطاقة الشمسية',
    template: '%s | MB Solar Power'
  },
  description: 'حلول احترافية لأنظمة الطاقة الشمسية: ألواح، عاكسات، بطاريات، وتصميم وتركيب للمنازل والأعمال',
  keywords: ['MB Solar Power','طاقة شمسية','ألواح شمسية','بطاريات ليثيوم','عاكسات شمسية','أنظمة الطاقة','Solar','Inverters','Batteries','Panels'],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    siteName: 'MB Solar Power',
    url: '/',
    title: 'MB Solar Power | أنظمة الطاقة الشمسية',
    description: 'حلول احترافية لأنظمة الطاقة الشمسية للمنازل والأعمال',
    images: [{ url: '/logo22.png' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MB Solar Power',
    description: 'حلول الطاقة الشمسية المتكاملة',
    images: ['/logo22.png']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/logo22.png'
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MB Solar Power',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com',
            logo: (process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com') + '/logo22.png',
            sameAs: []
          })}
        </Script>
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

export const viewport = {
  themeColor: '#111111'
}
