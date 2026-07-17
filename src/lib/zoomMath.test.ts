import { describe, it, expect } from 'vitest'
import { clampZoomScale, clampPan } from './zoomMath'

describe('clampZoomScale', () => {
  it('clamps below the minimum', () => {
    expect(clampZoomScale(0.5, 1, 4)).toBe(1)
  })

  it('clamps above the maximum', () => {
    expect(clampZoomScale(10, 1, 4)).toBe(4)
  })

  it('leaves in-range values unchanged', () => {
    expect(clampZoomScale(2, 1, 4)).toBe(2)
  })
})

describe('clampPan', () => {
  it('locks pan to the origin when not zoomed in', () => {
    expect(clampPan({ x: 50, y: 50 }, 1, { width: 400, height: 400 })).toEqual({ x: 0, y: 0 })
  })

  it('bounds pan so the image cannot be dragged off-frame when zoomed in', () => {
    const bounded = clampPan({ x: 999, y: -999 }, 2, { width: 400, height: 400 })
    expect(bounded.x).toBeLessThanOrEqual(200)
    expect(bounded.x).toBeGreaterThanOrEqual(-200)
    expect(bounded.y).toBeLessThanOrEqual(200)
    expect(bounded.y).toBeGreaterThanOrEqual(-200)
  })
})
