'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Inicio', icon: '🏠' },
  { href: '/inventory', label: 'Despensa', icon: '🥚' },
  { href: '/meals', label: 'Comidas', icon: '🍳' },
  { href: '/shopping-list', label: 'Compra', icon: '🛒' },
  { href: '/weekly-plan', label: 'Semana', icon: '📅' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 max-w-2xl mx-auto">
      <div className="flex">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
              pathname === item.href
                ? 'text-green-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
