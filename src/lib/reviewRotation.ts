export function nextIndex(current: number, length: number, direction: 1 | -1 = 1): number {
  if (length <= 1) return 0
  return (current + direction + length) % length
}
