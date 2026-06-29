'use client'

type Product = {
  id: string
  name: string
  brand: string | null
  category: string
  ketoScore: number
  source: string
  unitPrice: number | null
  imageUrl: string | null
  tags: string
}

type ProductCardProps = {
  product: Product
  inPantry: boolean
  pantryItemId?: string
  onToggle: (productId: string, pantryItemId?: string) => void
}

const categoryEmoji: Record<string, string> = {
  meat: '🥩',
  fish: '🐟',
  eggs: '🥚',
  dairy: '🧀',
  vegetables: '🥦',
  fruit: '🍓',
  nuts: '🌰',
  oils: '🫒',
  sauces: '🥫',
  drinks: '🥤',
  other: '🍽️',
}

const ketoColors = ['bg-red-900', 'bg-orange-900', 'bg-yellow-900', 'bg-lime-900', 'bg-green-800', 'bg-green-600']

export default function ProductCard({ product, inPantry, pantryItemId, onToggle }: ProductCardProps) {
  return (
    <button
      onClick={() => onToggle(product.id, pantryItemId)}
      className={`w-full text-left rounded-xl p-3 border transition-all ${
        inPantry
          ? 'bg-green-900/30 border-green-700 ring-1 ring-green-600'
          : 'bg-gray-900 border-gray-800 hover:border-gray-700'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="text-2xl">{categoryEmoji[product.category] ?? '🍽️'}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{product.name}</div>
          {product.brand && <div className="text-xs text-gray-500 truncate">{product.brand}</div>}
          <div className="flex items-center gap-1 mt-1">
            <div className={`w-2 h-2 rounded-full ${ketoColors[product.ketoScore] ?? 'bg-gray-600'}`} />
            <span className="text-xs text-gray-500">keto {product.ketoScore}/5</span>
            {product.unitPrice && (
              <span className="text-xs text-gray-500 ml-2">{product.unitPrice.toFixed(2)}€</span>
            )}
          </div>
        </div>
        {inPantry && <span className="text-green-400 text-lg flex-shrink-0">✓</span>}
      </div>
    </button>
  )
}
