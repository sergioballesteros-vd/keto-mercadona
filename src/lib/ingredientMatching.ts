/**
 * Returns true if a pantry product name can satisfy an ingredient requirement.
 * Stricter than substring: avoids "queso rallado" matching "queso curado".
 */
export function ingredientMatchesProduct(ingredientName: string, productName: string): boolean {
  const ing = ingredientName.toLowerCase().trim()
  const prod = productName.toLowerCase().trim()

  // Exact or full containment
  if (prod.includes(ing) || ing.includes(prod)) return true

  // Word-level: filter out short stop words (de, el, la, un, con, sin, etc.)
  const significant = (s: string) => s.split(/\s+/).filter(w => w.length > 2)
  const ingWords = significant(ing)
  const prodWords = significant(prod)

  if (ingWords.length === 0 || prodWords.length === 0) return false

  // All ingredient words must appear in product name OR all product words in ingredient
  const allIngInProd = ingWords.every(w => prod.includes(w))
  const allProdInIng = prodWords.every(w => ing.includes(w))

  return allIngInProd || allProdInIng
}
