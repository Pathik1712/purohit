export function calculateShipping(subtotal: number, isGifting = false): number {
  if (isGifting) return 0;
  if (subtotal >= 349900) return 0; // Rs. 3499 in paise
  return 9900; // Rs. 99 flat shipping
}
