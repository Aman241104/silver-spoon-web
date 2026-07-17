export function clampZoomScale(scale: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, scale))
}

export function clampPan(
  pan: { x: number; y: number },
  scale: number,
  bounds: { width: number; height: number }
): { x: number; y: number } {
  if (scale <= 1) return { x: 0, y: 0 }
  const maxX = (bounds.width * (scale - 1)) / 2
  const maxY = (bounds.height * (scale - 1)) / 2
  return {
    x: Math.min(maxX, Math.max(-maxX, pan.x)),
    y: Math.min(maxY, Math.max(-maxY, pan.y)),
  }
}
