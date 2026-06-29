import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KetoHoy',
  description: 'Planificador de comidas keto con productos de Mercadona',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.className} bg-gray-950 text-gray-100 min-h-screen`}>
        <div className="max-w-2xl mx-auto pb-20">
          {children}
        </div>
        <Navigation />
        {/* Medical disclaimer */}
        <div className="fixed bottom-16 left-0 right-0 bg-yellow-900/80 text-yellow-200 text-xs text-center p-1 max-w-2xl mx-auto hidden">
          Esta app no sustituye el consejo médico o nutricional profesional.
        </div>
      </body>
    </html>
  )
}
