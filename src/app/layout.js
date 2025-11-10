import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'MB Solar - Solar Energy Solutions',
  description: 'Discover our range of premium solar panels, batteries, and inverters for residential and commercial systems',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  )
}
