import './globals.css'

export const metadata = {
  title: 'MB Solar - Solar Energy Solutions',
  description: 'Discover our range of premium solar panels, batteries, and inverters for residential and commercial systems',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
