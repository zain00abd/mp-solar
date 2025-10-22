export const metadata = {
  title: 'إضافة منتج جديد - MB Solar',
  description: 'إضافة منتج جديد إلى متجر الطاقة الشمسية',
}

export default function AddProductLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}