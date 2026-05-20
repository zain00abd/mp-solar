import './globals.css'
import Script from 'next/script'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-arabic',
})

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
    images: [{ url: '/mbsolarlogo.png' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MB Solar Power',
    description: 'حلول الطاقة الشمسية المتكاملة',
    images: ['/mbsolarlogo.png']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/mbsolarlogo.png'
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning className={`${inter.variable} ${notoSansArabic.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('mb-solar-lang');if(l==='en'||l==='ar'){document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}}catch(e){}})();`,
          }}
        />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'MB Solar Power',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com',
            logo: (process.env.NEXT_PUBLIC_SITE_URL || 'https://mbsolarpower.com') + '/mbsolarlogo.png',
            sameAs: []
          })}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const viewport = {
  themeColor: '#202D42'
}
